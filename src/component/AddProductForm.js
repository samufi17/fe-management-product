import React, { useState } from 'react';

const AddProductForm = ({ ...props }) => {
  const [items, setItems] = useState({ name: '', price: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createProduct(items)
    .then(() => {
        setItems({ name: '', price: '', description: '' });
      });
  };

  const handleInputChange = (e) => {
    e.persist();
    setItems({ 
      ...items, 
      [e.target.name]: e.target.value 
    });
  };

  const handleInputChangePrice = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setItems({
        ...items,
        [e.target.name]: value
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="POST">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-m font-medium text-gray-900">Product Name</label>
            <input type="text" id="name" name="name" value={items.name} onChange={(e) => handleInputChange(e)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter product name" />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-m font-medium text-gray-900">Price</label>
            <input type="text" id="price" name="price" value={items.price} onChange={(e) => handleInputChangePrice(e)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter price" />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-m font-medium text-gray-900">Description</label>
            <input type="text" id="description" name="description" value={items.description} onChange={(e) => handleInputChange(e)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter description" />
          </div>
        </div>
        <div className="mb-2 mt-6 text-right">
          <button type="button" onClick={props.closeAddModal} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

