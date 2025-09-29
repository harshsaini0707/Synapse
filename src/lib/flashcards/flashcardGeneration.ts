import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

type Flashcard = {
  question: string;
  answer: string;
  hint: string;
};

export const createFlashCards = async (
  video_id: string,
  transcriptChunk: string
): Promise<Flashcard[]> => {
  if (!video_id || !transcriptChunk) {
    throw new Error("Required fields are missing!!");
  }

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY!,
    temperature: 0.3,
  });

  const prompt = `
You are a smart flashcards generator.  
Create 1-2 flashcards from the given transcript.  

Return ONLY valid JSON array in the format:
[
  {
    "question": "Under 8-9 words",
    "answer": "1-2 words",
    "hint": "1-5 words"
  }
]

-Rule 
Do not include explanations, greetings, or any extra text.  
Do not mention the transcript, source, or how you generated the cards. 


### Transcript:
${transcriptChunk}
`;

  const response = await llm.invoke([
    {
      role: "system",
      content: "You are a helpful flashcard generator.",
    },
    { role: "user", content: prompt },
  ]);

  let parsed: Flashcard[] = [];
  try {
    const raw = typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

    const clean = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    parsed = JSON.parse(clean);
  } catch (err) {
    console.error("Failed to parse LLM flashcard output:", response.content);
    throw new Error("Invalid flashcard JSON format from LLM");
  }

  return parsed;
};
