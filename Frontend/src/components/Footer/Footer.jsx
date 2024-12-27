import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=""  className='logo-img'/>
            <p>Your go-to platform for ordering the tastiest snacks, delivered right to your doorstep. 
     We bring you a wide variety of snacks, made with love and the finest ingredients to satisfy your cravings, anytime, anywhere.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Team</li>
                <li>Snackster One</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
                <h2>CONTACT US</h2>
                <ul>
                    <pre>+91  8279-3152-67</pre>
                    <li>contact@snackster.in</li>
                </ul>
        </div>
        
      </div>
      <hr />
      <p className='footer-copyright'>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2023-2024 © Snackster Ltd. All rights reserved.</p>
    </div>
  )
}

export default Footer
