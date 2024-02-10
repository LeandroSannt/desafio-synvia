import User from 'App/Models/User'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { ResponseProps } from '../Interfaces'
import Hash from '@ioc:Adonis/Core/Hash'
import UnAuthorized from 'App/Exceptions/UnAuthorizedException'
import { SendEmail } from 'App/Providers/MailProvider'
import { sign, verify } from 'jsonwebtoken'
import authconfig from '../../config/jwt'
import Env from '@ioc:Adonis/Core/Env'

interface AuthProps {
  email: string
  password: string
  auth: AuthContract
}

interface TokenPayload {
  iat: number
  expo: number
  sub: string
}

interface UpdatePasswordProps {
  password: string
  token: string
}

class AuthService {
  async login({ email, password, auth }: AuthProps): Promise<ResponseProps> {
    const user = await User.query().where('email', email).first()

    if (!user) {
      throw new UnAuthorized('Usuário não encontrado', 404)
    }

    if (!(await Hash.verify(user.password, password))) {
      throw new UnAuthorized('Email ou senha invalidos', 400)
    }

    const token = await auth.use('api').generate(user, { expiresIn: '24h' })

    return {
      data: { user, token },
      status: 201,
    }
  }

  async forgotPassword(email: string) {
    const sendEmail = new SendEmail()

    const user = await User.findBy('email', email)

    if (!user) {
      throw new UnAuthorized('Usuário não encontrado', 404)
    }

    const token = sign({}, authconfig.jwt.secret, {
      subject: user.email.toString(),
      expiresIn: authconfig.jwt.expiresIn,
    })

    const obj = {
      token: token,
      user,
      urlToken: `${Env.get('FRONT_URL')}/update-password?token=${token}`,
    }

    await sendEmail.email({
      to: email,
      subject: 'Recuperação de senha',
      htmlView: {
        view: 'update_password',
        props: obj,
      },
    })

    return {
      data: obj,
      status: 200,
    }
  }

  async verifyToken(token: string) {
    var decoded = verify(token, authconfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    const user = await User.findBy('email', sub)

    if (!user) {
      throw new UnAuthorized('Acesso negado', 403)
    }

    return {
      data: { passed: true },
      status: 200,
    }
  }

  async updatePassword({ token, password }: UpdatePasswordProps) {
    var decoded = verify(token, authconfig.jwt.secret)
    const { sub: email } = decoded as TokenPayload

    const user = await User.findByOrFail('email', email)
    user.password = password

    await user.save()

    return
  }
}

export { AuthService }
