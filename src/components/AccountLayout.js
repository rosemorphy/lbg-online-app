import { useContext } from 'react'
import Sidebar from './Sidebar'
import { AuthContext } from '../context/Authcontext'
import TradingWiget from './TradingWiget'
import { IMG_URL } from '../config/index'

const Layout = ({ children, data }) => {
  const { logout } = useContext(AuthContext)

  console.log(`${IMG_URL}${data.passport}`)

  return (
    <div className="layoutContainer">
      
      {/* <TradingWiget /> */}
      <main className='adminMain'>
        <Sidebar />  
        <article className="mainContainer">
          {children}
        </article>
      </main>
    </div>
  )
}

export default Layout
