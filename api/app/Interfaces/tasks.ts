export interface TaskPayload {
  title: string
  description: string
  responsable_user_id?: number
  user_id: number
  tags?: Array<{
    tag: string
  }>
}

export interface TaskPayloadUpdate {
  task_id: number
  title?: string
  description?: string
  responsable_user_id?: number
  tags?: Array<{
    id?: number
    tag: string
  }>
}

export interface TaskProps {
  user_id: number
  description?: string
  start_date?: string
  end_date?: string
  title?: string
  responsable?: string
  tag?: string
}
