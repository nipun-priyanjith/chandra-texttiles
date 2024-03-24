import React, { useContext, useEffect } from 'react'
// import Filter from '../../components/filter/Filter'
// import ProductCard from '../../components/productCard/ProductCard'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart } from '../../redux/cartSlice'
// Functional component to display all products
function Allproducts() {
  const context = useContext(myContext)
  const {  product } = context // Extracting product data from the context



  return (
    <Layout>
        {/* Section displaying product cards */}
      
      <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" >Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {/* Mapping through each product item and displaying a ProductCard component */}
                    {product.map((item, index) => {
                        const { title, price, description, imageUrl,id } = item; // Extracting specific product details
                        return (
                            <div onClick={()=> window.location.href = `/productinfo/${id}`}   key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"  >
                                    <div className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" >Chandra Textile</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" >{title}</h1>
                                        {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                        <p className="leading-relaxed mb-3" >Rs.{price}</p>
                                        {/* Button to add the product to cart */}
                                        <div className=" flex justify-center">
                                            <button type="button" 
                                            onClick={()=> window.location.href = `/productinfo/${id}`}
                                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}




                </div>

            </div>
        </section >
    </Layout>
  )
}

export default Allproducts // Exporting the Allproducts component


