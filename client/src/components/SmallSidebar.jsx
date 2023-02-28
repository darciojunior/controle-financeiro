import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button type='button' className='close-btn' onClick={toggleSidebar}><FaTimes /></button>
          <header>
            <Logo />
          </header>
            <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .logo {
    width: 150px;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: 0.3s ease-in-out all;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    height: 70vh;
    border-radius: .25rem;
    padding: 4rem 2rem;
    background: #FFF;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: #842029;
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: #627d98;
    padding: 1rem 0;
    text-transform: capitalize;
    transition: 0.3s ease-in-out all;
  }
  .nav-link:hover {
    color: #000;
  }
  .nav-link:hover .icon {
    color: #125812;
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: 0.3s ease-in-out all;
  }
  .active {
    color: #000;
  }
  .active .icon {
    color: #125812;
  }
`

export default SmallSidebar