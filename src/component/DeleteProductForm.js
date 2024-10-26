import React from 'react';

const DeleteProductForm = ({ ...props }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.deleteProduct(props.id)
    props.closeDeleteModal();
  }

  return (
    <div className="p-4 md:p-4 space-y-4">
      <form onSubmit={handleSubmit} action="DELETE">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Apakah Anda yakin ingin menghapus produk ini?
        </p>
        <div className="mb-2 mt-6 text-right">
          <button type="button" onClick={props.closeDeleteModal} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteProductForm;