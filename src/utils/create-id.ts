import { init } from '@paralleldrive/cuid2'

/**
 * Create a random id using {@link https://github.com/paralleldrive/cuid2 @paralleldrive/cuid2}
 */
export const createId = init({
  random: Math.random,
  length: 6,
})
