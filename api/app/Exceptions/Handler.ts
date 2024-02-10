import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */

    const objectError = {
      message: 'Erro interno do servidor',
      route: ctx.request.url(),
      method: ctx.request.method(),
      date: new Date(),
    }

    if (error) {
    }

    if (error.code === 'E_VALIDATION_FAILURE' || error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(422).json({ error: error.messages || error.message })
    } else if (error.status && error.status >= 500 && error.status <= 599) {
      Logger.error('Erro interno do servidor:', objectError, error.stack)
      // Pode adicionar lógica adicional aqui, como enviar notificações por e-mail, etc.
      return ctx.response.status(500).send(objectError)
    } else if (error) {
      Logger.error('Erro interno do servidor:', objectError, error.stack)

      if (error.message) {
        return ctx.response.status(error?.status || 500).json({ message: error.message })
      }

      return ctx.response.status(500).json(objectError)
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
