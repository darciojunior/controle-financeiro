import styled from 'styled-components'

const moneyMask = (value) => {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    )
    return result
}

const AnualStatsItem = ({ title, total, color, background, color2, background2 }) => {
    return (
        <Wrapper color={(total >= 0) ? color : color2} background={(total >= 0) ? background : background2}>
            <h5>{title}</h5>
            <header>
                <span className='total'>{(title === 'Despesa Anual' || total <= 0) ? `- R$ ${moneyMask(total)}` : `R$ ${moneyMask(total)}`}</span>
            </header>
        </Wrapper>
    )
}

const Wrapper = styled.article`
  padding: 1rem;
  background: ${(props) => props.background};
  border-radius: .25rem;
  border-bottom: 5px solid ${(props) => props.color};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  .total {
    display: block;
    font-weight: 700;
    font-size: 20px;
    color: ${(props) => props.color};
  }
  span {
    white-space: nowrap;
  }
`
export default AnualStatsItem