import React, { useState } from 'react'

import {
  Container,
  Filters,
  Task,
  ContainerTasks,
  Description,
  Tags,
  Title,
  Tag
} from './styles'
import { Button } from '../../components/Button'
import { BasicInput } from '../../components/BasicInput'
import { useQuery } from 'react-query'
import api from '../../services/api'
import { TasksDTO } from '../../interfaces/ITasks'
import moment from 'moment'
import { queryClient } from '../../services/queryClient'
import { useNavigate } from 'react-router-dom'

interface FiltersProps {
  responsable?: string
  title?: string
  description?: string
  tag?: string
  start_date?: string
  end_date?: string
}

const initialValue = {
  responsable: '',
  title: '',
  description: '',
  tag: '',
  start_date: '',
  end_date: ''
}

const Tasks: React.FC = () => {
  const [allTasks, setAllTasks] = useState<TasksDTO[]>([])
  const [filters, setFilters] = useState<FiltersProps>(initialValue)

  const navigate = useNavigate()

  const fetchData = async () => {
    const { data } = await api.get(`tasks/all`, {
      params: {
        ...filters
      }
    })

    setAllTasks(data)
    return data
  }

  useQuery<TasksDTO[]>(['tasks'], fetchData)

  const deleteTag = async (tagId: number) => {
    await api.delete(`tags/${tagId}`)

    await queryClient.invalidateQueries('tasks')
  }

  return (
    <Container>
      <header>
        <h1>Tarefas</h1>

        <Button
          onClick={() => {
            navigate('new')
          }}
          className="maxButton"
        >
          {' '}
          Nova Tarefa
        </Button>
      </header>

      <Filters>
        <div className="row">
          <BasicInput
            onChange={e =>
              setFilters({ ...filters, description: e.target.value })
            }
            placeholder="Descrição da tarefa"
            label="Descrição"
          />
          <BasicInput
            onChange={e => setFilters({ ...filters, title: e.target.value })}
            placeholder="Titulo da tarefa"
            label="Titulo"
          />
          <BasicInput
            onChange={e => setFilters({ ...filters, tag: e.target.value })}
            placeholder="Tag"
            label="Tag"
          />
          <BasicInput
            onChange={e =>
              setFilters({ ...filters, responsable: e.target.value })
            }
            placeholder="Responsavel da tarefa"
            label="Responsavel"
          />
        </div>

        <div className="row">
          <BasicInput
            onChange={e =>
              setFilters({ ...filters, start_date: e.target.value })
            }
            type="date"
            label="Data inicial"
          />
          <BasicInput
            onChange={e => setFilters({ ...filters, end_date: e.target.value })}
            type="date"
            label="Data final"
          />

          <Button onClick={fetchData}>Pesquisar</Button>
        </div>
      </Filters>

      <ContainerTasks>
        {allTasks?.map(task => {
          return (
            <Task>
              <div>
                <Title>
                  <h3>{task.title}</h3>
                  <p>{moment(task.created_at).format('DD/MM/YYYY')}</p>
                </Title>

                {task?.responsable && (
                  <p>Responsavel: {task.responsable.name}</p>
                )}

                <Tags>
                  {task?.tags.map(tag => {
                    return (
                      <Tag
                        onClick={() => {
                          deleteTag(tag.id)
                        }}
                      >
                        {tag.tag}
                      </Tag>
                    )
                  })}
                </Tags>
              </div>

              <Description>
                <p>{task.description}</p>

                <Button
                  onClick={() => {
                    navigate(`${task.id}/details`)
                  }}
                  className="btn"
                >
                  Editar
                </Button>
              </Description>
            </Task>
          )
        })}
      </ContainerTasks>
    </Container>
  )
}
export { Tasks }
