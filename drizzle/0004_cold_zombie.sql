ALTER TABLE "quiz" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "quizOptions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();