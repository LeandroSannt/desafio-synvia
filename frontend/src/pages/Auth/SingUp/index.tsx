import React from 'react'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Form } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signUpFormSchema } from '../../../validations/authSchemas'
import { useMutation } from 'react-query'
import { useToast } from '../../../hooks/useToast'
import api from '../../../services/api'

import { useNavigate } from 'react-router-dom'

type SignUpSchema = z.infer<typeof signUpFormSchema>

const SingUp: React.FC = () => {
  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpFormSchema)
  })
  const { handleSubmit } = methods

  const navigate = useNavigate()

  const { notify } = useToast()

  const onSubmit = async ({
    email,
    name,
    password,
    password_confirmation
  }: SignUpSchema) => {
    try {
      await api.post(`/users`, {
        email,
        name,
        password,
        password_confirmation
      })

      notify({
        message: 'Usuario cadastrado com sucesso',
        types: 'success'
      })

      navigate('/login')
    } catch (error) {
      error.response.data.error.errors.forEach(error => {
        notify({
          message: error.message,
          types: 'error'
        })
      })
    }
  }

  const { mutate, isLoading } = useMutation(onSubmit)

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(data => {
          mutate(data)
        })}
      >
        <h1>Realizar Cadastro</h1>

        <Input placeholder="Nome Completo" label="Nome" name="name" />
        <Input placeholder="Email valido" label="Email" name="email" />
        <Input
          type="password"
          placeholder="A senha deve conter 6 digitos"
          label="Senha"
          name="password"
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          label="Confirmação da senha"
          name="password_confirmation"
        />

        <Button sedingRequest={isLoading} type="submit">
          Cadastrar
        </Button>
      </Form>
    </FormProvider>
  )
}
export { SingUp }
