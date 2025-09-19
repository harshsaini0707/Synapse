import { videos } from "@/lib/db/schema";
import { useVideoStore } from "@/store/videoStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const fetchChatHistory = async (video_id : string) =>{
try {
    const response = await axios.get(`/api/chatHistory/${video_id}`);

    console.log(response.data.chatHistory);
    return response.data.chatHistory
    
} catch (error) {
    throw new Error("Unable to fetch chat history");
    console.log(error);   
}

}
export function useChatHistory() {
    const video_id = useVideoStore((state)=>state.videoId);

    return useQuery({
        queryKey : ["chatHistory", video_id],
        queryFn : ()=>fetchChatHistory(video_id!),
        enabled : !!video_id
    })
}