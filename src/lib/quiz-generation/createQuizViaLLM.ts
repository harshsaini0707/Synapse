import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

export async  function createQuizViaLLM(paragraph :  string ,  difficulty :  string){

    try {
        if(!paragraph || !difficulty){
            return NextResponse.json(
                {message : "Required fields are missing while creating the quiz vua LLM!!"},
                {status :  404}
            )

        }
        const llm = new ChatGoogleGenerativeAI({
            model : 'gemini-2.5-flash-lite',
            apiKey :  process.env.GEMINI_API_KEY!,
            temperature :  0.3
        })

const prompt = `
You are an expert quiz generator AI which generate the quiz only in english if any other language is given convert them into english.

From the following transcript text, generate **2-3 quiz questions** of difficulty level: "${difficulty}".
Mix **MCQs** and **Fill-in-the-blank** types.

### Rules:
1. Questions must be clear, concise, and directly derived from the transcript.  
2. Each MCQ must have exactly **4 options** with only **1 correct answer**.  
3. Each Fill-in-the-blank must also have **4 options** (with only 1 correct).  
4. Difficulty should match the requested level ("easy", "medium", "hard").  
5. Explanations must justify why the answer is correct.  
6. Avoid ambiguous or opinion-based questions.  
7. Do NOT repeat questions across windows.  
8. Use **simple JSON** output — no markdown, no commentary, just raw JSON.  
9. fill up question should same as  provide the format below and it compulsary containd the _____ for that corect option on in question not in option.
### Output Format (Strict JSON Array):
[
  {
    "question_text": "Question goes here",
    "type": "mcq" | "fill_up",
    "options": ["option1", "option2", "option3", "option4"],
    "correct_option_index": 0,
    "explanation": "Explanation here"
  }
]

### Example:
[
  {
    "question_text": "Speed of light is _____?",
    "type": "fill_up",
    "options": ["3x10^8 m/s", "3x10^10 m/s", "8x10^8 km/s", "3x10^8 m/s^2"],
    "correct_option_index": 0,
    "explanation": "The correct speed of light in vacuum is 3x10^8 m/s."
  }
]

### Transcript:
${paragraph}
`;

const response = await llm.invoke([
    {role : 'system' , content : 'You are a smart Quiz Generator System for Learning'} ,
    {role : "user" ,  content :  prompt}
])

return response.content;


    } catch (error) {
      return NextResponse.json(
        {message : "Internal Server Error - Unable to create Quiz via LLM call"+error},
        {status:  500}
      )  
    }
}
//createQuizViaLLM("answers wrong. It was incredible. It blows everyone away. It's called Alexet and it's a kind of AI called a neural network and they did it on Nvidia GPUs. All of a sudden GPUs weren't just a way to make computers faster and more efficient. They're becoming the engines of a whole new way of computing. And this was a big big deal because before Alex Net, AI was considered to be only theoretical. It was slow, clunky, and disappointing. But AlexNet proved three very important things to the world. Number one, they proved that AI can learn if you give it enough data. Secondly, they proved that GPUs are the perfect brain to train these models. And last and most importantly, they proved that CUDA was the secret source that made it possible. And suddenly the entire world realized what Jensen had seen 6 years earlier. This was the spark that lit the AI revolution in the world. Because after Alex Net, Google built better search and translation, Facebook improved face recognition, Tesla started" , "hard")

