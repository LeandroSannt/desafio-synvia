import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('tasks/task-with-tags', 'TaskController.createTask')
  Route.put('tasks/update-task/:id', 'TaskController.updateTaskForTags')
  Route.get('tasks/all', 'TaskController.findAllTasks')
  Route.get('tasks/get-task/:id', 'TaskController.getTask')

  Route.resource('tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
