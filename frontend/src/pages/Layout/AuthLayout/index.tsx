import React from 'react'

import { Container, Section, Header } from './styles'
import { CardContainer } from '../../../components/CardContainer'

type Props = {
  children?: React.ReactNode // 👈️ type children
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header>
        <Section>
          <img
            src="https://synvia.com/assets/imgs/logos/synvia_white.svg"
            alt="logo"
          />

          <CardContainer>{children}</CardContainer>
        </Section>
      </Header>

      <footer>
        <img
          src="https://synvia.com/assets/imgs/logos/synvia_black.svg"
          alt="logo colorida"
        />
      </footer>
    </Container>
  )
}
export { AuthLayout }
