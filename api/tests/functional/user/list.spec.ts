import { test } from '@japa/runner'

test.group('User list', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['list-user']))

  const routes = '/users'

  test('should return all users', async ({ client }) => {
    const response = await client.get(routes)

    response.assertStatus(201)
  })
})
