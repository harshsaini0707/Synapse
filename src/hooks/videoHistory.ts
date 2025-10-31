import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


async function fetchVideoHistory(userId:string | undefined) {
    
    try {
        
        const response =  await axios.get('/api/videoHistory' , {
            headers:{
                "Content-Type" : "application/json",
                "x-user-id" : userId
            }
        })
         console.log(response.data.data);
         
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message || "Server error");
  } 
    }
}

export function useVideoHistory(){
    const userId = useUserStore((state) => state.user?.id);

    return useQuery({
        queryKey : ["videoHistory"],
        queryFn : () => fetchVideoHistory(userId),
        enabled : !!userId ,
        staleTime :  Infinity,
        gcTime : Infinity ,
        retry : 2
    })
}

