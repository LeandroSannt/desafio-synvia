import { z } from 'zod'

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail invalido'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres')
})

const signUpFormSchema = z
  .object({
    email: z
      .string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato de e-mail invalido'),
    name: z.string().nonempty('O e-mail é obrigatório'),
    password: z
      .string()
      .nonempty('Senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    password_confirmation: z.string()
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'A senha e a confirmação da senha não são iguais',
    path: ['password_confirmation']
  })
export { loginFormSchema, signUpFormSchema }
