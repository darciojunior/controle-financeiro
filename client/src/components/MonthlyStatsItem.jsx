import styled from 'styled-components'

const MonthlyStatsItem = ({ month, financesFromMonth }) => {

  const sumFinances = (type) => {
    let convertedNum = type.reduce((total, finance) => {
      let convertToNumber = parseFloat(finance.financeValue.replace(/\./g, "").replace(",", "."));
      return total + convertToNumber
    }, 0)
    return convertedNum
  }

  const moneyMask = (value) => {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    )
    return result
  }

  const incomeTypesOrder = {
    "Salário": 1,
    "13º salário": 2,
    "Férias": 3,
    "Investimentos": 4,
    "Outros": 5
  };

  const incomeList = financesFromMonth.filter(finance => finance.financeType === 'Receita').sort((a, b) => incomeTypesOrder[a.incomeType] - incomeTypesOrder[b.incomeType])
  const expensesList = financesFromMonth.filter(finance => finance.financeType === 'Despesa').sort((a, b) => a.expenseType.localeCompare(b.expenseType))
  const totalIncome = sumFinances(incomeList).toFixed(2)
  const totalExpense = sumFinances(expensesList).toFixed(2)
  const total = (totalIncome - totalExpense).toFixed(2)

  return (
    <Wrapper>
      <h5>{month}</h5>
      <div className="list income-list">
        {incomeList.map((income, index) => {
          return <div key={index} className='finance-row'>
            <span>{income.incomeType}</span>
            <span>{`R$ ${income.financeValue}`}</span>
          </div>
        })}
      </div>
      <div className="list expenses-list">
        {expensesList.map((expense, index) => {
          return <div key={index} className='finance-row'>
            <span>{expense.expenseType}</span>
            <span>{`- R$ ${expense.financeValue}`}</span>
          </div>
        })}
      </div>
      <div className={(total >= 0) ? 'positive-bcg total finance-row' : 'negative-bcg total finance-row'}>
        <span>Saldo</span>
        <span >{(total >= 0) ? `R$ ${moneyMask(total)}` : `- R$ ${moneyMask(total)}`}</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  border-radius: .25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  h5 {
    padding: .5rem;
    font-size:1rem;
    font-weight: bold;
    background-color: #505050;
    color: #FFF;
    text-align: center;
    border-radius: .25rem .25rem 0 0;
  }
  span {
    font-size: .8rem;
    line-height: 1rem;
  }
  .list {
    padding: 0 .3rem;
    height: 6rem;
    overflow-y: scroll;
  }
  .list::-webkit-scrollbar {
    width: .4rem;
  }
  .income-list::-webkit-scrollbar-thumb {
    border-radius: 100vw;
    background: #24ce6b;
  }
  .expenses-list::-webkit-scrollbar-thumb {
    border-radius: 100vw;
    background: #c03e3e;
  }
  .income-list {
    background-color: rgba(215, 255, 232, .8);
    color: green;
  }
  .expenses-list {
    background-color: rgba(255, 211, 211, .8);
    color: red;
  }
  .total {
    padding: .5rem .3rem;
    border-radius: 0 0 .25rem .25rem;
  }
  .total > span {
    font-size: 1rem;
    color: white;
  }
  .finance-row {
    display: flex;
    justify-content: space-between;
  }
  .positive-bcg {
    background-color: #24ce6b;
  }
  .negative-bcg {
    background-color: #c03e3e;
  }
`
export default MonthlyStatsItem