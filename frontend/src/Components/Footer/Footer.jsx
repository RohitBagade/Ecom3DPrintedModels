import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import facebook from '../Assets/facebook.png'
import twitter from '../Assets/twitter.png'
import instagram from '../Assets/instagram.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="Footer Logo" />
        </div>
        <div className='footer-links'>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
        </div>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={facebook} alt="Facebook" />
            </div>
            <div className="footer-icons-container">
                <img src={twitter} alt="Twitter" />
            </div>
            <div className="footer-icons-container">
                <img src={instagram} alt="Instagram" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2023 - ALL Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer