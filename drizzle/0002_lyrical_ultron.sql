CREATE TABLE "summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" varchar(256) NOT NULL,
	"quick_summary" varchar(10000),
	"detailed_summary" varchar(500000),
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0),
	CONSTRAINT "summary_video_id_unique" UNIQUE("video_id")
);
--> statement-breakpoint
ALTER TABLE "summary" ADD CONSTRAINT "summary_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;