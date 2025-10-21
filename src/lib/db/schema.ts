import { time } from "console";
import { create } from "domain";
import { relations } from "drizzle-orm";
import { boolean, timestamp, uuid, varchar, integer, pgTable, uniqueIndex, vector, PgVectorConfig } from "drizzle-orm/pg-core";



// user table
export const users = pgTable("users" , 
    {
    id:uuid("id").primaryKey().defaultRandom(),
    userName : varchar("userName" , {length : 256}),
    email: varchar('email' , {length :  256}).notNull().unique(),
    image : varchar('image', { length: 800 }),
    age:integer(),
    subscribedUser : boolean().default(false),
    created_at:timestamp('created_at' , { precision: 0 }).defaultNow().notNull(),
    updated_at: timestamp("updated_at" , {precision : 0}),
    delete_at: timestamp("delete_at" , {precision : 0})

}, 
(table) =>[
    uniqueIndex("user_email_idx").on(table.email),
]
)


//video table
export const videos =  pgTable("videos" , {

    id :  uuid("id").primaryKey().defaultRandom(),
    user_id : uuid("user_id").references(() => users.id),
    video_id : varchar("video_id" , {length : 256}).notNull().unique(),
    title :  varchar("title" , {length :  800}).notNull(),
    thumbnail :  varchar("thumbnail" , {length :  2000}).notNull(),
    duration: varchar("duration", { length: 50 }),
    transcript: varchar("transcript", { length: 10485700 }).notNull(),
    embedding_done : boolean().default(false),
    created_at: timestamp("created_at", { precision: 0 }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { precision: 0 }),

},
(table)=>[
    uniqueIndex("video_id_Idx").on(table.video_id)
])


// Transriptchunks

export const transcriptChunks = pgTable(
  "transcript_chunks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    video_id: varchar("video_id", { length: 256 }).references(() => videos.video_id),
    chunk_index: integer().notNull(),
    content: varchar("content", { length: 10000 }).notNull(),

    embedding: vector({name : "embedding" ,dimensions : 768}  as PgVectorConfig<number>).notNull(), 

    created_at: timestamp("created_at", { precision: 0 }).defaultNow().notNull(),
  }
);



// Video Chapters table
export const videoChapters = pgTable(
  "video_chapters",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    video_id: varchar("video_id", { length: 256 }).references(() => videos.video_id),
    title: varchar("title", { length: 500 }).notNull(),
    timestamp: varchar("timestamp", { length: 20 }), 
    description: varchar("description", { length: 7000 }).notNull(), 
    created_at: timestamp("created_at", { precision: 0 }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { precision: 0 }),
  }
);


//Chat History

export const chatHistory = pgTable("chatHistory" , {
  
    id : uuid("id").primaryKey().defaultRandom(),
    user_id : uuid("user_id").references(()=> users.id),
    video_id : varchar("video_id" , {length :  256}).references(()=>videos.video_id),
    question : varchar("question" , {length : 5000}),
    answer : varchar("answer" , {length :  10000}),
    created_at : timestamp("created_at").defaultNow().notNull()

})

export const summary = pgTable("summary" , {
  id :  uuid("id").primaryKey().defaultRandom(),
  video_id :  varchar("video_id" , {length :  256}).references(()=>videos.video_id)
  .notNull()
  .unique(),
  quick_summary :  varchar("quick_summary" , {length : 10000}),
  detailed_summary : varchar("detailed_summary" , {length :  500000}),
  created_at : timestamp("created_at" , {precision : 0}).defaultNow().notNull(),
  updated_at : timestamp("updated_at" , {precision :0 })
})

//Quiz

export const quiz = pgTable("quiz" , {
  id : uuid("id").primaryKey(),
  video_id : varchar("video_id" , {length :  256}).references(()=>videos.video_id),
  difficulty :  varchar("difficulty" , {length :  256}).notNull(),
  created_at : timestamp("created_at" , {precision : 0}).defaultNow().notNull(),
  updated_at : timestamp("updated_at" ,{precision : 0})
})

