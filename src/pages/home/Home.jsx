import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout' // Importing the Layout component
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
 
import ProductCard from '../../components/productCard/ProductCard'

import { Link } from 'react-router-dom' // Importing Link component from react-router-dom for navigation

// Functional component for the home page
function Home() {
  return (
     <Layout>
       {/* Rendering the HeroSection component */}
      <HeroSection />
      {/* Rendering the ProductCard component */}
      <ProductCard />
      {/* Button to navigate to the allproducts page */}
      <div className="flex justify-center -mt-10 mb-4">
        {/* Link component to navigate to the '/allproducts' route */}
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>

    </Layout>
    
  )
}

export default Home // Exporting the Home component




