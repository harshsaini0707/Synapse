CREATE TABLE "oneTimePayments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"dodo_payment_id" varchar(256) NOT NULL,
	"dodo_customer_id" varchar(256),
	"product_id" varchar(256) NOT NULL,
	"plan_name" varchar(256) NOT NULL,
	"plan_duration" varchar(50) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'USD',
	"status" varchar(50) NOT NULL,
	"customer_email" varchar(256),
	"customer_name" varchar(256),
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL,
	"updated_at" timestamp (0),
	CONSTRAINT "oneTimePayments_dodo_payment_id_unique" UNIQUE("dodo_payment_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "has_user_trial" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "trial_videos_created" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "premium_videos_created" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "oneTimePayments" ADD CONSTRAINT "oneTimePayments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;