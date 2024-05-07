'use client';
import React, { useState } from 'react';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    type: '',
    imageUrl: '',
    images: [], // Array to handle multiple image URLs
    stock: 0,
    variants: {}, // Object to handle multiple color and size options
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('type', product.type);
    formData.append('stock', product.stock);
    product.images.forEach((image) => {
      formData.append('images', image);
    });
    Object.keys(product.variants).forEach((color) => {
      Object.keys(product.variants[color]).forEach((size) => {
        formData.append(
          `variants[${color}][${size}]`,
          product.variants[color][size],
        );
      });
    });

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      console.log('Product added:', result);
      // Clear form or redirect, etc.
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)],
    }));
  };

  const handleVariantChange = (e, color, size) => {
    const value = Number(e.target.value);
    setProduct((prev) => ({
      ...prev,
      variants: {
        ...prev.variants,
        [color]: {
          ...(prev.variants[color] || {}),
          [size]: value,
        },
      },
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
          onChange={handleImageChange}
          multiple
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
      <div>
        <label className='flex flex-col'>Black - M:</label>
        <input
          className='border-2 p-2'
          type='number'
          onChange={(e) => handleVariantChange(e, 'Black', 'M')}
          placeholder='Quantity for Black M'
        />
      </div>
      <div>
        <label className='flex flex-col'>White - S:</label>
        <input
          className='border-2 p-2'
          type='number'
          onChange={(e) => handleVariantChange(e, 'White', 'S')}
          placeholder='Quantity for White S'
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
