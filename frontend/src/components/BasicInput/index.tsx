import React, { InputHTMLAttributes, useState } from 'react'

import { Container, Content } from './styles'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameContent?: string
  name?: string
  label?: string
  hasError?: string
  defaultValue?: number | string
  disabled?: boolean
}
const BasicInput: React.FC<InputProps> = ({
  name,
  disabled,
  type,
  defaultValue,
  label,
  required,
  ...rest
}) => {
  const [onFocused, setOnFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <Content>
      <h3>
        {label} {required && <span>*</span>}
      </h3>
      <Container hasFocus={onFocused} disabled={disabled}>
        <input
          disabled={disabled}
          type={passwordVisible ? 'text' : type}
          {...rest}
          id={name}
          defaultValue={defaultValue}
          onFocus={() => {
            setOnFocused(true)
          }}
          onBlur={() => {
            setOnFocused(false)
          }}
          max={type === 'date' ? '9999-12-31' : ''}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => {
              setPasswordVisible(!passwordVisible)
            }}
          >
            {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </button>
        )}
      </Container>
    </Content>
  )
}
export { BasicInput }
