CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_digest" varchar(255) NOT NULL,
	"role" smallint DEFAULT 0 NOT NULL,
	"status" smallint DEFAULT 1 NOT NULL,
	"full_name" varchar(255),
	"avatar_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"ip_address" varchar(255),
	"user_agent" json DEFAULT '{"browserName":"Unknown","browserVersion":"Unknown","osName":"Unknown","osVersion":"Unknown"}'::json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "index_users_on_username" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "index_users_on_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "index_user_sessions_on_user_id" ON "user_sessions" USING btree ("user_id");