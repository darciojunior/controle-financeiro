import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import { NavLink } from "react-router-dom";
import NavLinks from './NavLinks'

const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <NavLink to='/' className={({ isActive }) => isActive ? "logo-navlink" : "logo-navlink"}>
              <Logo />
            </NavLink>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: #FFF;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-links:hover > .nav-link {
      background-color: #e2e6eb;
    }
    .nav-links:hover > .nav-link:not(:hover) {
      background-color: #FFF;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #627d98;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      padding-left: 3rem;
      color: #000;
    }
    .nav-link:hover .icon {
      color: #125812;
    }
    .logo-navlink {
      width: 100%;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: 0.3s ease-in-out all;
    }
    .active {
      color: #102a43;
      background: #e2e6eb;
    }
    .active .icon {
      color: #125812;
    }
  }
`

export default BigSidebar