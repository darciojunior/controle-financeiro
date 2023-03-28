import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import main from '../assets/images/main.svg'
import { Logo } from '../components'
import { useAppContext } from '../context/appContext'

const Landing = () => {
  const { user } = useAppContext()
  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>Sistema de controle financeiro</h1>
            <p>
              Projeto de um sistema de controle financeiro feito apenas para praticar a stack MERN, o objetivo é ter um sistema completo,
              com criação de usuários, adicionar e remover receitas e gastos e também acessar um resumo dos gastos mensais.
            </p>
            <Link to='/register' className='btn btn-login'>Login/Register</Link>
          </div>
          <img src={main} alt="" className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

const Wrapper = styled.main`
  nav {
    display: flex;
    align-items: center;
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
    height: 6rem;
  }
  .container {
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
  }
  .page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1.3rem;
  }
  p {
    margin-bottom: 1.5rem;
  }
  .btn-login {
    background-color: #0C380C;
    color: #FFF;
  }
  .btn-login:hover {
    background-color: #125812;
    color: #FFF;
  }
  .img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`
export default Landing