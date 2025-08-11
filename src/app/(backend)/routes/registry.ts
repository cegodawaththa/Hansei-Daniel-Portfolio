import { createRouter } from "@/lib/server/create-app";
import { AppOpenAPI } from "@/lib/types/server";
import { BASE_API_PATH } from "@/lib/config/constants";
import createApp from "@/lib/server/create-app";

import tasks from "./tasks";
import media from "./media";
import settings from "./settings";
import accomplishments from "./accomplishments";
import qualifications from "./qualifications";
import education from "./education";
import inquiries from "./inquiries";
import projects from "./projects";
import experiences from "./experiences";

export function registerRoutes(app: AppOpenAPI) {
  return app
    .route("/tasks", tasks)
    .route("/media", media)
    .route("/settings", settings)
    .route("/accomplishments", accomplishments)
    .route("/qualifications", qualifications)
    .route("/education", education)
    .route("/inquiries", inquiries)
    .route("/projects", projects)
    .route("/experiences", experiences);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_API_PATH));

export type Router = typeof router;

export const app = registerRoutes(createApp());
