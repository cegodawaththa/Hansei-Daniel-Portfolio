CREATE TYPE "public"."project_status" AS ENUM('completed', 'ongoing', 'future');

ALTER TABLE "projects" ADD COLUMN "status" "project_status" DEFAULT 'completed';