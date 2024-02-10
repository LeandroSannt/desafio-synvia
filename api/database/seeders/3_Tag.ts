import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tags from 'App/Models/Tags'

export default class TagSeeder extends BaseSeeder {
  public async run() {
    await Tags.createMany([
      {
        tag: 'teste',
        task_id: 1,
      },
      {
        tag: 'teste2',
        task_id: 1,
      },
    ])
  }
}
