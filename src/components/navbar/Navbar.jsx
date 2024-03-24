// Import necessary dependencies and components
import React, { Fragment, useContext, useState } from 'react'
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
// Define a functional component called Navbar
function Navbar() {
  // Accessing data from a React context using the useContext hook
  const context = useContext(myContext);
         
    
// State for handling mobile menu open/close
  const [open, setOpen] = useState(false)
// Get user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  
 // Logout function to clear user data and redirect to login page
  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }
 // Get cart items from Redux store using useSelector hook
  const cartItems = useSelector((state) => state.cart)
// Render the Navbar component
  return (
    <div className='bg-white sticky top-0 z-50'>
      {/* Mobile menu using headless UI Dialog and Transition */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
           {/* Overlay when the mobile menu is open */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
{/* Mobile menu content */}
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" >
                 {/* Close button for the mobile menu */}
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                {/* Links in the mobile menu */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Link to All Products */}
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " >
                    All Products
                  </Link>
{/* **** */}{/* Conditional rendering of links based on user */}
                  {user ? <div className="flow-root">
                    <Link to={'/order'} className="-m-2 block p-2 font-medium text-gray-900">
                      Orders
                    </Link>
                  </div> : ""}

 {/* ChandraTextile.online@gmail.com    knupadhyay784@gmail.com                  */}
{/* Conditional rendering of admin link */}
                  {user?.user?.email === "knupadhyay784@gmail.com" ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" >
                      admin
                    </Link>
                  </div> : ""}
         {/* Conditional rendering of logout or signup link */}
                {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" >
                      Logout
                    </a>
                  </div> : <div className="flow-root">
                    <Link to={'/signup'}  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      Signup
                    </Link>
                  </div>}
                 
                </div>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
{/* Header section */}
      <header className="relative bg-white">
        
 {/* Navigation bar */}
        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " >
          <div className="">
            <div className="flex h-16 items-center">
              {/* Button to open mobile menu */}
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} 
              >
  {/* ********               */}
                <span className="sr-only">Open menu</span>
                {/* Hamburger icon for mobile menu */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' >Chandra Textile</h1>
                  </div>
                </Link>
              </div>

{/* Links for larger screens */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
{/* Link to All Products */}
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " >
                    All Products
                  </Link>
                    {/* Conditional rendering of Order or Signup link */}
                 {user ? 
                  <Link to={'/order'} className="text-sm font-medium text-gray-700 " >
                    Order
                  </Link> :   <Link to={'/signup'}  className="text-sm font-medium text-gray-700 " >
                      Signup
                    </Link>}
{/* ChandraTextile.online@gmail.com    knupadhyay784@gmail.com                    */}
{/* Conditional rendering of Admin link */}
                  {user?.user?.email === 'chandratextile.online@gmail.com' ? 
                   <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " >
                    Admin
                  </Link> : ""}
                  
                
                 {user ?  <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " >
                    Logout
                  </a> : ""}
                </div>

               
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-">{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar