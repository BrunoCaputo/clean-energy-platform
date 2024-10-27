import { env } from '@/config/env'

/**
 * Function to do HTTP requests
 *
 * @param {string} path The endpoint path
 * @param {RequestInit?} init Optional data for fetch extra configuration
 * @returns The fetch response
 */
export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
