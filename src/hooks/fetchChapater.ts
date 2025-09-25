import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios  from "axios"



const fetchChapters = async (videoId : string , userId : string)=>{
    
    try {
        const response = await axios.post(`/api/transcript` , {
            videoId
        } ,{
            headers :{
            "Content-Type": "application/json",
            "x-user-id":userId ,
            }
        })

      //  console.log(response);
        return response?.data?.chapters
        
    } catch (error) {
      console.log("Enable to fetch the chapters!!");
      console.log(error);
        
    }
} 

export function useFetchChapters(videoId : string){
    const userId  =  useUserStore((state)=>state.user?.id)
    return useQuery({
        queryKey :["chapters" ,  videoId] ,
        queryFn :() => fetchChapters(videoId ,  userId as string),
        enabled: !!videoId, // prevents running if videoId is undefined
        staleTime: Infinity, 
       gcTime: Infinity,
       retry:  4,
       

    })
}