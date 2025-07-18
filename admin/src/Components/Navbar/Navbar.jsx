import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.png'
import navProfile from '../../assets/nav-profile.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="Logo" className='nav-logo'/>
      <img src={navProfile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar