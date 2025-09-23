import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const getQuizs =  async (videoId : string , difficulty :string , userId?: string ) =>{
   
     if (!userId) throw new Error("User not logged in");
    try {

        const response =  await axios.post("/api/quiz",{
            videoId,
            difficulty
        },{
            headers:{
                "Content-Type" : "application/json",
                "x-user-id" :userId
            }
        })
        
        console.log(response.data);
        return response.data
        
    } catch (error) {
        console.log("Error while requesting for quiz!!" , error);
        
    }
}

export function useQuiz(videoId : string  | null,  difficulty :"quick" | "detailed"){
      const userId = useUserStore((state)=>state.user?.id);
   
    
    if(!videoId || !difficulty){
        throw new Error ("Required Data is missing !!");
    }


    return useQuery({
        queryKey : ["quiz" ,  videoId ,  difficulty],
        queryFn:()=>getQuizs(videoId , difficulty , userId),
        enabled : !!videoId && !!difficulty ,
         staleTime: Infinity, 
       gcTime: Infinity,
       retry:  100,
       

    })
}