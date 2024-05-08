import React from 'react';
import Image from 'next/image';
import { useScreenSize } from '@/hooks';
import ProductTableCell from './ProductTableCell';
import AddProductForm from './AddProductForm';
import items from '@/data/items.json';

const statusColor = {
  'in stock': 'bg-green-200 text-green-800',
  'out of stock': 'bg-red-200 text-red-800',
  'low stock': 'bg-yellow-200 text-yellow-800',
};

const ProductTable = () => {
  const { isMobile } = useScreenSize();
  const handleTouchStart = (event) => {
    if (isMobile) {
      const touch = event.touches[0];
      setStartX(touch.clientX);
    }
  };

  const handleTouchEnd = (event, id) => {
    if (isMobile && startX !== null) {
      const touch = event.changedTouches[0];
      const endX = touch.clientX;

      if (startX > endX && startX - endX > 50) {
        // console.log(`Attempt to delete item with ID: ${id}`);
        // TODO: Implement deletion logic
      }

      setStartX(null);
    }
  };

  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-black uppercase bg-black dark:text-gray-400'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              Product
            </th>
            {!isMobile && (
              <th scope='col' className='py-3 px-6'>
                Price
              </th>
            )}
            <th scope='col' className='py-3 px-6'>
              Status
            </th>
            <th scope='col' className='py-3 px-6'>
              Date Added
            </th>
            {!isMobile && (
              <>
                <th scope='col' className='py-3 px-6'>
                  Badge
                </th>
                <th scope='col' className='py-3 px-6'>
                  Modify
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className='border-b bg-white border-black'
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, item.id)}
            >
              <td className='py-4 px-6 flex items-center space-x-4'>
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={50}
                  height={50}
                  className='rounded-sm'
                />
                <ProductTableCell isMobile={isMobile} item={item} />
              </td>
              {!isMobile && (
                <>
                  <td className='py-4 px-6 font-bold'>${item.price}</td>
                  <td
                    className={`p-2 text-center rounded-md ${
                      statusColor[item.status.toLowerCase()] || ''
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className='py-4 px-6 text-gray-800'>{item.date}</td>
                  <td className='py-4 px-6 text-gray-800'>{item.badge}</td>
                  <td className='py-4 px-6 text-red-500 underline font-bold'>
                    DELETE
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <AddProductForm />
    </div>
  );
};

export default ProductTable;
