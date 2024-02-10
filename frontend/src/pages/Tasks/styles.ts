import styled from 'styled-components'

export const Container = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .maxButton {
    max-width: 200px;
  }
`

export const Filters = styled.div`
  .row {
    display: flex;
    align-items: end;
    justify-content: flex-end;
    gap: 10px;
    margin: 20px 0;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
`

export const ContainerTasks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;

  @media screen and (max-width: 804px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`

export const Task = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* max-width: 400px; */
  min-height: 200px;
  height: 100%;
  max-height: 35rem;
  background-color: white;
  box-shadow: 0 1px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 20px;

  @media screen and (min-width: 804px) {
    /* max-width: 372px; */
  }

  @media screen and (max-width: 375px) {
    width: 95%;
  }

  @media screen and (max-width: 360px) {
    width: 90%;
  }
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Tags = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`

export const Tag = styled.div`
  position: relative; /* Permitir o posicionamento relativo para o pseudo-elemento */

  background-color: #e6e8eb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: gray;

  width: 50px;
  height: 30px;

  &::after {
    content: 'x';
    width: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10px;
    border-radius: 30px;
    background-color: red;
    position: absolute;
    top: -8px;
    right: -5px;
    color: white;
    font-size: 8px;
    cursor: pointer;
  }
`

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  p {
  }

  .btn {
    width: 100px;
    font-size: 12px;
  }
`
