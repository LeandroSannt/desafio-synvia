import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
test.group('Create Tasks ', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['create-tasks']))

  const routes = '/tasks/task-with-tags'
  test('I shouldnt create a task without a description', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      title: 'teste',
    })
    responseTask.assertStatus(422)
  })
  test('I shouldnt create a task without a title', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      description: '32o423k9ejk8i394j58345j8i43',
    })
    responseTask.assertStatus(422)
  })
  test('must create task without tag', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      title: 'task1',
      description: '32o423k9ejk8i394j58345j8i43',
    })
    responseTask.assertStatus(200)
  })
  test('must create task without responsible', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      title: 'task1',
      description: '32o423k9ejk8i394j58345j8i43',
      tags: [
        {
          tag: 'teste',
        },
      ],
    })
    responseTask.assertStatus(200)
  })
  test('should be create task', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      title: 'task1',
      description: '32o423k9ejk8i394j58345j8i43',
      responsable_user_id: 2,
      tags: [
        {
          tag: 'teste',
        },
      ],
    })
    responseTask.assertStatus(200)
  })
})
