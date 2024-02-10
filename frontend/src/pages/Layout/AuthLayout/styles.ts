import styled from 'styled-components'
import media from 'styled-media-query'

export const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
    span {
      font-weight: bold;
      margin-top: 5px;
      display: inline-block;
    }

    img {
      width: 80px;
      height: 50px;
    }
  }
`

export const Header = styled.header`
  max-height: 60vh;
  width: 100%;
  background: linear-gradient(335.45deg, #86bd2c 50%, #00a13a 100%);
  box-shadow: 0 1px 9px 3px rgba(0, 0, 0, 0.2);
`

export const Section = styled.section`
  min-width: 100%;
  height: 100%;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  object-fit: cover;

  @media ((max-height: 852px ) and (max-width: 720px)) {
    margin-top: 120px;
  }

  img {
    margin-bottom: 0px;
    width: 150px;
    height: 230px;

    @media ((max-height: 836px )) {
      margin-top: 40px;
      opacity: 0;
    }

    @media ((max-width: 800px )) {
      opacity: 1;
    }

    ${media.lessThan('medium')`
        margin-bottom: 0;
        width: 250px;
        height: 180px;
      `}
  }
`
