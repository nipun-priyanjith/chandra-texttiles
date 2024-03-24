import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  // Retrieves the user ID from local storage
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  // Accesses the context data using the useContext hook
  const context = useContext(myContext)
  const {  loading, order } = context // Destructuring properties from the context
  return (
    <Layout>
      

       {loading && <Loader />}
      {/* Checks if there are orders */}
       {order.length > 0 ?
        (<>
        {/* Display orders if they exist */}
          <div className=" h-full pt-10">
            {/* Filters orders based on the logged-in user's ID */}
            { order.filter(obj => obj.userid == userid).map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {/* Iterates through items in the order */}
                    {order.cartItems.map((item) => {
                        return (
                          <div className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" >
                              <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" >{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" >{item.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" >Rs.{item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          // Display a message if no orders exist
          <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
        )

      }

    </Layout>
  )
}

export default Order


















