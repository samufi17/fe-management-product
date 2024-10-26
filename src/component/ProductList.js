import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductController } from '../controllers/ProductController';
import { ProductContext } from '../context/ProductContext';

import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import DeleteProductForm from './DeleteProductForm';
import AlertSuccess from './alert/AlertSuccess';
import AlertError from './alert/AlertError';

const ProductList = () => {
  // Alternative code
  // const dispatch = useDispatch();
  const { state } = useSelector(ProductContext);
  console.log('State: ', state);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductId, setSelectedProductId] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const result = await ProductController.getAllProducts();
    setProducts(result);
  };

  const openAddModal = () => { setIsAddModalOpen(true) };
  const closeAddModal = () => { setIsAddModalOpen(false) };

  const openEditModal = (id, data) => {
    console.log('PARAMS SELECTED ===> ', id,data);
    setSelectedProduct(id, data)
    setIsEditModalOpen(true)
  };

  const closeEditModal = () => { setIsEditModalOpen(false) };

  const openDeleteModal = (id) => {
    setSelectedProductId(id)
    setIsDeleteModalOpen(true)
  };
  const closeDeleteModal = () => { 
    setSelectedProductId()
    setIsDeleteModalOpen(false) 
  };

  // *Add product*
  const createProduct = async (data) => {
    const result = await ProductController.createProduct(data);
    setProducts([...products, result]);
    closeAddModal();
  };

  // *Edit product*
  const updateProduct = async (id, data) => {
    try {
        const result = await ProductController.updateProduct(id, data);
        setProducts(products.map(product => product.id === id ? { ...product, ...result } : product));
    } catch (error) {
        console.error('Error editing product:', error);
    }
  };

  // *Delete product*
  const deleteProduct = async (id) => {
    try {
      await ProductController.deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        console.log('STATUS: ', status);
        return (
          <svg className="w-6 h-6 text-green-600 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
          </svg>
        )
      case 'PENDING':
        return (
          <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
          </svg>
        )
      case 'REJECTED':
        return (
          <svg className="w-6 h-6 text-red-600 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
          </svg>        
        )      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen container mx-auto p-4 pt-10">
      <div>
        <AlertSuccess />
        <AlertError />
      </div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4 text-left text-white">Product List</h1>
        <button onClick={openAddModal} data-modal-toggle="addModal" data-modal-target="addModal" className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <svg className="w-5 h-5 text-gray-800 dark:text-white me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
          </svg>
          Add Product
        </button>
      </div>
      <div className="relative overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 shadow-md sm:rounded-lg bg-white">
        <div>
          <table id="products-table" className="w-full text-sm text-left text-gray-700 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-row items-center justify-center"> {getStatusIcon(product.status)} </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-row items-center justify-center">
                      <button type="button" onClick={() => { openDeleteModal(product.id) }} className="inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        <svg className="w-5 h-5 text-gray-800 dark:text-white me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                        Delete
                      </button>
                      <button type="button" onClick={() => openEditModal({id: product.id, data: product})} className="inline-flex items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd"/>
                          <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd"/>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div>
          <div className="flex items-center justify-center py-4">
            <button onClick={prevPage} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <p className="mx-2">{currentPage}/{totalPages}</p>
            <button onClick={nextPage} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div> */}
      </div>

      {/* Add modal */}
      <div id="addModal" tabIndex="-1" aria-hidden={isAddModalOpen ? "false" : "true"} className={`fixed inset-0 flex items-center justify-center z-50 w-full max-h-full ${isAddModalOpen ? "block" : "hidden"}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Product
              </h3>
              <button type="button" onClick={closeAddModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <AddProductForm closeAddModal={closeAddModal} createProduct={createProduct} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <div id="editModal" tabIndex="-1" aria-hidden={isEditModalOpen ? "false" : "true"} className={`fixed inset-0 flex items-center justify-center z-50 w-full max-h-full ${isEditModalOpen ? "block" : "hidden"}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="relative w-full max-w-4xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Product
              </h3>
              <button type="button" onClick={closeEditModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <EditProductForm closeEditModal={closeEditModal} updateProduct={updateProduct} product={selectedProduct} />
            </div>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      <div id="deleteModal" tabIndex={1} aria-hidden={isDeleteModalOpen? "false" : "true"} className={`fixed inset-0 flex items-center justify-center z-50 w-full max-h-full ${isDeleteModalOpen ? "block" : "hidden"}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="relative w-full max-w-sm h-full md:h-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              {selectedProductId && (
                <DeleteProductForm closeDeleteModal={closeDeleteModal} deleteProduct={deleteProduct} id={selectedProductId} />
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductList;

