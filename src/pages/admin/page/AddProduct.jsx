// Import necessary modules and components
import React, { useContext, useState } from 'react';
import myContext from '../../../context/data/myContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Functional component for adding a product
function AddProduct() {
    // Access context data
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;
    // State to store the uploaded image file
    const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
     // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        uploadImage(file); // Function to upload the image file to Firebase Storage
    };



 //___________________________________________________________-upload image___________________________________________   
     // Function to upload image to Firebase Storage
    const uploadImage = async (file) => {
        const storage = getStorage();

        const storageRef = ref(storage, `product_images/${file.name}`);
        
        try {
            // Upload image file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);

            // Get download URL of the uploaded image
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            // Set the image URL in the product state
            setProducts({ ...products, imageUrl: downloadURL }); // Set the image URL in the product state
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };
    // Render the Add Product form
    
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    {/* Form for adding a product */}
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    {/* Input fields for product details */}
                    <div>
                        {/* Input for product title */}
                        <input type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    {/* More input fields for other product details (price, image URL, category, description) */}
                    {/* ... (similar input fields for other product details) */}
                    {/* Input for file upload */}
                    <div>
                        <input type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10" name='title'
                         value={products.description}
                         onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc'>

                        </textarea>
                    </div>
                    <div>
                        {/* Input for file upload */}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*" // Accept only image files
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                        />
                    </div>
                    {/* Button to add the product */}
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct   // Export the AddProduct component





