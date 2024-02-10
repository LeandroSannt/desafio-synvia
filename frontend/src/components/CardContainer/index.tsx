import React from 'react'

import { Container } from './styles'

type Props = {
  children?: React.ReactNode // 👈️ type children
}
const CardContainer = ({ children }: Props) => {
  return <Container>{children}</Container>
}

export { CardContainer }
