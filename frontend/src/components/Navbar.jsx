import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className=" sticky top-0 z-50 bg-gray-600 text-white px-6 py-4 flex justify-end items-center shadow-md border-b-4 border-gray-600">
        <ul className="hidden md:flex gap-8 text-lg mr-8">
          
          {/* Left to Right underline */}
          <li className="relative cursor-pointer 
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
            after:bg-white after:transition-all after:duration-300 
            hover:after:w-full">
            Home
          </li>

          {/* Center expand underline */}
          <li className="relative cursor-pointer 
            after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] 
            after:bg-white after:transition-all after:duration-300 after:-translate-x-1/2
            hover:after:w-full">
            About
          </li>

          {/* Right to Left underline */}
          <li className="relative cursor-pointer 
            after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] 
            after:bg-white after:transition-all after:duration-300 
            hover:after:w-full hover:after:left-0">
            Services
          </li>

          {/* Underline + text color change */}
          <li className="relative cursor-pointer transition-colors duration-300 hover:text-yellow-300
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
            after:bg-yellow-300 after:transition-all after:duration-300 
            hover:after:w-full">
            Contact
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300">
          Login
        </button>
      </nav>
    </>
  )
}

export default Navbar
