import { TaskPayload, TaskPayloadUpdate, TaskProps } from 'App/Interfaces/tasks'
import { BaseServices } from './BaseServices'
import Tasks from 'App/Models/Tasks'
import Tags from 'App/Models/Tags'

class TaskService extends BaseServices {
  constructor() {
    super({ model: Tasks, name_model: 'task' })
    this.Model = Tasks
  }

  async createTask({ description, responsable_user_id, title, tags, user_id }: TaskPayload) {
    const task = await Tasks.create({ title, description, responsable_user_id, user_id })

    if (!!tags?.length) {
      const savedTags = await task.related('tags').createMany(tags)

      return {
        task,
        tags: savedTags,
      }
    }

    return task
  }

  async findAllTasks({
    user_id,
    description,
    title,
    end_date,
    start_date,
    responsable,
    tag,
  }: TaskProps) {
    const tasks = await Tasks.query()
      .where('user_id', user_id)
      .preload('tags')
      .preload('responsable')
      .if(description, (query) => {
        query.whereILike('description', `%${description}%`)
      })
      .if(title, (query) => {
        query.whereILike('title', `%${title}%`)
      })
      .if(end_date && start_date, (query) => {
        query.whereBetween('created_at', [
          `${start_date}T00:00:00.000-03:00`,
          `${end_date}T23:59:59.000-03:00`,
        ])
      })
      .if(responsable, (query) => {
        query.whereHas('responsable', (query) => {
          query.whereILike('name', `%${responsable}%`)
        })
      })
      .if(tag, (query) => {
        query.whereHas('tags', (query) => {
          query.whereILike('tag', `%${tag}%`)
        })
      })

    return tasks
  }

  async getTask(task_id: number) {
    const tasks = await Tasks.findByOrFail('id', task_id)
    await tasks?.load('tags')
    await tasks?.load('responsable')

    return tasks
  }
  async updateTaskForTags(payload: TaskPayloadUpdate) {
    const tasks = await Tasks.findBy('id', payload.task_id)

    if (tasks) {
      if (payload.description) tasks.description = payload.description
      if (payload.title) tasks.title = payload.title
      if (payload.responsable_user_id) tasks.responsable_user_id = payload.responsable_user_id

      await tasks?.load('tags')

      await tasks.save()

      payload.tags?.forEach(async (tag) => {
        if (tag.id) {
          await Tags.updateOrCreate(
            { id: tag.id },
            {
              tag: tag.tag,
            }
          )
        } else {
          await Tags.create({
            tag: tag.tag,
            task_id: tasks.id,
          })
        }
      })

      return tasks
    }
  }
}

export { TaskService }
