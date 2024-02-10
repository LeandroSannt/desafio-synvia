import { DateTime } from 'luxon'
import { column, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Tags extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @computed()
  public get default_id() {
    return this.id
  }
  @column()
  public tag: string

  @column()
  public task_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
