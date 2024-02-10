import React, { InputHTMLAttributes, useState } from 'react'

import { Container, Content } from './styles'
import { useFormContext } from 'react-hook-form'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameContent?: string
  name?: string
  label?: string
  hasError?: string
  defaultValue?: number | string
  disabled?: boolean
}
const Input: React.FC<InputProps> = ({
  name,
  hasError,
  disabled,
  type,
  defaultValue,
  label,
  required,
  ...rest
}) => {
  const [onFocused, setOnFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Content hasError={!!hasError || !!errors[name]?.message}>
      <h3>
        {label} {required && <span>*</span>}
      </h3>
      <Container
        disabled={disabled}
        hasError={!!hasError || !!errors[name]?.message}
        hasFilled={watch(name)}
        hasFocus={onFocused}
      >
        <input
          disabled={disabled}
          {...(name && { ...register(name) })}
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
export { Input }
