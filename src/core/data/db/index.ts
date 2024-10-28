import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@/config/env'

import * as schema from './schema'

/**
 * Drizzle postgres client
 */
export const client = postgres(env.DATABASE_URL)

/**
 * Drizzle database instance
 */
export const db = drizzle({ client, schema, logger: true })
