import { Link } from "react-router-dom"
import img from '../assets/images/not-found.svg'
import styled from "styled-components"


const ErrorPage = () => {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="Not Found" />
        <h3>Ops.. Página não encontrada..</h3>
        <p>Não foi possível encontrar a página a qual você estava procurando.</p>
        <Link to='/'>Voltar</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  img {
    max-width: 700px;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  a {
    color: #008000;
    font-size: 1.2rem;
    text-decoration: underline;
    text-transform: capitalize;
  }
`

export default ErrorPage