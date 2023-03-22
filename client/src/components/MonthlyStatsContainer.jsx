import styled from "styled-components"
import { MonthlyStatsItem } from '.'

const MonthlyStatsContainer = ({ financesFromYear }) => {

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return (
    <Wrapper>
      {months.map((month, index) => {
        let monthNumber = (`${index + 1}`.length === 2) ? `${index + 1}` : `0${index + 1}`
        const financesFromMonth = financesFromYear.filter(finance => finance.financeDate.slice(5, 7) === monthNumber)
        return <MonthlyStatsItem key={index} {...{ month, financesFromMonth }} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 1.5rem;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
  @media (min-width: 1320px) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 2rem;
  }
`
export default MonthlyStatsContainer