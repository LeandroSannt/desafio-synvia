import React from 'react'

import { Container } from './styles'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  return (
    <Container>
      <div>
        <h3>
          <img
            src="https://synvia.com/assets/imgs/logos/synvia_black.svg"
            alt="logo colorida"
          />
        </h3>

        <ul>
          <li>
            <NavLink to={'/home/tasks'}>Tarefas</NavLink>
          </li>

          <li className="user">
            Ola {user.name}!<button onClick={signOut}>sair</button>
          </li>
        </ul>
      </div>
    </Container>
  )
}
export { Header }
