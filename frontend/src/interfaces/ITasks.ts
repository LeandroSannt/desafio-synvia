export interface TasksDTO {
  id: number
  title: string
  description: string
  user_id: number
  responsable_user_id?: number
  created_at: string

  tags?: Array<{
    id: number
    tag: string
    task_id: number
    created_at: string
  }>

  responsable?: {
    id: number
    name: string
  }
}
