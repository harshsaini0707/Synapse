CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" varchar(256),
	"email" varchar(256) NOT NULL,
	"age" integer,
	"subscribedUser" boolean DEFAULT false,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0),
	"delete_at" timestamp (0),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "users" USING btree ("email");