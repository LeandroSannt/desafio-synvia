import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseController } from 'App/Controllers/Http/BaseController'
import { TaskService } from 'App/Services/TaskServices'
import { CreateTaskValidator } from 'App/Validators/CreateTaskValidator'
import { CreateTaskWithTagValidator } from 'App/Validators/CreateTaskWithTagValidator'
import { UpdateTaskValidator } from 'App/Validators/UpdateTaskValidator'
import { UpdateTaskWithTagValidatorValidator } from 'App/Validators/UpdateTaskWithTagValidator'

export default class TaskController extends BaseController {
  constructor() {
    super({
      service: TaskService,
      validator: {
        create: CreateTaskValidator,
        update: UpdateTaskValidator,
      },
    })
  }

  async createTask({ request, response, auth }: HttpContextContract) {
    const tasks = new TaskService()

    const data = await request.validate(CreateTaskWithTagValidator)

    const { user } = auth

    const result = await tasks.createTask({ ...data, user_id: Number(user?.id) })

    return response.json(result)
  }

  async updateTaskForTags({ response, request, params }: HttpContextContract) {
    const tasks = new TaskService()

    const payload = await request.validate(UpdateTaskWithTagValidatorValidator)

    const { id } = params

    const result = await tasks.updateTaskForTags({ task_id: id, ...payload })

    return response.status(200).json(result)
  }

  async findAllTasks({ response, request, auth }: HttpContextContract) {
    const tasks = new TaskService()

    const { user } = auth

    const payload = request.only([
      'description',
      'start_date',
      'end_date',
      'title',
      'responsable',
      'tag',
    ])

    const result = await tasks.findAllTasks({ user_id: Number(user?.id), ...payload })

    return response.json(result)
  }

  async getTask({ response, params }: HttpContextContract) {
    const tasks = new TaskService()

    const { id } = params

    const result = await tasks.getTask(id)

    return response.json(result)
  }
}
