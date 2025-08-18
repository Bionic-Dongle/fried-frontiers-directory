// Drizzle ORM configuration for database migrations
// CURSOR EXTENSION POINT: Configure for your database provider

import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/database/schema.ts",
  out: "./lib/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
