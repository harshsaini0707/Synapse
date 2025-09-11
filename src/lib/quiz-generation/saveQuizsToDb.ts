import { NextResponse } from "next/server";
import { db } from "..";
import { quiz, quizOptions, quizQuestion } from "../db/schema";
import { v4 as uuidv4 } from "uuid";



type AllQuestin ={
        question_text :  string ,
        type :  string ,
        options : string[],
        correct_option_index :  number ,
        explanation : string

}[]
export async function saveToDB(video_id :  string ,  difficulty :  string ,  allQuestion : AllQuestin) {
   
try {
     if(!allQuestion){
        return NextResponse.json(
            {message : "Enable to get the question for instering the questions into the DB!!"},
            {status :  404}
        )
    }


    const quiz_id =  uuidv4();

    await  db.insert(quiz).values({
        id :  quiz_id,
        video_id : video_id , 
        difficulty : difficulty ,
    })

    for(const q of allQuestion){
        const question_id  = uuidv4();
       let correct_option_id : string = '';
      for(let i = 0 ;i< q.options.length ; i++){
        const option_id = uuidv4();

      

        await db.insert(quizOptions).values({
            id :  option_id ,
            question_id,
            option_text : q.options[i],
        });

        if(i === q.correct_option_index){
            correct_option_id = option_id
        }
      }

      await db.insert(quizQuestion).values({
        id : question_id,
        quiz_id,
        question_text :  q.question_text,
        type : q.type,
        correct_option_id : correct_option_id!,
        explanation :  q.explanation
      })
    
    }
    console.log("data intersted");
    

    return NextResponse.json(
        {message : `Quiz saved for video ${video_id} with ${allQuestion.length} questions`},
        {status :  200}
    )
} catch (error) {
    return NextResponse.json(
        {message : "Internal Server Error While Inserting - While Interting Data"},
        {status :  500}
    )
}
    
}