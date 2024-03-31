import React from 'react';
import CategorySquare from './CategorySquare';
import img1 from '../../public/assets/shirts.jpg';
import img2 from '../../public/assets/hoodies.jpg';
import img3 from '../../public/assets/footWear.jpg';
import img4 from '../../public/assets/sweatpants.jpg';
import img5 from '../../public/assets/shorts.jpg';
import img6 from '../../public/assets/sweatpants.jpg';
const CategoryRow = () => {
  const categories = [
    { id: 1, title: 'T-Shirts', imageUrl: img1, linkUrl: '/tshirts' },
    { id: 2, title: 'Hoodies', imageUrl: img2, linkUrl: '/hoodies' },
    { id: 3, title: 'Footwear', imageUrl: img3, linkUrl: '/link1' },
    { id: 4, title: 'shorts', imageUrl: img4, linkUrl: '/link1' },
    { id: 5, title: 'Sweats', imageUrl: img5, linkUrl: '/link1' },
    { id: 6, title: 'Leggings', imageUrl: img6, linkUrl: '/link1' },
  ];
  return (
    <section>
      <h3 className='text-2xl text-center text-black font-semibold mb-7'>
        <span className='text-main'>Ca</span>te
        <span className='text-main'>go</span>ries
      </h3>
      <div className='flex md:flex-row flex-col items-center justify-around gap-5'>
        {categories.map((category) => (
          <CategorySquare
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
