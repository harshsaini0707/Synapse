import { videos } from "@/lib/db/schema";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Flashcard = {
    id :  string,
    video_id : string,
    question :  string,
    answer :  string,
    hint : string

}

const fetchFlashcard  = async(video_id : string , userId :  string ) =>{
    try {

        console.log("Request made getting data!!");
        
        const response = await axios.post<{data : Flashcard[]}>(`/api/flashcard/${video_id}`,{},
            {
                headers :  {
                    "Content-Type" : "application/json",
                    "x-user-id" : userId
                }
            }
        )
        
      return response.data.data;
        
        
    } catch (error) {
        console.log("Error while making request to fetch flashcard!!");
        
    }
}

export const useFlashcard = (viedo_id : string | null , generate : boolean) =>{
   // if(!viedo_id) throw new Error("Video_id required!!");
    const userId =  useUserStore((state)=>state.user?.id);

  //  if(!userId) throw new Error("Unauthorize user!!");

    return useQuery({
        queryKey :["flashcard" ,  viedo_id],
        queryFn : ()=> fetchFlashcard(viedo_id! ,  userId!),
        enabled : !!viedo_id && !!userId && generate,
        staleTime :  Infinity ,
        gcTime : Infinity,
        retry : 2,


    })
}