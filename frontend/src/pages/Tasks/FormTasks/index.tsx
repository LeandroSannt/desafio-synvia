import React, { Fragment } from 'react'

import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { ContainerSelect, Form, FormTag, Header } from './styles'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from 'react-query'
import { useToast } from '../../../hooks/useToast'
import { Select } from './styles'
import api from '../../../services/api'
import { taskFormSchema } from '.././../../validations/taskFormSchema'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../../services/queryClient'
import { useParams } from 'react-router-dom'
import { TasksDTO } from 'interfaces/ITasks'
type TaskFormSchema = z.infer<typeof taskFormSchema>

const FormTasks: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const methods = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema)
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    register
  } = methods
  const { notify } = useToast()

  const onSubmit = async ({
    description,
    responsable_user_id,
    tags,
    title
  }: TaskFormSchema) => {
    try {
      if (id) {
        const formmatedTags = tags.map(tag => {
          return {
            id: tag.default_id,
            tag: tag.tag
          }
        })

        await api.put(`tasks/update-task/${id}`, {
          title,
          description,
          responsable_user_id,
          tags: formmatedTags
        })

        await queryClient.invalidateQueries('task')
      } else {
        await api.post(`/tasks/task-with-tags`, {
          title,
          description,
          responsable_user_id,
          tags
        })
      }

      notify({
        message: 'Atividade Resgistrada',
        types: 'success'
      })

      navigate('/home/tasks')

      await queryClient.invalidateQueries('tasks')
    } catch (error) {
      if (error.response.data.error.errors.length) {
        error.response.data.error.errors.forEach(error => {
          notify({
            message: error.message,
            types: 'error'
          })
        })
      } else {
        notify({
          message: 'Error inesperado',
          types: 'error'
        })
      }
    }
  }

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tags'
  })

  const fetchData = async () => {
    const { data } = await api.get(`users`)

    return data
  }

  const fetchDataTask = async () => {
    if (id) {
      const { data } = await api.get(`tasks/get-task/${id}`)

      replace(data.tags)

      return data
    }
  }

  const { data: users } = useQuery(['users'], fetchData)

  const { data: task } = useQuery<TasksDTO>(['task', id], fetchDataTask)

  const { mutate, isLoading } = useMutation(onSubmit)

  const addNewDependence = () => {
    append({})
  }

  const removedependencies = (index: number) => {
    remove(index)
  }

  const handleDeleteTag = async (tag_id: number) => {
    const confirmation = confirm('Deseja deletar essa tag?')
    if (confirmation) {
      await api.delete(`tags/${tag_id}`)

      await queryClient.invalidateQueries('tasks')
      await queryClient.invalidateQueries('task')
    }
  }

  const handleDeleteTask = async (task_id: string) => {
    const confirmation = confirm('Deseja deletar essa atividade ?')

    if (confirmation) {
      await api.delete(`/tasks/${task_id}`)
      navigate('/home/tasks')
      await queryClient.invalidateQueries('tasks')

      notify({
        message: 'Atividade excluida',
        types: 'success'
      })
    }
  }

  if (id && !task) {
    return <></>
  }
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(data => {
          mutate(data)
        })}
      >
        <Header>
          <h1>{id ? 'Editar' : 'Cadastrar'} atividade</h1>

          {id && (
            <Button
              onClick={() => {
                handleDeleteTask(id)
              }}
              type="button"
              className="btn"
            >
              Excluir atividade
            </Button>
          )}
        </Header>

        <Input
          defaultValue={task?.title}
          placeholder="Titulo da tarefa"
          label="Titulo"
          name="title"
        />
        <Input
          placeholder="Descrição da atividade"
          label="Descrição"
          name="description"
          defaultValue={task?.description}
        />

        <ContainerSelect>
          <h3>Responsavel</h3>
          <Select
            defaultValue={task?.responsable_user_id?.toString()}
            {...register('responsable_user_id')}
          >
            <option selected disabled value={''}>
              Selecione um responsavel
            </option>
            {users?.map(user => {
              return <option value={user.id}>{user.name}</option>
            })}
          </Select>
        </ContainerSelect>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0'
          }}
        >
          <h3>Tags</h3>
          <button onClick={addNewDependence} type="button">
            + Adicionar nova Tag
          </button>
        </div>

        {fields.map((field, index) => {
          return (
            <Fragment key={field.id}>
              <FormTag className="">
                <Input
                  placeholder="Nome da tag"
                  name={`tags.${index}.tag`}
                  maxLength={4}
                  label="Tag"
                  hasError={
                    errors?.tags?.length >= 1
                      ? errors?.tags[index]?.tag?.message
                      : ''
                  }
                  required
                />

                <button
                  onClick={() => {
                    field.default_id
                      ? handleDeleteTag(field.default_id)
                      : removedependencies(index)
                  }}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </FormTag>
              <div className="divider"></div>
            </Fragment>
          )
        })}

        <Button sedingRequest={isLoading} type="submit">
          Salvar atividade
        </Button>
      </Form>
    </FormProvider>
  )
}
export { FormTasks }
