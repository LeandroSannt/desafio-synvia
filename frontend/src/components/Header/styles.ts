import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 80px;
  padding: 10px 0;
  background-color: gray;

  > div {
    max-width: 1200px;
    height: 100%;
    padding: 0 20px;

    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .user {
      background-color: white;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 5px 15px -3px #f3f4f6;

      display: flex;
      flex-direction: column;
      align-items: start;

      button {
        color: red;
        cursor: pointer;
        margin-top: 10px;
      }
    }

    ul {
      display: flex;
      gap: 20px;
      align-items: center;
      li {
        list-style: none;
        a {
          text-decoration: none;
          color: black;
          transition: all 200ms;
          &:hover {
            color: blue;
          }
        }
      }
    }
  }
`
