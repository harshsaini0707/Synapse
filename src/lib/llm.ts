import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export const getLLMInstance =()=>{
    const llm = new ChatGoogleGenerativeAI({
        apiKey :  process.env.GEMINI_API_KEY!,
        temperature:0.3,
        model :"gemini-2.5-flash-lite"
    })

    return llm;
}