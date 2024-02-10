import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Tags from './Tags'
import User from './User'

export default class Tasks extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public user_id: number

  @hasMany(() => Tags, { foreignKey: 'task_id' })
  public tags: HasMany<typeof Tags>

  @column()
  public responsable_user_id: number

  @belongsTo(() => User, { foreignKey: 'responsable_user_id' })
  public responsable: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
