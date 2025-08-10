import { createRouter } from "@/lib/server/create-app";
import { AppOpenAPI } from "@/lib/types/server";
import { BASE_API_PATH } from "@/lib/config/constants";
import createApp from "@/lib/server/create-app";

import tasks from "./tasks";
import media from "./media";
import settings from "./settings";
import accomplishments from "./accomplishments";
import qualifications from "./qualifications";

export function registerRoutes(app: AppOpenAPI) {
  return app
    .route("/tasks", tasks)
    .route("/media", media)
    .route("/settings", settings)
    .route("/accomplishments", accomplishments)
    .route("/qualifications", qualifications);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_API_PATH));

export type Router = typeof router;

export const app = registerRoutes(createApp());
