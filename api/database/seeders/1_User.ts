import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@teste.com',
        password: '123456',
      },
      {
        name: 'responsable',
        email: 'responsable@teste.com',
        password: '123456',
      },
    ])
  }
}
