import React from 'react'
import Navbar from '../navbar/Navbar'// Importing the Navbar component
import Footer from '../footer/Footer'// Importing the Footer component

// Layout Component
function Layout({children}) {
  return (
    <div>
        <Navbar/>{/* Rendering the Navbar component */}
        <div className="content">
            {children} {/* Rendering the content passed as children */}
        </div>
        <Footer/> {/* Rendering the Footer component */}
    </div>
  )
}

export default Layout




