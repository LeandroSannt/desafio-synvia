import { render } from '@testing-library/react'
import { Login } from './index' // Importe o componente de login aqui

describe('ola mundo', () => {
  it('teste2', () => {
    expect(1).toBe(1)

    render(<Login />)
  })
})

// test('renders login form', async () => {
//   const { getByPlaceholderText, getByText } = render(<Login />)

//   // Encontre os elementos relevantes do formulário de login
//   const emailInput = getByPlaceholderText('Email')
//   const passwordInput = getByPlaceholderText('Senha')
//   const submitButton = getByText('Entrar')

//   // Simule a entrada do usuário
//   fireEvent.change(emailInput, { target: { value: 'example@example.com' } })
//   fireEvent.change(passwordInput, { target: { value: 'password123' } })

//   // Simule o envio do formulário
//   fireEvent.click(submitButton)

//   // Aguarde até que a resposta da API seja processada (exemplo)
//   await waitFor(() => {
//     expect(window.location.pathname).toBe('/home')
//     expect(localStorage.getItem('auth:token')).not.toBeNull()
//     // Adicione aqui as verificações para o comportamento esperado após o login
//   })
// })
