import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function myState(props) {

// State variables for managing loading status, products, product orders, and user data
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


//_____________________________________________addProduct_____________________________________________________________
   // ------------------------------------Function to add a new product to the Firestore database
    const addProduct = async () => {
        // Validation check for required fields
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)
// AddProdact page to overide and add new prodac details (setProdact) ---> add firebase database
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // setProducts("")


    }






    // State variable for storing product data fetched from Firestore
    const [product, setProduct] = useState([]);


//_____________________________________________getProductData_____________________________________________________________
    // ------------------------------------Function to fetch product data from Firestore
    const getProductData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    // Fetch product data once on component mount
    useEffect(() => {
        getProductData();
    }, []);

    // update product function
     // Function to handle editing product details
    const edithandle = (item) => {
        setProducts(item)
    }



    //_____________________________________________updateProduct_____________________________________________________________
    // Function to update a product in Firestore
    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    //_____________________________________________deleteProduct_____________________________________________________________
// Function to delete a product from Firestore
    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


//_____________________________________________getOrderData_____________________________________________________________

// State variables for storing order and user data fetched from Firestore
    const [order, setOrder] = useState([]);
// Function to fetch order data from Firestore
    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
//   *****
            // console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    const [user, setUser] = useState([]);


    //_____________________________________________getUserData_____________________________________________________________
// Function to fetch user data from Firestore
    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
//  *****           
            // console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
// Fetch order and user data once on component mount
    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

 // Provide the state values and functions as context values
    return (
        <MyContext.Provider value={{
             loading, setLoading,// products -- null value ,setProducts -- add new value 
            products, setProducts, // AddProdact page to overide [products null value] and add new prodacts details (setProdact) ---> add firebase database
            addProduct, product, // prodact -- data from Firestore to use cart and more.. , addProduct -- is funtin name [add new firebase]
            edithandle, //update products ==> ***setProducts(item)*** -----=>* user click DashbordTab in update icon-->[<div onClick={() => edithandle(item)}>] then open page -><Link to={'/updateproduct'}>
             updateProduct,// Function name **updateproduct** update(override) and stor Firestore.     page-- '/UpdateProdact'  in click onClick={updateProduct}
              deleteProduct,// DashbordTab -- <div onClick={() => deleteProduct(item)}  >    funtion delete to firebase item === prodact
             order,//getOrderData() form firebase and stor setorder. '/DashboardTab'    {order.map((allorder,index)=>  {allorder.cartItems.map((item,index)=>{___> {allorder.paymentId}
            user,//getUserData() form firebase and stor setorder.  '/DashboardTab'  {user.map((item,index)=>
           
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState




