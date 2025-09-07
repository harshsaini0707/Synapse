import { time } from "console";
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

