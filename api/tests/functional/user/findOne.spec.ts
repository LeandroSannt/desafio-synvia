import { test } from '@japa/runner'

test.group('Get one user', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['get-user']))

  const routes = '/users'

  test('should not find a user', async ({ client }) => {
    const response = await client.get(`${routes}/3`)

    response.assertStatus(404)
  })
  test('should return one user', async ({ client }) => {
    const response = await client.get(`${routes}/1`)

    response.assertStatus(200)
  })
})
