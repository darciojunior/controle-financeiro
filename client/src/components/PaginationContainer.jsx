import styled from 'styled-components'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from "../context/appContext"
import { useState, useEffect } from 'react'

const PaginationContainer = () => {
  const { numOfPages, page, setPage } = useAppContext()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const pages = Array.from({ length: numOfPages }, (_, index) => { return index + 1 })

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) newPage = numOfPages
    setPage(newPage)
  }
  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) newPage = 1
    setPage(newPage)
  }
  const goToTableStart = () => {
    if (windowWidth >= 1120) window.scrollTo({
      top: 280,
      behavior: "smooth",
    });
    else if (windowWidth >= 992) window.scrollTo({
      top: 340,
      behavior: "smooth",
    });
    else window.scrollTo({
      top: 580,
      behavior: "smooth",
    });

  }

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        {windowWidth > 640 ? <><HiChevronDoubleLeft />Anterior</> : <HiChevronDoubleLeft />}

      </button>
      <div className='pages-container'>
        {pages.map((pageNumber) => {
          return <button
            type='button'
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            key={pageNumber}
            onClick={() => {
              goToTableStart()
              setPage(pageNumber)
            }}
          >
            {pageNumber}
          </button>
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        {windowWidth > 640 ? <>Próxima<HiChevronDoubleRight /></> : <HiChevronDoubleRight />}

      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: .5rem;
  .pages-container {
    display: flex;
    gap: .2rem;
    border-radius: .25rem;
    flex-wrap: wrap;
  }
  .pageBtn {
    background: #9de79d;
    border: 1px solid #125812;
    width: 2.5rem;
    height: 2rem;
    font-weight: 700;
    font-size: 1rem;
    color: #125812;
    transition: 0.15s ease-in-out all;
    border-radius: .25rem;
    cursor: pointer;
  }
  .pages-container:hover > .pageBtn {
    background: #125812;
    color: #FFF;
  }
  .pages-container:hover > .pageBtn:not(:hover) {
    background: #9de79d;
    color: #125812;
  }
  .active {
    background: #125812;
    color: #FFF;
  }
  .prev-btn,
  .next-btn {
    width: 6.25rem;
    height: 2rem;
    border-color: transparent;
    border-radius: .25rem;
    background: #125812;
    color: #FFF;
    text-transform: capitalize;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: 0.3s ease-in-out all;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: #0b350b;
    border-color: #0b350b;
    color: #FFF;
  }
  @media (max-width: 640px) {
  .prev-btn,
  .next-btn {
    width: 3rem;
  }
  }
`
export default PaginationContainer


