import styled from 'styled-components'
import { AnualStatsItem } from '.'

const AnualStatsContainer = ({financesFromYear}) => {
    
    const sumFinances = (type) => {
        let convertedNum = financesFromYear.filter(finance => finance.financeType === type).reduce((total, finance) => {
            let convertToNumber = parseFloat(finance.financeValue.replace(/\./g, "").replace(",", "."));
            return total + convertToNumber
        }, 0)
        return convertedNum
    }
    const totalIncome = sumFinances('Receita').toFixed(2)
    const totalExpense = sumFinances('Despesa').toFixed(2)

    const defaultStats = [
        {
            title: 'Receita Anual',
            total: totalIncome || 0,
            color: '#24ce6b',
            background: '#d7ffe8'
        },
        {
            title: 'Despesa Anual',
            total: totalExpense || 0,
            color: '#c03e3e',
            background: '#ffd3d3',
        },
        {
            title: 'Saldo Anual',
            total: (totalIncome - totalExpense).toFixed(2) || 0,
            color: '#24ce6b',
            background: '#d7ffe8',
            color2: '#c03e3e',
            background2: '#ffd3d3',
        },
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <AnualStatsItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 1.5rem;
  margin-bottom: 2.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
  }
`
export default AnualStatsContainer