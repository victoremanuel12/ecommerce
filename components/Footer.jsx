import React from 'react'
import { AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
function Footer() {
  return (
    <section className='footer-container'>
        <p>2022 TecSotre</p>
        <div className='icons'>
          <a href='https://www.instagram.com/victoremannuel11/' target='_blanck'><AiFillInstagram size={40}/></a>
         <a href='https://www.linkedin.com/in/victor-emanuel-004636228/' target='_blanck'> <AiFillLinkedin size={40} /></a>
        </div>
    </section>
  )
}

export default Footer