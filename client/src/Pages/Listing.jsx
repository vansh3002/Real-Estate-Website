import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Err from './ERR'
import { list } from 'firebase/storage';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import im1 from "../Login Assets/q3.webp"
import im2 from "../Login Assets/q4.jpg"
import { FaShare } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';
import { FaParking } from 'react-icons/fa';
import { FaMapMarkedAlt, FaChair } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../Component/Contact';
import Header from '../Component/Header';

export default function Listing() {
  SwiperCore.use(Navigation);
  const [listing, setlisting] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setcontact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setloading(false);
          return;
        }
        setlisting(data);
        setloading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleMapClick = () => {
    const location = `${listing.city}, ${listing.state}, ${listing.country}`;
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/place/${encodedLocation}`, '_blank');
  };
  const navigateToMap = () => {
    if (listing) {
      const location = `${listing.city}, ${listing.state}, ${listing.country}`;
      const encodedLocation = encodeURIComponent(location);
      window.open(`https://www.google.com/maps/place/${encodedLocation}`, '_blank');
    }
  };
  return (
    <main>
      {loading && <Err error="Loading..." />}
      {error && <Err error="Something Went Wrong" />}

      {listing && !loading && !error && (
        <div className='gap-4'>
          <Header />
          <Swiper navigation>
            {listing.imageUrls.length > 0 ? (
              listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className='h-[550px]'
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))
            ) : (
              <>
            {/* console.log(1); */}
                <SwiperSlide>
                  <div
                    className='h-[450px]'
                    style={{
                      backgroundImage: `url(${im1})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className='h-[450px]'
                    style={{
                      backgroundImage: `url(${im2})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              </>
            )}
          </Swiper>
          <div className='flex flex-wrap'>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare className='text-slate-500'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            <div className='fixed top-[13%] lg:right-[8%] sm:right-[12%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaMapMarkerAlt
                className='text-slate-500'
                onClick={navigateToMap}
              />
            </div>
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link Copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>              
              <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(`${listing.city}, ${listing.state}, ${listing.country}`)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-2 text-blue-600 hover:underline'
              >
                <FaMapMarkerAlt className='text-green-700' /> </a>
                {listing.address}, {listing.city}, {listing.state}, {listing.country}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setcontact(true)} className='bg-slate-700 text-white rounded-lg p-3 uppercase hower:opacity-80'>
                Contact Landlord
              </button>
            )}
            {contact && <Contact l={listing} />}
          </div>
        </div>
      )}
    </main>
  )
};
