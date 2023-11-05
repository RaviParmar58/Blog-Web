import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'

function Root() {
  return (
    <div className='container'>
      <Header/>
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default Root