import React from 'react';
import CategorySquare from './CategorySquare';

const CategoryRow = () => {
  const categories = [
    {
      id: 1,
      title: 'T-Shirts',
      imageUrl: '/assets/shirts.jpg',
      linkUrl: '/tshirts',
    },
    {
      id: 2,
      title: 'Hoodies',
      imageUrl: '/assets/hoodies.jpg',
      linkUrl: '/hoodies',
    },
    {
      id: 3,
      title: 'Footwear',
      imageUrl: '/assets/footWear.jpg',
      linkUrl: '/link1',
    },
    {
      id: 4,
      title: 'shorts',
      imageUrl: '/assets/sweatpants.jpg',
      linkUrl: '/link1',
    },
    {
      id: 5,
      title: 'Sweats',
      imageUrl: '/assets/shorts.jpg',
      linkUrl: '/link1',
    },
    {
      id: 6,
      title: 'Leggings',
      imageUrl: '/assets/sweatpants.jpg',
      linkUrl: '/link1',
    },
  ];

  return (
    <section>
      <h3 className='text-2xl text-center text-black font-semibold mb-7 '>
        <span className='text-main'>Ca</span>te
        <span className='text-main'>go</span>ries
      </h3>
      <div className='flex md:flex-row flex-col items-center justify-around gap-5'>
        {categories.map((category) => (
          <CategorySquare
            id={category.id}
            key={category.id}
            title={category.title}
            imageUrl={category.imageUrl}
            linkUrl={category.linkUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;
