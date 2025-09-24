import { useUserStore } from "@/store/userStore";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";



const getQuizs =  async (video_id : string ,difficulty :string ) =>{
     const userId = useUserStore.getState().user?.id; 
  if (!userId) throw new Error("User not logged in");

    try {

        console.log("   "+difficulty);
        

        const response =  await axios.post(`/api/quiz/${video_id}`,{
            difficulty
        },{
            headers:{
                "Content-Type" : "application/json",
                "x-user-id" :userId
            }
        })
        
    //  console.log(response.data?.data?.questions);
        return response.data?.data?.questions;
        
    } catch (error) {
        console.log("Error while requesting for quiz!!" , error);
          throw error;
    }
}

export function useQuiz( video_id: string | null , difficulty :"easy" | "hard" | undefined,
     options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn"> //allow everything from UseQueryOptions, except queryKey and queryFn.(already defined)
){
    
   if ( !difficulty) {
  return useQuery({
    queryKey: ["quiz", "disabled"],
    queryFn: async () => null,
    enabled: false,
  });
}



    return useQuery({
        queryKey : ["quiz" ,  difficulty],
        queryFn: () => getQuizs(video_id! ,difficulty!), // only called if enabled
        enabled: !!difficulty && (options?.enabled ?? false),
        staleTime: Infinity, 
        gcTime: Infinity,
        retry:  100,
      
        ...options

    })
}