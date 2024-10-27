import { loadEnvConfig } from '@next/env'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})
