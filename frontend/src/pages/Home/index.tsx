import React from 'react'

import { Container } from './styles'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
export { Home }
