import Image from 'next/image'
import React from 'react'
import logo from '../public/img/logo.jpeg'

const Logo = () => {
  return (
    <div className="logo">
      <Image src={logo} alt="Logo" width="60" height="60" />
       <h4>LBG-Online</h4>
    </div>
  )
}

export default Logo
