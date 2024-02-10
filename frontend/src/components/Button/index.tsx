import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'
import { BeatLoader } from 'react-spinners'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sedingRequest?: boolean
}

const Button: React.FC<ButtonProps> = ({
  sedingRequest,
  className,
  children,
  ...rest
}) => {
  return (
    <Container disabled={sedingRequest} {...rest} className={className}>
      {sedingRequest ? <BeatLoader color="#BED747" size={10} /> : children}
    </Container>
  )
}
export { Button }
