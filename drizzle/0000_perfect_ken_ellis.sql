CREATE TABLE "transcript_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" varchar(256),
	"chunk_index" integer NOT NULL,
	"content" varchar(10000) NOT NULL,
	"embedding" vector(768) NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" varchar(256),
	"email" varchar(256) NOT NULL,
	"image" varchar(800),
	"age" integer,
	"subscribedUser" boolean DEFAULT false,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0),
	"delete_at" timestamp (0),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "video_chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" varchar(256),
	"title" varchar(500) NOT NULL,
	"timestamp" varchar(20),
	"description" varchar(7000) NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0)
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"video_id" varchar(256) NOT NULL,
	"title" varchar(800) NOT NULL,
	"thumbnail" varchar(2000) NOT NULL,
	"duration" varchar(50),
	"transcript" varchar(10485700) NOT NULL,
	"embedding_done" boolean DEFAULT false,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0),
	CONSTRAINT "videos_video_id_unique" UNIQUE("video_id")
);
--> statement-breakpoint
ALTER TABLE "transcript_chunks" ADD CONSTRAINT "transcript_chunks_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_chapters" ADD CONSTRAINT "video_chapters_video_id_videos_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("video_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "video_id_Idx" ON "videos" USING btree ("video_id");