import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import styled from 'styled-components'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
    const { isLoading, searchFinanceType, searchIncomeType, searchExpenseType, handleChange, clearFilters, incomeTypeOptions, expenseTypeOptions } = useAppContext()
    const [localSearchFinanceDate, setLocalSearchFinanceDate] = useState('')

    const handleSearch = (e) => {
        handleChange({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLocalSearchFinanceDate('')
        clearFilters()
    }

    const debounce = () => {
        let timeoutID
        return (e) => {
            setLocalSearchFinanceDate(e.target.value)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value })
            }, 500)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const optimizedDebouce = useMemo(() => debounce(), [])

    const renderForm = () => {
        if (searchFinanceType === 'Receita') return <FormRowSelect labelText='Categorias/Receita' name='searchIncomeType' value={searchIncomeType} handleChange={handleSearch} list={['Mostrar todos', ...incomeTypeOptions]} />
        else if (searchFinanceType === 'Despesa') return <FormRowSelect labelText='Categorias/Despesa' name='searchExpenseType' value={searchExpenseType} handleChange={handleSearch} list={['Mostrar todos', ...expenseTypeOptions]} />
        else return <>
            <FormRowSelect labelText='Categorias/Receita' name='searchIncomeType' value={searchIncomeType} handleChange={handleSearch} disabled={(searchExpenseType !== 'Mostrar todos')} list={['Mostrar todos', ...incomeTypeOptions]} />
            <FormRowSelect labelText='Categorias/Despesa' name='searchExpenseType' value={searchExpenseType} handleChange={handleSearch} disabled={(searchIncomeType !== 'Mostrar todos')} list={['Mostrar todos', ...expenseTypeOptions]} />
        </>
    }

    return (
        <Wrapper>
            <form className='form'>
                <div className="form-center">
                    <FormRowSelect labelText='Finança' name='searchFinanceType' value={searchFinanceType} handleChange={handleSearch} list={['Mostrar todos', 'Receita', 'Despesa']} />
                    {renderForm()}
                    <FormRow type='date' labelText='Data' name='searchFinanceDate' value={localSearchFinanceDate} handleChange={optimizedDebouce} />
                    <button className="btn clear-btn" disabled={isLoading} onClick={handleSubmit}>Limpar</button>
                </div>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.form {
}
.form-center {
    row-gap: 1rem;
}

@media (min-width: 992px) {
    .clear-btn {
    width: 50%;
    }
}
`
export default SearchContainer