import React from 'react';
import im from "../Login Assets/about.webp";
import Footer from '../Component/Footer';

export default function About() {
  return (
    <div>
    <div className='relative h-screen'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url('${im}')` }}></div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='bg-black bg-opacity-50 p-10 rounded max-w-3xl mx-auto'>
          <h1 className='text-5xl font-bold text-white mb-6'>About Our Company</h1>
          <div className='text-center'>
            <p className='mb-4 text-lg text-white'>
              Rathore Estate is a leading real estate agency specializing in buying, selling, and renting properties in the most desirable neighborhoods. Our experienced agents are dedicated to providing exceptional service, making the buying and selling process as smooth as possible.
            </p>
            <p className='mb-4 text-lg text-white'>
              Our mission is to help clients achieve their real estate goals through expert advice, personalized service, and a deep understanding of the local market. Whether you're looking to buy, sell, or rent a property, we're here to assist you every step of the way.
            </p>
            <p className='mb-4 text-lg text-white'>
              Our team of agents possesses extensive experience and knowledge in the real estate industry, committed to delivering the highest level of service. We believe that buying or selling a property should be an exciting and rewarding experience, and we're dedicated to making that a reality for each of our clients.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
