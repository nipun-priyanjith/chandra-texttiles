// Import necessary dependencies and assets
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext'; // Importing custom context
import aac from '../../assets/aac.jpg'; // Importing an image asset

// Define a functional component called Footer
function Footer() {
  // Accessing data from a React context using the useContext hook
  const context = useContext(myContext);
  
  // Rendering the Footer component
  return (
    <div>
      {/* Footer section with background color and container */}
      <footer className="text-gray-600 body-font bg-gray-300">
        <div className="container px-5 py-24 mx-auto">
          {/* Division for organizing different sections in the footer */}
          <div className="flex flex-wrap md:text-left text-center order-first">
            {/* Section for Categories */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
              {/* List of category links */}
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Home</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Order</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Cart</a>
                </li>
              </nav>
            </div>
            
            {/* Section for Customer Service */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">Customer Service</h2>
              {/* List of customer service links */}
              <nav className="list-none mb-10">
                <li>
                  <Link to={'/returnpolicy'} className="text-gray-600 hover:text-gray-800">Return Policy</Link>
                </li>
                <li>
                  <Link to={'/about'} className="text-gray-600 hover:text-gray-800">About</Link>
                </li>
                <li>
                  <Link to={'/contact'} className="text-gray-600 hover:text-gray-800">Contact Us</Link>
                </li>
              </nav>
            </div>
            
            {/* Section for Services */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Services</h2>
              {/* List of service links */}
              <nav className="list-none mb-10">
                <li>
                  <Link to={'/privacypolicy'} className="text-gray-600 hover:text-gray-800">Privacy</Link>
                </li>
              </nav>
            </div>
            
            {/* Section for displaying an image */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <img src={aac} alt="AAC Image" /> {/* Rendering the imported image */}
            </div>
          </div>
        </div>
        
        {/* Secondary section of the footer */}
        <div className="bg-gray-200">
          <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
            {/* Link to home page */}
            <Link to={'/'} className='flex'>
              <div className="flex">
                <h1 className='text-2xl font-bold text-black px-2 py-1 rounded'>Chandra Textile</h1>
              </div>
            </Link>
            
            {/* Social media icons */}
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              {/* Icons for different social media platforms */}
              {/* Example: Facebook, Twitter, Instagram, etc. */}
              <a className="text-gray-500">
                {/* SVG icon */}
              </a>
              <a className="ml-3 text-gray-500">
                {/* SVG icon */}
              </a>
              <a className="ml-3 text-gray-500">
                {/* SVG icon */}
              </a>
              <a className="ml-3 text-gray-500">
                {/* SVG icon */}
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer; // Exporting the Footer component
