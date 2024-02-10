import User from 'App/Models/User'
import { BaseServices } from './BaseServices'

class UserService extends BaseServices {
  constructor() {
    super({ model: User, name_model: 'usuário' })
    this.Model = User
  }
}

export { UserService }
