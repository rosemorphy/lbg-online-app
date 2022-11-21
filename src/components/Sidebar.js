import { useContext } from 'react'
import NavLink from './Link'
import { RiDashboardFill, RiCoinsFill } from 'react-icons/ri'
import { MdSupportAgent } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { AuthContext } from '../context/Authcontext'
import Logo from './Logo'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <div className="logoContainer">
        <Logo />
      </div>
      <nav>
        <NavLink href="/account">
          <a className="nav-link">
            <RiDashboardFill className="icon" />
            <p>My Account</p>
          </a>
        </NavLink>
        <NavLink href="/account/profile">
          <a className="nav-link">
            <FaRegUserCircle className="icon" />
            <p>Profile</p>
          </a>
        </NavLink>
        {/* <NavLink href="/account/transactions">
          <a className="nav-link">
            <RiCoinsFill className="icon" />
            <p>Transactions</p>
          </a>
        </NavLink> */}
        <NavLink href="/account/support">
          <a className="nav-link">
            <MdSupportAgent className="icon" />
            <p>Support</p>
          </a>
        </NavLink>
        <NavLink href="#">
          <a className="nav-link logout" onClick={() => logout()}>
            <BiLogOutCircle className="icon" />
            <p>Logout</p>
          </a>
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
