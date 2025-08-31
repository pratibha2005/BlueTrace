import React from 'react'
import Lottie from 'lottie-react' 
import Home from './components/Home'
import Navbar from './components/Navbar'

import Homesvg from './assets/animations/Homesvg.json'
const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
       <Lottie animationData={Homesvg} loop={true} style={{ width: "600px", height: "600px" , marginTop: "-65vh" }} />

    </>
  )
}

export default App
