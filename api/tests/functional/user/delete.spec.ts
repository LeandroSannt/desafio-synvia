import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Delete user', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['delete-user']))

  const routes = '/users'

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should not find a user', async ({ client }) => {
    const response = await client.delete(`${routes}/3`)

    response.assertStatus(404)
  })

  test('should delete user', async ({ client }) => {
    const response = await client.delete(`${routes}/1`)

    response.assertStatus(204)
  })
})
