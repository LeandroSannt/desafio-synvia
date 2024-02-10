import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthService } from 'App/Services/AuthService'

export default class AuthController {
  async login({ response, request, auth }: HttpContextContract) {
    const authService = new AuthService()

    const email = request.input('email')
    const password = request.input('password')

    const { status, data } = await authService.login({ auth, email, password })
    return response.status(status).json(data)
  }

  async forgotPassword({ request, response }: HttpContextContract) {
    const authService = new AuthService()

    const email = request.input('email')

    const { status, data } = await authService.forgotPassword(email)

    return response.status(status).json(data)
  }

  async verifyToken({ request, response }: HttpContextContract) {
    const authService = new AuthService()

    const token = request.input('token')

    const { status, data } = await authService.verifyToken(token)

    return response.status(status).json(data)
  }
}
