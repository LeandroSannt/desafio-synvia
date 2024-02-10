import { z } from 'zod'

const taskFormSchema = z.object({
  title: z.string().nonempty('Nome do seviço obrigátorio'),
  description: z.string().nonempty('Descrição obrigátorio'),
  responsable_user_id: z.string().nullable(),
  tags: z.array(
    z
      .object({
        tag: z
          .string()
          .nonempty('tag obrigátoria')
          .max(4, 'Tag não pode ter mais que 4 caracteres'),
        default_id: z.number().optional()
      })
      .optional()
      .nullable()
  )
  // .min(1, 'Insira pelo menos uma dependencia')
  // .refine(dependencies => {
  //   const countDefaultTrue = dependencies.filter(dep => dep.default).length
  //   return countDefaultTrue <= 1
  // }, 'Somente um item pode ser marcado como padrão (default=true)')
})

export { taskFormSchema }
