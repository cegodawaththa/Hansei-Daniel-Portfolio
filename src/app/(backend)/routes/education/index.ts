import { createRouter } from "@/lib/server/create-app";

import * as handlers from "./handlers";
import * as routes from "./routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.reorder, handlers.reorder) // Register specific routes before parameterized ones
  .openapi(routes.create, handlers.create)
  .openapi(routes.getById, handlers.getById) // This should come after /reorder
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);

export default router;
