import { boolean, timestamp, uuid, varchar, integer, pgTable, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users" , 
    {
    id:uuid("id").primaryKey().defaultRandom(),
    userName : varchar("userName" , {length : 256}),
    email: varchar('email' , {length :  256}).notNull().unique(),
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