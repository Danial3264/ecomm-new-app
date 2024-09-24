import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, fetchProducts, updateProduct } from '../redux/ProductThunks';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    
    const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
    const [formData, setFormData] = useState({ name: '' }); // Store form data

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleUpdate = (product) => {
        setEditingProductId(product.id); // Set the product to be edited
        setFormData({ name: product.name }); // Prefill the form with the product name
    };

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id: editingProductId, updatedData: formData }));
        dispatch(fetchProducts())
        setEditingProductId(null); // Close the edit form after submitting
        
    };

    return (
        <div>
            <h2 className="text-center text-5xl p-3">Product List</h2>
            <ul className="flex flex-col items-center gap-2">
                {products.map((product) => (
                    <div key={product.id}>
                        <li className="bg-red-700 text-white p-3 w-96">{product.name}</li>
                        
                        {/* Edit and Delete Buttons */}
                        <button onClick={() => handleUpdate(product)} className="rounded bg-gray-300 p-3 mt-2">
                            Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="rounded bg-gray-300 p-3 mt-2 ml-2">
                            Delete
                        </button>

                        {/* Conditionally render the edit form for the product being edited */}
                        {editingProductId === product.id && (
                            <form onSubmit={handleFormSubmit} className="mt-4">
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleFormChange} 
                                    className="border p-2"
                                    placeholder="Edit product name"
                                />
                                <button type="submit" className="rounded bg-blue-500 p-2 ml-2 text-white">
                                    Save
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setEditingProductId(null)} // Close the form
                                    className="rounded bg-red-500 p-2 ml-2 text-white"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