//Quiz question
export const quizQuestion = pgTable("quizQuestion", {
  id : uuid("id").primaryKey().defaultRandom(),
  quiz_id : uuid("quiz_id").references(()=>quiz.id).notNull(),
  question_text : varchar("question_text" , {length : 3000}).notNull(),
  type :  varchar("type" , {length :  50}).notNull(), //mcq or fill_up
  correct_option_id :  uuid("correct_option_id"),
  explanation: varchar("explanation", { length: 5000 }),
  created_at : timestamp("created_at" , {precision : 0}).defaultNow().notNull(),
} 
 )

//options
export const quizOptions = pgTable("quizOptions" , {
  id : uuid("id").primaryKey(),
  question_id : uuid("question_id").references(()=>quizQuestion.id).notNull(),
  option_text : varchar("option_text" , {length :  3000}).notNull(),
  created_at : timestamp("created_at" , {precision : 0}).defaultNow().notNull(),
  
})

// User Quiz Attempts (overall quiz attempt)
export const userQuizAttempts = pgTable("user_quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  quiz_id: uuid("quiz_id").references(() => quiz.id).notNull(),
  score: integer("score"),
  completed: boolean("completed").default(false),
  created_at: timestamp("created_at", { precision: 0 }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { precision: 0 }),
});

// User Answers (for each question in an attempt)
export const userAnswers = pgTable("user_answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  attempt_id: uuid("attempt_id")
    .references(() => userQuizAttempts.id)
    .notNull(),
  question_id: uuid("question_id")
    .references(() => quizQuestion.id)
    .notNull(),
  selected_option_id: uuid("selected_option_id").references(
    () => quizOptions.id
  ), // user’s chosen option
  is_correct: boolean("is_correct").default(false), // pre-computed for fast analytics
  created_at: timestamp("created_at", { precision: 0 }).defaultNow().notNull(),
});


//flashcards

export const flashcards =  pgTable("flashcards" ,{
  id : uuid("id").primaryKey().defaultRandom(),
  video_id : varchar("video_id" , {length : 256}).references(() => videos.video_id).notNull(),
  question : varchar("question" , {length : 5000}).notNull(),
  answer :  varchar("answer" , {length :  5000}).notNull(),
  hint : varchar("hint" , {length :  256}).notNull(),
  created_at : timestamp("created-at" , {precision : 0}).defaultNow()
})
//Subscription 



//----------------------Relations-------------------------

//falshcard realtion
export const flashcardsRelation = relations(flashcards , ({one}) =>({
  video : one(videos , {
    fields : [flashcards.video_id],
    references : [videos.video_id]
  })
}))


// Quiz has many questions
export const quizRelation = relations(quiz , ({many})=>({
  questions : many(quizQuestion)
}))

// Question belongs to Quiz and has many options

export const  quizQuestionRelations = relations(quizQuestion , ({one ,  many}) =>({

  quiz : one(quiz , {
    fields : [quizQuestion.quiz_id],
    references:[quiz.id]
  }),
  options : many(quizOptions)
}) )


//options belong to Question
export const quizOptionRelations = relations(quizOptions ,  ({one}) =>({
  question: one(quizQuestion ,{
    fields : [quizOptions.question_id],
    references:[quizQuestion.id]
  } )
}));

// Quiz attempt belongs to User and Quiz
export const userQuizAttemptsRelations = relations(userQuizAttempts, ({ one, many }) => ({
  user: one(users, {
    fields: [userQuizAttempts.user_id],
    references: [users.id],
  }),
  quiz: one(quiz, {
    fields: [userQuizAttempts.quiz_id],
    references: [quiz.id],
  }),
  answers: many(userAnswers),
}));


// User answer belongs to attempt, question, option
export const userAnswersRelations = relations(userAnswers, ({ one }) => ({
  attempt: one(userQuizAttempts, {
    fields: [userAnswers.attempt_id],
    references: [userQuizAttempts.id],
  }),
  question: one(quizQuestion, {
    fields: [userAnswers.question_id],
    references: [quizQuestion.id],
  }),
  option: one(quizOptions, {
    fields: [userAnswers.selected_option_id],
    references: [quizOptions.id],
  }),
}));
