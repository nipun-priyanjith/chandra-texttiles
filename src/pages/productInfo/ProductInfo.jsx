import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [products, setProducts] = useState(''); // State to hold product details  -- myContext
  const [selectedSize, setSelectedSize] = useState(''); // State to store the selected size


// Extracts ------->parameters from the URL
  const params = useParams();
    // console.log(products.title)



 //_______________________________________________________________- getProductData____________________________________
  // Function to fetch product data from Firestore based on the +++++++++provided ID
    const getProductData = async () => {
        setLoading(true);  // Indicates data loading
        try {
          const productTemp = await getDoc(doc(fireDB, 'products', params.id)); // Retrieves product details === parameters from the URL 
          
          setProducts(productTemp.data());  // Sets fetched product data
          
          setLoading(false); // Indicates data loading complete
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

    // like constractor
    useEffect(() => {
        getProductData() // Fetches product data on component mount

    }, [])







    // Accessing Redux dispatch function
    const dispatch = useDispatch()
    // Retrieving 'cart' items from the Redux store state
    const cartItems = useSelector((state) => state.cart)
    // console.log(cartItems)





  //_____________________________________________--add the product and size to ---> redux store__________________  
    // add to cart
    // Function to add product to cart
    const addCart = () => {
        if (!selectedSize) {
          toast.error('Please select a size'); // Displays an error if no size is selected
          return;
        }
        const productWithSize = { ...products, size: selectedSize }; // Add size to the product object



 // --***********   add the product and size to -------------> redux store -----> addToCart      
    dispatch(addToCart(productWithSize));// Dispatches action to add the product to the cart
    toast.success('Added to cart');// Displays a success message
  };



  // Effect to update local storage whenever 'cartItems' change
  useEffect(() => {
        // Updating local storage with the latest 'cartItems'
    // JSON.stringify converts the cartItems array/object into a string for storage
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Updates local storage with cart items
    // This effect runs whenever 'cartItems' change in the dependency array
  }, [cartItems]);// Only re-run the effect if 'cartItems' changes



    return (
        <Layout>
   {/* Displays product information */}
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* Displays product image */}
                        <img
                            alt="ecommerce"
                            className="lg:w-1/3 w-full lg:h-auto  object-cover object-center rounded"
                            src={products.imageUrl}
                        />
                        {/* Displays product details */}
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            {/* Title and description */}
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            Chandra Textile
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {products.title}
                            </h1>
     
                            <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                {products.description}
                            </p>
                            
                            
                            
                            
                            
             {/* Cloth size selection */}
                <div className="flex items-center mb-6">
                  <label htmlFor="clothSize" className="mr-3">
                    Cloth Size:
                  </label>
                  <select
                    id="clothSize"
                    className="border p-2 rounded"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>
                {/* Product price and add to cart button */}


                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                Rs.{products.price}
                                </span>
                                <button  onClick={addCart} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                               
                            </div>
                        </div>
                    </div>}
                </div>
            </section>

        </Layout>
    )
}

export default ProductInfo





