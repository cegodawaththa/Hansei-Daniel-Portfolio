CREATE TYPE "public"."inquiry_status" AS ENUM('unread', 'read', 'archived');--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text,
	"value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"institution" text,
	"year" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "accomplishments" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"thumbnail" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text,
	"content" text,
	"project_type" text,
	"duration" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"thumbnail" text[],
	"project_type" text,
	"location" text,
	"client" text,
	"project_value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"message" text NOT NULL,
	"status" "inquiry_status" DEFAULT 'unread',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qualifications" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_project_type_projects_id_fk" FOREIGN KEY ("project_type") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "setting_index_idx" ON "site_settings" USING btree ("id");--> statement-breakpoint
CREATE INDEX "setting_key_idx" ON "site_settings" USING btree ("key");--> statement-breakpoint
CREATE INDEX "setting_value_idx" ON "site_settings" USING btree ("value");--> statement-breakpoint
CREATE INDEX "education_institution_idx" ON "education" USING btree ("institution");--> statement-breakpoint
CREATE INDEX "accomplishment_title" ON "accomplishments" USING btree ("title");--> statement-breakpoint
CREATE INDEX "experience_role_idx" ON "experiences" USING btree ("role");--> statement-breakpoint
CREATE INDEX "experience_project_idx" ON "experiences" USING btree ("project_type");--> statement-breakpoint
CREATE INDEX "project_id_idx" ON "projects" USING btree ("id");--> statement-breakpoint
CREATE INDEX "project_name_idx" ON "projects" USING btree ("name");--> statement-breakpoint
CREATE INDEX "project_type_idx" ON "projects" USING btree ("project_type");--> statement-breakpoint
CREATE INDEX "inquiry_email" ON "inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX "qualification_id" ON "qualifications" USING btree ("id");--> statement-breakpoint
CREATE INDEX "qualification_name" ON "qualifications" USING btree ("name");