import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';// Importing context for data
import Layout from '../../components/layout/Layout';// Importing Layout component
import Modal from '../../components/modal/Modal';// Importing Modal component
import { useDispatch, useSelector } from 'react-redux';// Importing necessary functions from Redux
import { deleteFromCart } from '../../redux/cartSlice';// Importing deleteFromCart action from cartSlice
import { toast } from 'react-toastify';// Importing toast notifications
import { addDoc, collection } from 'firebase/firestore'; // Importing Firestore functions
import { fireDB } from '../../fireabase/FirebaseConfig'; // Importing Firebase configuration


function Cart() {

  const context = useContext(myContext)// Accessing the context
                                                      
  

  const dispatch = useDispatch() // Creating a dispatch function for Redux

  const cartItems = useSelector((state) => state.cart); // Retrieving cart items from Redux store

  // console.log(cartItems)


// Function to delete an item from the cart in the Redux store
// delete to redux store cart deleteFromCart ----- export const {addToCart, deleteFromCart} = cartSlice.actions;
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item)); // Dispatching the action to delete an item from the cart
    toast.success("Delete cart") // Displaying a success message using toast notification
  }


 // Storing cartItems in local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])



// Calculating total amount of cart items
  const [totalAmout, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price)
    })
    setTotalAmount(temp);
    //console.log(temp)
  }, [cartItems])



// Calculating shipping, grand total, and handling user information
  const shipping = parseInt(200);
// Handling user information through useState
  const grandTotal = shipping + totalAmout;
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  
// Function to handle the buy now action
  const buyNow = async () => {
     // Validation for required fields
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        // Displaying an error message using toast notification
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    // Creating address information object

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    // Configuration object for Razorpay payment
    // currency: "INR", // This is set to Indian Rupees (INR)
    var options = {
      key: "",
      key_secret: "",
      amount: parseInt(grandTotal * 100),
      currency: "LKR",
      order_receipt: 'order_rcptid_' + name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems, // Retrieving cart items from Redux store
          addressInfo, // address information object <-- get data from <Modal/> 
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email, // get data redux
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }
        // __________-add database to order__________________________________________________________________

        try {

          const orderRef = collection(fireDB, 'order');
          addDoc(orderRef, orderInfo);

        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    // Creating a new instance of Razorpay and opening the payment dialog
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)


  }
  return (
    <Layout >
      {/* Cart display section */}
      <div className="h-screen bg-gray-100 pt-5 mb-[60%] " >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          {/* Rendering cart items */}
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item;
              return (
                <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" >
                  <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" >{title}</h2>
                      <h2 className="text-sm  text-gray-900" >{description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" >Rs.{price}</p>
                    </div>
                    <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      {/* Delete icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />

                        {/* SVG path for delete icon */}
                      </svg>

                    </div>
                  </div>
                </div>
              )
            })}

          </div>
          {/* Cart summary and modal section */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" >
            {/* Subtotal */}
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" >Subtotal</p>
              <p className="text-gray-700" >Rs.{totalAmout}</p>
            </div>
            {/* Shipping cost */}
            <div className="flex justify-between">
              <p className="text-gray-700" >Shipping</p>
              <p className="text-gray-700" >Rs.{shipping}</p>
            </div>
            <hr className="my-4" />
            {/* Grand total */}
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" >Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" >Rs.{grandTotal}</p>
              </div>
            </div>
            {/* Modal for user details and buy now button */}
            {/* <Modal  /> to get the input for each variables  */}
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
              // placeOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart  // Exporting the Cart component




