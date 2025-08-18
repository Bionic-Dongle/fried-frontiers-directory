// Database connection configuration supporting multiple providers
// CURSOR EXTENSION POINT: Configure for your preferred database provider

import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

// Environment variables validation
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

// CURSOR EXTENSION POINT: Add validation for your database provider
function validateEnvironment() {
  const missing = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`)
    console.log("CURSOR TODO: Configure environment variables in .env.local:")
    missing.forEach((envVar) => {
      console.log(`${envVar}=your_${envVar.toLowerCase()}_here`)
    })
  }
}

// Initialize database connection
let db: ReturnType<typeof drizzle> | null = null

export function getDatabase() {
  if (!db) {
    validateEnvironment()

    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is required for database connection")
      throw new Error("Database configuration missing")
    }

    try {
      // CURSOR EXTENSION POINT: Configure for your database provider
      // Current setup uses Neon PostgreSQL
      const sql = neon(process.env.DATABASE_URL)
      db = drizzle(sql, { schema })

      console.log("✅ Database connection established")
    } catch (error) {
      console.error("❌ Database connection failed:", error)
      throw error
    }
  }

  return db
}

// Database health check
export async function checkDatabaseHealth() {
  try {
    const db = getDatabase()
    // Simple query to test connection
    await db.select().from(schema.categories).limit(1)
    return { healthy: true, message: "Database connection is healthy" }
  } catch (error) {
    console.error("Database health check failed:", error)
    return {
      healthy: false,
      message: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}

// CURSOR EXTENSION POINT: Add database provider specific configurations
export const databaseConfig = {
  provider: "neon" as const,
  maxConnections: 10,
  connectionTimeout: 30000,
  queryTimeout: 60000,
  ssl: process.env.NODE_ENV === "production",
}

// Export database instance
export { db }
export default getDatabase
