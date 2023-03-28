import { useAppContext } from '../../context/appContext'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { AnualStatsContainer, MonthlyStatsContainer } from '../../components'
import { NavLink } from 'react-router-dom'

const Stats = () => {
  const { finances, getFinances } = useAppContext()

  useEffect(() => {
    getFinances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const year = (new Date()).getFullYear();
  const earliestYear = 2018;
  const years = [];

  for (let i = year; i >= earliestYear; i--) {
    years.push(i)
  }

  const [selectedYear, setselectedYear] = useState(year.toString())
  const financesFromYear = finances.filter(finance => finance.financeDate.slice(0, 4) === selectedYear)

  const handleSelect = (e) => {
    setselectedYear(e.target.value);
  }

  return (
    <Wrapper>
      <div className='container'>
        <select onChange={handleSelect}>
          {
            years.map((year, index) => {
              return <option key={`year${index}`} value={year}>{year}</option>
            })
          }
        </select>
        <NavLink to='/finances' className='sm-add-finance-link'>Adicionar finanças</NavLink>
      </div>
      <AnualStatsContainer financesFromYear={financesFromYear} />
      <MonthlyStatsContainer financesFromYear={financesFromYear} />
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
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    row-gap: .5rem;
    margin-bottom: 1.5rem;
  }
  select {
    padding: .3rem;
    border-radius: .25rem;
  }
  .sm-add-finance-link {
    background: #125812;
    color: #FFF;
    border-radius: .25rem;
    font-size: .8rem;
    padding: .5rem;
  }
  @media (min-width: 992px) {
    .sm-add-finance-link {
      display: none;
    }
  }
`
export default Stats