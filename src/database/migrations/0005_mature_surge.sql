ALTER TABLE "experiences" RENAME COLUMN "project_type" TO "project";--> statement-breakpoint
ALTER TABLE "projects" RENAME COLUMN "thumbnail" TO "thumbnails";--> statement-breakpoint
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_project_type_projects_id_fk";
--> statement-breakpoint
DROP INDEX "experience_project_idx";--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_project_projects_id_fk" FOREIGN KEY ("project") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "experience_project_idx" ON "experiences" USING btree ("project");