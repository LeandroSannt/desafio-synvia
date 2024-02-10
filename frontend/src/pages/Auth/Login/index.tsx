import React from 'react'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Form } from './styles'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginFormSchema } from '../../../validations/authSchemas'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useToast } from '../../../hooks/useToast'
import { useAuth } from '../../../hooks/useAuth'

type LoginData = z.infer<typeof loginFormSchema>

const Login: React.FC = () => {
  const methods = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema)
  })
  const { handleSubmit } = methods

  const { notify } = useToast()

  const { signIn } = useAuth()

  const onSubmit = async ({ email, password }: LoginData) => {
    try {
      await signIn({
        email,
        password
      })
      notify({
        message: 'Bem vindo',
        types: 'success'
      })
    } catch (error) {
      notify({
        message: error.response.data.message,
        types: 'error'
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
        <h1>Login</h1>

        <Input placeholder="Email" label="Email" name="email" />
        <Input placeholder="Senha" label="Password" name="password" />
        <Link to={'/sign-up'}>Realizar cadastro </Link>

        <Button sedingRequest={isLoading} type="submit">
          Entrar
        </Button>
      </Form>
    </FormProvider>
  )
}
export { Login }
