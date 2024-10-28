import { client, db } from '.'
import { admin } from './schema'

/**
 * Fill some admin data
 */
async function seed() {
  await db.delete(admin)

  await db.insert(admin).values([
    {
      id: '123456',
      name: 'Bruno',
      email: 'bruno@email.com',
      password: 'Test@123',
    },
    {
      id: '456789',
      name: 'Samuel',
      email: 'samuel@email.com',
      password: 'Test@456',
    },
  ])
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    client.end()
  })
