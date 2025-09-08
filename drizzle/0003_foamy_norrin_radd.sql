CREATE TABLE "quiz" (
	"id" uuid PRIMARY KEY NOT NULL,
	"video_id" varchar(256),
	"difficulty" varchar(256) NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0)
);
--> statement-breakpoint
CREATE TABLE "quizOptions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"question_id" uuid NOT NULL,
	"option_text" varchar(3000) NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quizQuestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_id" uuid NOT NULL,
	"question_id" varchar(3000) NOT NULL,
	"type" varchar(50) NOT NULL,
	"correct_option_id" uuid NOT NULL,
	"explanation" varchar(5000),
	"created_at" timestamp (0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attempt_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"selected_option_id" uuid,
	"is_correct" boolean DEFAULT false,
	"created_at" timestamp (0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_quiz_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"quiz_id" uuid NOT NULL,
	"score" integer,
	"completed" boolean DEFAULT false,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0)
);
--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizOptions" ADD CONSTRAINT "quizOptions_question_id_quizQuestion_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quizQuestion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizQuestion" ADD CONSTRAINT "quizQuestion_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_attempt_id_user_quiz_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."user_quiz_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_question_id_quizQuestion_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quizQuestion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_selected_option_id_quizOptions_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."quizOptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_quiz_attempts" ADD CONSTRAINT "user_quiz_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_quiz_attempts" ADD CONSTRAINT "user_quiz_attempts_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "correct_option" ON "quizQuestion" USING btree ("correct_option_id");