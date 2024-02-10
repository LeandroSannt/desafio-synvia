import { CreateUserValidator } from './../../Validators/CreateUserValidator'
import { UserService } from 'App/Services/UserService'
import { BaseController } from 'App/Controllers/Http/BaseController'

export default class UserController extends BaseController {
  constructor() {
    super({
      service: UserService,
      validator: {
        create: CreateUserValidator,
        update: CreateUserValidator,
      },
    })
  }
}
