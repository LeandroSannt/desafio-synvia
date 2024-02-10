import styled from 'styled-components'

export const Container = styled.div``
export const Form = styled.form`
  max-width: 500px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn {
    width: 100px;
    font-size: 10px;
    background: red;
  }
`

export const Select = styled.select`
  width: 100%;
  height: 35px;
  border: solid #dedede 1px;
  height: 35px;
  padding: 5px;
  border-radius: 5px;
  outline: none;
`

export const ContainerSelect = styled.div`
  h3 {
    margin-bottom: 5px;
    color: ${'gray'};

    margin-top: 10px;
    font-weight: 600;
  }
`

export const FormTag = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  button {
    height: 37px;
    width: 40px;
    margin-left: 10px;
  }
`
