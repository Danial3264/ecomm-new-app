import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/ProductThunks';


const CreateProduct = () => {
    
    const [data, setData] = useState({
        name: '',
        shippingCost: '',
        image: null, // Initialize image state
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Use object destructuring
        setData({
            ...data,  // Use `data` instead of `formData`
            [name]: value,
        });
    };
    

    const handleFileChange = (e) => {
        setData({
            ...data,
            image: e.target.files[0] // Get the file object from the input
        });
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create a new FormData object
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('shippingCost', data.shippingCost);
    
        if (data.image) {
            formData.append('image', data.image);
        }
    
        // Dispatch the createProduct action
        dispatch(createProduct(formData));
        setData({
            name: '',
            shippingCost: '',
            image: null, // Initialize image state
        })
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Shipping Cost"
                name="shippingCost"
                value={data.shippingCost}
                onChange={handleInputChange}
            />
            <input
                type="file"
                onChange={handleFileChange}
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default CreateProduct;
