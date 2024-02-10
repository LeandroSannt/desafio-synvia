import { BaseController } from 'App/Controllers/Http/BaseController'
import { TagService } from 'App/Services/TagServices'
import { CreateTagValidator } from 'App/Validators/CreateTagValidator'

export default class TagController extends BaseController {
  constructor() {
    super({
      service: TagService,
      validator: {
        create: CreateTagValidator,
        update: CreateTagValidator,
      },
    })
  }
}
