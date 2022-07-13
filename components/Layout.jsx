import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import Footer from './Footer'
function Layout({children}) {
  return (
    <div className='layout'>
      <Head>
        <title>TecStore</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout