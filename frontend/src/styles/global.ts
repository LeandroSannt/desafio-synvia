import { createGlobalStyle } from 'styled-components'

import media from 'styled-media-query'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 100%; //16px
    }

    @media (max-width: 720px) {
      font-size: 75%; //12px
    }
  }

  body {
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }

  body,
  input,
  textarea,
  button {
    font-weight: 300;

    
  }

  *::placeholder{
        font-size: 12px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h5,
  strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
    border: 0px;
    background: none;
    outline: none;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  *::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;


    ${media.lessThan('small')`
    width: 0.3rem;
    height: 0.3rem;
      `}
  }

`
