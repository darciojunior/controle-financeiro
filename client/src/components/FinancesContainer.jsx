import styled from 'styled-components'
import { useEffect } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'

const FinancesContainer = () => {
    const { getFinances, finances, totalFinances, page, setEditFinance, DeleteFinance } = useAppContext()
    useEffect(() => {
        getFinances()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (finances.length === 0) return <div><h2>Não há finanças para exibir...</h2></div>

    //sort finances by date
    finances.sort(function (a, b) {
        var keyA = new Date(a.financeDate),
            keyB = new Date(b.financeDate);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    return (
        <Wrapper className='table-container'>
            <h5>{totalFinances} finança{finances.length > 1 && 's'} encontrada{finances.length > 1 && 's'}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.map((finance) => {
                        return (
                            <tr key={finance._id}>
                                <td data-title='Categoria' className={(finance.financeType === 'Receita' ? 'bg-green' : 'bg-red')}>{finance.financeType} - {finance.incomeType}{finance.expenseType}</td>
                                <td data-title='Valor' className={(finance.financeType === 'Despesa' ? 'color-red' : '')}>{(finance.financeType === 'Despesa' ? `- R$ ${finance.financeValue}` : `R$ ${finance.financeValue}`)}</td>
                                <td data-title='Data'>{`${finance.financeDate.slice(8, 10)}/${finance.financeDate.slice(5, 7)}/${finance.financeDate.slice(0, 4)}`}</td>
                                <td data-title='Descrição'>{finance.description}</td>
                                <td data-title='Ações'>
                                    <div className="action-column">
                                        <button className='btn btn-edit' onClick={() => setEditFinance(finance._id)}><FaPencilAlt /></button>
                                        <button className='btn btn-delete' onClick={() => DeleteFinance(finance._id)}><FaTrashAlt /></button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Wrapper>
    )
}

const Wrapper = styled.div`
table{
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: default;
}
thead {
    background-color: #0f5132;
}
tr:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
}
th {
    font-size: .9rem;
    padding: .7rem;
    letter-spacing: .5px;
    color: #FFF;
    opacity: 1;
    vertical-align: top;
}
td {
    font-size: .8rem;
    padding: .3rem;
    letter-spacing: .5px;
    text-align: center;
    color: #000;
    opacity: 1;
    border: 1px solid lightgray;
    white-space: nowrap;
}
td:nth-child(4) {
    text-align: start;
    white-space: normal;
}
.bg-green {
    background-color: rgba(26, 161, 98, .8);
}
.bg-red {
    background-color: rgba(199, 44, 57, .8);
}
.color-red {
    color: #c72c39;
}
.action-column {
    display: flex;
    justify-content: center;
    column-gap: .3rem;
}
.btn-edit {
    color: #000;
    background-color: #ffc107;
}
.btn-delete {
    color: #000;
    background-color: #dc3545;
}
@media (max-width: 992px) {
    thead {
        display: none;
    }
    table, tbody, tr, td {
        display: block;
        width: 100%;
    }
    tr {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin-bottom: 1rem;
    }
    td {
        padding: .5rem;
        text-align: start;
        border: none;
    }
    td:before {
        content: attr(data-title) ': ';
    }
    td:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.05);
    }
    td:last-child {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
`

export default FinancesContainer