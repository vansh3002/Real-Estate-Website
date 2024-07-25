import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import ListingItem from '../Component/ListingItem';
import im from "../Login Assets/q3.webp";
import vid from "../Login Assets/78552-uhd_3840_2160_30fps.mp4";
import Header from '../Component/Header';
import Footer from '../Component/Footer';

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [marketNews, setMarketNews] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('white');

    SwiperCore.use([Navigation]);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
                fetchMarketNews();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMarketNews = async () => {
            try {
                const res = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'real estate',
                        apiKey: 'db11520b37464020af4196b41ad33fd8',
                        language: 'en',
                        pageSize: 10
                    }
                });
                setMarketNews(res.data.articles);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setBackgroundColor('black');
                } else {
                    setBackgroundColor('white');
                }
            },
            { threshold: 0.1 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        };
    }, []);

    return (
        <div style={{backgroundColor}}>
            <div className='flex flex-col gap-0 mt-0 mb-3  w-full mx-auto'>
                <Header />
                <div className='videoDiv relative w-full h-screen'>
                    <video src={vid} autoPlay muted loop className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
                    <div className='absolute top-0 ml-14 w-full h-full flex flex-col gap-6 justify-center items-start p-6 z-20'>
                        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                            Find your next <span className='text-slate-500'>Perfect</span><br />
                            Place with Ease
                        </h1>
                        <div className='text-gray-200 text-xs sm:text-sm font-bold'>
                            Rathore Estate is the best place to find your next perfect place to live.
                            <br />
                            We have a wide range of properties for you to choose from.
                        </div>
                        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
                            Let's get started...
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Swiper navigation>
                {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
                    <SwiperSlide key={listing._id}>
                        <Link to={`/listing/${listing._id}`}>
                            <div
                                style={{
                                    backgroundImage: listing.imageUrls && listing.imageUrls.length > 0 ? `url(${listing.imageUrls[0]})` : `url('${im}')`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    height: '500px',
                                }}
                                className='h-[500px]'
                                key={listing._id}
                            ></div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-700'>Recent offers</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?offer=true'}>Show more offers</Link>
                        </div>
                        <div className='flex flex-row flex-wrap gap-4 overflow-x-auto'>
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-700'>Recent places for rent</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?type=rent'}>Show more places for rent</Link>
                        </div>
                        <div className='flex flex-row flex-wrap gap-4 overflow-x-auto'>
                            {rentListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-700'>Recent places for sale</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?type=sale'}>Show more places for sale</Link>
                        </div>
                        <div className='flex flex-row flex-wrap gap-4 overflow-x-auto'>
                            {saleListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Swiper navigation>
                {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
                    <SwiperSlide key={listing._id}>
                        <Link to={`/listing/${listing._id}`}>
                            <div
                                style={{
                                    backgroundImage: listing.imageUrls && listing.imageUrls.length > 0 ? `url(${listing.imageUrls[0]})` : `url('${im}')`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    height: '500px',
                                }}
                                className='h-[500px]'
                                key={listing._id}
                            ></div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="max-w-7xl mx-auto p-3 my-10">
                <h2 className='text-2xl font-semibold text-slate-700 mb-4'>Real Estate Market News</h2>
                <Swiper
                    navigation
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 40 },
                        1024: { slidesPerView: 4, spaceBetween: 50 },
                    }}
                >
                    {marketNews && marketNews.length > 0 && marketNews.map((news, index) => (
                        news.urlToImage &&(
                        <SwiperSlide key={index}>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <div
                                    style={{
                                        backgroundImage: `url(${news.urlToImage})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                    className="shadow-md hover:shadow-lg transition-shadow overflow-hidden h-[300px] flex flex-col justify-end p-4 text-white bg-black bg-opacity-50 transform transition-transform hover:scale-105"
                                >
                                    <h3 className='text-lg font-bold'>{news.title}</h3>
                                    <p className='text-sm'>{news.description}</p>
                                </div>
                            </a>
                        </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </div>
            <div ref={bottomRef} style={{ height: '4px' }}></div>
            <Footer />
        </div>
        
    );
}
