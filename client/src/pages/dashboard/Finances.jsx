import { FormRow, FormRowSelect, Alert, FinancesContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import styled from 'styled-components'
import { useState } from 'react'

const Finances = () => {
  const { isEditing,
    isLoading,
    showAlert,
    displayAlert,
    financeType,
    incomeTypeOptions,
    incomeType,
    expenseTypeOptions,
    expenseType,
    description,
    financeValue,
    financeDate,
    handleChange,
    clearValues,
    createFinance,
    editFinance } = useAppContext()

  //Usado apenas para dar Refresh no FinancesContainer quando alguma finança nova for adicionada
  const [seed, setSeed] = useState(1)
  const reset = () => {
    setSeed(Math.random())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!financeValue) {
      displayAlert()
      return
    }
    if (isEditing) {
      editFinance()
      reset()
      return
    }
    createFinance()
    reset()
  }

  const handleInput = (e) => {
    const name = e.target.name
    let value = ''
    if (name === 'financeValue') value = moneyMask(e.target.value)
    else value = e.target.value

    handleChange({ name, value })
  }

  const moneyMask = (value) => {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    )
    return result
  }

  const toggleFinance = (value) => {
    const name = 'financeType'
    clearValues()
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <div className="change-finance-container">
        <div className="income" onClick={(e) => {
          e.preventDefault()
          toggleFinance('Receita')
        }}>Receita</div>
        <div className="expense" onClick={(e) => {
          e.preventDefault()
          toggleFinance('Despesa')
        }}>Despesa</div>
      </div>
      <form className="form">
        <h3>{isEditing ? 'Editar finança' : `Adicionar ${(financeType === 'Receita') ? 'receita' : 'despesa'}`}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRowSelect
            name={(financeType === 'Receita') ? 'incomeType' : 'expenseType'}
            labelText="Categoria"
            value={(financeType === 'Receita') ? incomeType : expenseType}
            handleChange={handleInput}
            list={(financeType === 'Receita') ? incomeTypeOptions : expenseTypeOptions} />
          <FormRow type='text' name='description' labelText='Descrição (opcional)' value={description} handleChange={handleInput} />
          <FormRow type='text' name='financeValue' labelText='Valor' value={financeValue} handleChange={handleInput} />
          <FormRow type='date' name='financeDate' labelText='Data' value={financeDate} handleChange={handleInput} />

          <div className="btn-container">
            <button type='submit' className='btn' onClick={handleSubmit} disabled={isLoading}>Salvar</button>
            <button className="btn clear-btn" disabled={isLoading}
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
      <FinancesContainer key={seed} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  border-radius: .25rem;
  width: 100%;
  background: #FFF;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  .change-finance-container {
    display: flex;
    gap: 1rem;
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%)
  }
  .income {
    background-color: #0f5132;
    color: #FFF;
    padding: 1rem;
    border-radius: .25rem;
    cursor: pointer;
    transition: 0.2s ease-in-out all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .income:hover {
    background-color: #1aa162;
  }
  .expense {
    background-color: #842029;
    color: #FFF;
    padding: 1rem;
    border-radius: .25rem;
    cursor: pointer;
    transition: 0.2s ease-in-out all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .expense:hover {
    background-color: #c72c39;
  }
  h3 {
    text-align: center;
    margin-top: 0;
  }
  .form {
    margin: 0 0 2rem 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-row:first-child > input{
    background-color: lightgrey;
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
  @media (min-width: 700px) {
    .change-finance-container {
      left: 2rem;
      transform: translateX(0)
    }
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

export default Finances