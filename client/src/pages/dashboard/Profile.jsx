import { useState } from "react"
import styled from 'styled-components'
import { FormRow, Alert } from '../../components'
import { useAppContext } from "../../context/appContext"

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email) {
      displayAlert()
      return
    }
    updateUser({name, email})
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Perfil</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow type='text' name='name' labelText='Nome' value={name} handleChange={(e) => setName(e.target.value)} />
          <FormRow type='email' name='email' labelText='E-mail' value={email} handleChange={(e) => setEmail(e.target.value)} />
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Aguarde, por favor...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: .25rem;
  width: 100%;
  background: #FFF;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  h3 {
    margin-top: 0;
    text-align: center;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
    margin-top: 1rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: #627d98;
  }
  .clear-btn:hover {
    background: #000;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Profile