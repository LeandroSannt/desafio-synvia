import { BaseServices } from './BaseServices'
import Tags from 'App/Models/Tags'

class TagService extends BaseServices {
  constructor() {
    super({ model: Tags, name_model: 'tag' })
    this.Model = Tags
  }
}

export { TagService }
