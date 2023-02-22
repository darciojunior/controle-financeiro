import { useState, useEffect } from "react"
import styled from "styled-components"
import { Logo, FormRow, Alert } from "../components"
import { useAppContext } from "../context/appContext"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const [values, setValues] = useState(initialState)

  const { isLoading, showAlert, displayAlert } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    console.log(values);
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Cadastrar'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (<FormRow type='text' name='name' labelText='Nome' value={values.name} handleChange={handleChange} />)}
        <FormRow type='email' name='email' labelText='E-mail' value={values.email} handleChange={handleChange} />
        <FormRow type='password' name='password' labelText='Senha' value={values.password} handleChange={handleChange} />
        <button type="submit" className="btn">Enviar</button>
        <p>
          {values.isMember ? 'Não é membro? ' : 'Já tem cadastro? '}
          <button type="button" onClick={toggleMember} className='member-btn'>{values.isMember ? 'Cadastrar' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}


const Wrapper = styled.section`
  display: grid;
  align-items: center;
  min-height: 100vh;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid #2cbc50;
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    width: 100%;
    height: 35px;
    background-color: #0C380C;
    color: #FFF;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: #187a18;
    cursor: pointer;
    font-weight: 700;
    font-size: .9rem;
  }
`
export default Register