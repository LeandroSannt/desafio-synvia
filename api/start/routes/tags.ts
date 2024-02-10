import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('tags', 'TagController').apiOnly()
}).middleware(['auth'])
