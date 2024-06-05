import React from 'react';
import Layout from '../components/Layout';

export default function about() {
  return (
    <Layout title="Contact">
      <div className="max-w-[1640px] mx-auto p-2  bg-black/10">
        <div className="w-full text-orange-50 flex flex-col absolute mx-auto">
          <div className="mx-auto mt-20 text-4xl font-bold">
            Contact Us
          </div>
          <br />
          <div className="flex items-center justify-center mx-8 px-32">
            <div className="mt-8 text-center">
            <span className='text-lg'>Cafe07 - TANGALLE</span>
            <div>012-3456789</div>
            <div className='mt-8 text-lg'>Address</div>
            <div>Cafe07, Beliatta Road ,<br/>
            Tangalle , Sri lanka</div>
            <div className='text-lg mt-8'>Hours</div>

             <div className='mt-4 text-orange-200'>Open for dine-in and  takeout
                Mon-Sun 8:00am-7:30pm</div>
            </div>
          </div>
        </div>
        <img
          src="https://img.freepik.com/premium-photo/wood-table-blur-background-modern-restaurant_31965-1377.jpg?size=626&ext=jpg&uid=R97835860&semt=ais"
          className="w-full max-h-[500px] object-cover"
        />
      </div>
    </Layout>
  );
}
