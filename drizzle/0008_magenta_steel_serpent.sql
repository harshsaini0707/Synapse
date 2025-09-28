CREATE TABLE "flashcards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" varchar(256) NOT NULL,
	"question" varchar(5000) NOT NULL,
	"answer" varchar(5000) NOT NULL,
	"hint" varchar(256) NOT NULL,
	"created-at" timestamp (0) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "summaryChunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" varchar(256) NOT NULL,
	"summrayChunkss" varchar(20000) NOT NULL,
	"created_at" timestamp (0) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summaryChunks" ADD CONSTRAINT "summaryChunks_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;