import React,{useState,useEffect} from 'react'
import {BsBagCheckFill} from 'react-icons/bs'
import {useRouter} from 'next/router'
import { useStateContext } from '../context/StateContext'
import Link from 'next/link'
import {runFireworks} from '../lib/utils'

function sucess() {
    const {setCartItems, setTotalPrice,setTotalQuantities} =  useStateContext()
    const [order,setOrder] = useState(null)
    useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }, []);
  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Thanks for viewing my app!</h2>
            <p className="email-msg">Check your email inbox for receipts on purchases</p>
            <p className='description'>
              If you have any question, please email
              <a href="mailto:victoremannuel1156@gmail.com" className="email">victoremannuel1156@gmail.com</a>
            </p>
            <Link href='/'>
              <button type='button' width='300px' className='btn'>Continue Shoppping</button>
            </Link>
        </div>
    </div>
  )
}

export default sucess