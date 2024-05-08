'use client';
import { addProduct, createProduct } from '@/config/firebase';
import React, { useState } from 'react';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    images: [],
    style: '',
    sizes: ['md', 'lg'],
    variants: [{ name: 'black', color: '#000000', src: '/products/img2.webp' }],
    stock: 0,
    date: new Date(),
    badge: 'none',
    featured: false,
  });

  /*
{
  "name": "Cool T-Shirt",
  "price": 19.99,
  "description": "Super awesome shirt!",
  "imageUrl": "https://...", 
  "images": ["https://...", "https://..."],
  "style": "shirt",
  "variants": [
    { "color": "red", "sizes": { "S": 10, "M": 5, "L": 2 }},
    { "color": "blue", "sizes": { "S": 3, "XL": 8 }} 
  ]
}
*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    addProduct(product);
    console.log(product);
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-4 flex-wrap justify-around'
    >
      <input
        className='border-2 p-2'
        type='text'
        name='name'
        value={product.name}
        onChange={handleInputChange}
        placeholder='Product Name'
        required
      />
      <div className='flex flex-col'>
        <label htmlFor='price'>Price($):</label>
        <input
          className='border-2 p-2'
          type='number'
          name='price'
          value={product.price}
          onChange={handleInputChange}
          placeholder='Price'
          required
        />
      </div>
      <textarea
        className='border-2 p-2'
        name='description'
        value={product.description}
        onChange={handleInputChange}
        placeholder='Description'
      />
      <input
        className='border-2 p-2'
        type='text'
        name='type'
        value={product.type}
        onChange={handleInputChange}
        placeholder='Type'
      />
      <input
        className='border-2 p-2'
        type='text'
        name='imageUrl'
        value={product.imageUrl}
        onChange={handleInputChange}
        placeholder='image Url'
      />
      <div className='flex flex-col'>
        <label htmlFor='images'>Additional Images:</label>
        <input
          className='border-2 p-2'
          type='file'
          multiple
          onChange={handleImageChange}
          placeholder='Upload Images'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='stock'>Stock:</label>
        <input
          className='border-2 p-2'
          type='number'
          name='stock'
          value={product.stock}
          onChange={handleInputChange}
          placeholder='Total Stock'
        />
      </div>

      <button
        type='submit'
        className='border-2 p-2 hover:bg-gray-500 hover:text-white transition-colors duration-300'
      >
        Add Product +
      </button>
    </form>
  );
};

export default AddProductForm;
