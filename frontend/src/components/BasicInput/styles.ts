import styled, { css } from 'styled-components'

interface InputProps {
  hasFocus: boolean
  disabled: boolean
}

interface ContentProps {}

export const Container = styled.div<InputProps>`
  ${({ disabled, hasFocus }) => css`
    border-bottom: 1px solid #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    padding: 5px;

    width: 100%;
    border: solid #dedede 1px;

    input {
      background-color: inherit !important;
      outline: none;
      border: none;
      height: 25px;
      width: 100%;
    }

    .no-border {
      border: none;
      background-color: transparent;
    }

    ${hasFocus &&
    css`
      border: solid 1px green;
    `}

    ${disabled &&
    css`
      border: solid 1px gray;
    `}

    & + & {
      margin-top: 20px;
    }
  `}

  svg {
    margin-right: 10px;
  }
`

export const Content = styled.div<ContentProps>`
  width: 100%;
  margin-top: 10px;

  h3 {
    margin-bottom: 5px;
    font-weight: 600;
  }
`
