import styled from 'styled-components'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useAppContext } from '../context/appContext'
import Logo from './Logo'

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { toggleSidebar, logoutUser, user } = useAppContext()

  return (
    <Wrapper>
      <div className="nav-center">
        <button className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>
        <div>
          <NavLink to='/' className={({ isActive }) => isActive ? "logo-navlink" : "logo-navlink"}>
            <Logo />
          </NavLink>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            Olá, {user?.name.split(' ')[0]}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"} >
            <button type='button' className='dropdown-btn' onClick={logoutUser}>Sair</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 150px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: #125812;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: #FFF;
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    color: #FFF;
    background: #125812;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: #a6f7a6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    text-align: center;
    visibility: hidden;
    border-radius: .25rem;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    width: 100%;
    height: 2.5rem;
    background: transparent;
    border-color: transparent;
    color: #0C380C;
    letter-spacing: 1px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    z-index: 9999;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`

export default Navbar