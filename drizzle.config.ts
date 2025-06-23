import { defineConfig } from "drizzle-kit";

import { env } from "@/lib/config/env";

export default defineConfig({
  schema: "./src/database/schema/index.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL
  },
  strict: true
});
