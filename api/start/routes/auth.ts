import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/forgot-password', 'AuthController.forgotPassword')
  Route.get('/verify-token', 'AuthController.verifyToken')
  Route.patch('/update-password/:token', 'AuthController.updatePassword')
}).prefix('auth')
