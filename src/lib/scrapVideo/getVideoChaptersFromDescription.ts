import { getLLMInstance } from "../llm"

export const getChaptersFromDescription =  async (description :  string) =>{
    
const llm = getLLMInstance();

if(!description){
    throw new Error(`Description is required!!`);
}

const prompt = ``;


}