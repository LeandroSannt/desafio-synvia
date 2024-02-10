import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collaborator from 'App/Models/Collaborator'

// Defina a estrutura da variável global
declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    tokenFortBrasil: {
      token_type: string
      expires_in: number
      access_token: string
    }
    tokenFortBrasilPropsal: {
      id: number
      accessToken: string
      expiresIn: number
    }
    currentCollaborator: Collaborator
  }
}
