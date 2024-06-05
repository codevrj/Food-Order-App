import React from 'react';
import Layout from '../components/Layout';

export default function about() {
  return (
    <Layout title="About">
      <div className="max-w-[1640px] mx-auto p-2  bg-black/10">
        <div className='h-fit text-white flex flex-col absolute bg-black/50'>
          <span className='mx-auto mt-20 text-4xl font-bold'>About Our Cafe</span><br/>
          <span className='mx-auto mt-6 text-2xl font-semibold'>Fresh |Fast| Best</span><br/>
          <div className='mx-8 px-32'>
            <div className='mt-8 text-center'>
            Cafe07 strongly believes in maintaining high standards of quality, environmental sustainability 
            and community wellbeing, therefore using gold standard industrial equipment that works with precision 
            and safe for food preparation, strict health & hygiene protocols, sourcing fresh ingredients from local 
            farmers, maximized use of organic ingredients are some of the key areas that we actively focused on. 
            The restaurant’s operational consultancy was carried out by International partnerships, a 
            well-established hospitality management consultancy firm based in Sri Lanka.</div>
          </div>
        </div>
        <img 
        src='https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?w=996&t=st=1680120765~exp=1680121365~hmac=6313167dcead39020736100a0ca160dee01be26e92390e553006a8a20da71e66'
        className='w-full max-h-[500px] object-cover'
      />
      </div>
    </Layout>
  );
}
