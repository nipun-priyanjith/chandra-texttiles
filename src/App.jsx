import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// <Router> is used to define the router context.
// <Routes> is the container for all the individual <Route> components.
// <Route> components define the mapping between the URL paths and corresponding components to render.
// <Navigate> is used for declarative navigation within components.

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';
function App() {
  return (
    <MyState>
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Home page route */}
          <Route path="/allproducts" element={<Allproducts />} />{/* All products route */}
          {/* Protected route for the order page accessible by logged-in users */}
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />  {/* Cart page route */}
          {/* Protected route for the dashboard accessible only by admin */}
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} /> {/* Login page route */}
          <Route path='/signup' element={<Signup/>} /> {/* Signup page route */}
          <Route path='/productinfo/:id' element={<ProtectedRoute><ProductInfo/></ProtectedRoute>} />  {/* Product info page route */}
           {/* Protected route for adding a product, accessible only by admin */}
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          {/* Protected route for updating a product, accessible only by admin */}
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />  {/* Route for unknown paths */}
        </Routes>
        <ToastContainer/> {/* Toast notifications container */}
      </Router>
    </MyState>

  )
}

export default App 
// Component for protected routes accessible by logged-in users
// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children  // Render the requested component if the user is logged in
  }else{
    return <Navigate to={'/login'}/> // Redirect to the login page if the user is not logged in
  }
}

// admin 
// Component for protected routes accessible only by admin
const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  // Check if the logged-in user is an admin based on email
  // ChandraTextile.online@gmail.com    knupadhyay784@gmail.com
  if(admin.user.email === 'chandratextile.online@gmail.com' ){
    return children  // Render the requested component if the user is an admin
  }
  else{
    return <Navigate to={'/login'}/> // Redirect to the login page if the user is not an admin
  }

}




