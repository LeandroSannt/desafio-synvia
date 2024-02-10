import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tasks from 'App/Models/Tasks'

export default class TaskSeeder extends BaseSeeder {
  public async run() {
    await Tasks.createMany([
      {
        user_id: 1,
        responsable_user_id: 2,
        description: 'teste',
        title: 'teste',
      },
    ])
  }
}
