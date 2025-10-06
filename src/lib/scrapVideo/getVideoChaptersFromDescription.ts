import { getLLMInstance } from "../llm";

interface Chapter {
  title: string;
  timeStamp: string;
}

export const getChaptersFromDescription = async (description: string): Promise<Chapter[]> => {
  if (!description || description.trim() === "") {
    console.warn("Description is empty, returning no chapters.");
    return [];
  }

  const llm = getLLMInstance();

  const promptTemplate = `You must extract chapter timestamps from the YouTube video description.

Rules:
1. Look ONLY at the provided description text.
2. A valid chapter line MUST start (after optional bullet like -, •, *, –, —, (, [) with a timestamp in one of these forms: mm:ss or h:mm:ss (examples: 0:00, 09:12, 1:02:45).
3. Ignore any timestamps not at the start of a line.
4. After the timestamp there may be optional separators (-, –, —, :, |) before the title.
5. Clean the title: remove URLs, hashtags, @mentions, emojis at the end, extra spaces.
6. Require at least 2 valid chapters; otherwise return [].
7. Timestamps must be strictly ascending and unique; if not, return [].
8. Do NOT invent or infer chapters—only use explicit timestamp lines.
9. Output MUST be ONLY a JSON array (no markdown, no explanation).
10. Each element: {"title":"<string>","timeStamp":"mm:ss" or "h:mm:ss"}.
11. If no valid chapters -> return [].

Description:
<<<START
{DESCRIPTION}
END>>>

Return ONLY the JSON array.`;

  const prompt = promptTemplate.replace("{DESCRIPTION}", description);

  try {
    const response = await llm.invoke(prompt);
    const content =
      typeof response.content === "string"
        ? response.content
        : (response.content as Array<{ type: string; text: string }>)
            .map((c) => (c.type === "text" ? c.text : ""))
            .join("\n");

    // Clean the response to get pure JSON
    const jsonString = content.trim().replace(/```json\n?|```/g, "");

    if (!jsonString.startsWith("[") || !jsonString.endsWith("]")) {
      console.warn("LLM did not return a valid JSON array string:", jsonString);
      return [];
    }

    const parsed = JSON.parse(jsonString);

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          item &&
          typeof item.title === "string" &&
          typeof item.timeStamp === "string" &&
          /^\d{1,2}:\d{2}(:\d{2})?$/.test(item.timeStamp)
      )
    ) {
      return parsed as Chapter[];
    }

    console.warn("Parsed JSON from LLM is not a valid Chapter array:", parsed);
    return [];
  } catch (error) {
    console.error("Error getting or parsing chapters from LLM:", error);
    return []; 
  }
};