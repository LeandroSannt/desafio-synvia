import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
})
