import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import im from 'C:\\Real Estate\\client\\src\\Login Assets\\real-12.jpg';
import { FcHome } from "react-icons/fc";
import ReactDOMServer from 'react-dom/server';
import Header from '../Components/Header';

const API_KEY = 'ff4bde7355774d66846794fd78e1a8b5';

export default function ShowListing() {
    const { currentUser } = useSelector((state) => state.user);
    const [showListingError, setShowListingError] = useState(false);
    const [userListing, setUserListing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState(null);
    const [activePopup, setActivePopup] = useState(null);
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setShowListingError(false);
                setLoading(true);
                const res = await fetch(`/api/user/listings/${currentUser._id}`);
                const data = await res.json();
                if (data.success === false) {
                    setShowListingError(true);
                } else {
                    const listingsWithCoords = await Promise.all(data.map(async (listing) => {
                        const address = `${listing.city}, ${listing.state}, ${listing.country}`;
                        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`);
                        const result = await response.json();
                        const coords = result.results[0] ? { lat: result.results[0].geometry.lat, lon: result.results[0].geometry.lng } : { lat: 0, lon: 0 };
                        return { ...listing, latitude: coords.lat, longitude: coords.lon };
                    }));
                    setUserListing(listingsWithCoords);
                    if (listingsWithCoords.length > 0) {
                        const avgLat = listingsWithCoords.reduce((sum, listing) => sum + parseFloat(listing.latitude), 0) / listingsWithCoords.length;
                        const avgLon = listingsWithCoords.reduce((sum, listing) => sum + parseFloat(listing.longitude), 0) / listingsWithCoords.length;
                        setMapCenter([avgLat, avgLon]);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setShowListingError(true);
                setLoading(false);
            }
        };

        fetchListings();
    }, [currentUser._id]);

    const handleListingDelete = async (listingid) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingid}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
            } else {
                setUserListing((prevListings) =>
                    prevListings.filter((listing) => listing._id !== listingid)
                );
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    const customIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(<FcHome size={30} />),
        iconSize: [30, 30],
        iconAnchor: [0, 0],
        popupAnchor: [0, -30],
        className: 'custom-div-icon'
    });

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;

        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebardata((prevState) => ({
                ...prevState,
                type: id,
            }));
        } else if (id === 'searchTerm') {
            setSidebardata((prevState) => ({
                ...prevState,
                searchTerm: value,
            }));
        } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setSidebardata((prevState) => ({
                ...prevState,
                [id]: checked,
            }));
        } else if (id === 'sort_order') {
            const sort = value.split('_')[0] || 'created_at';
            const order = value.split('_')[1] || 'desc';
            setSidebardata((prevState) => ({
                ...prevState,
                sort,
                order,
            }));
        }
    };

    const filterListings = () => {
        let filteredListings = userListing;

        if (sidebardata.searchTerm) {
            filteredListings = filteredListings.filter((listing) =>
                listing.name.toLowerCase().includes(sidebardata.searchTerm.toLowerCase())
            );
        }

        if (sidebardata.type !== 'all') {
            filteredListings = filteredListings.filter((listing) =>
                (sidebardata.type === 'rent' && listing.rent) ||
                (sidebardata.type === 'sale' && listing.sale) ||
                (sidebardata.type === 'offer' && listing.offer)
            );
        }

        if (sidebardata.parking || sidebardata.furnished) {
            filteredListings = filteredListings.filter((listing) =>
                (sidebardata.parking && listing.parking) ||
                (sidebardata.furnished && listing.furnished)
            );
        }

        switch (sidebardata.sort) {
            case 'regularPrice':
                filteredListings = filteredListings.sort((a, b) => sidebardata.order === 'asc' ? a.regularPrice - b.regularPrice : b.regularPrice - a.regularPrice);
                break;
            case 'created_at':
                filteredListings = filteredListings.sort((a, b) => sidebardata.order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        return filteredListings;
    };

    const filteredListings = filterListings();
    return (
        <div>
            <Header backgroundColor='#0D47A1' />
            <div className='pt-16'>
                <h1 className="text-center mt-4 text-2xl font-semibold">Your Listings</h1>
                <div className="flex">
                    {/* Left Side */}
                    <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                        <form className='flex flex-col gap-8'>
                            <div className='flex items-center gap-2'>
                                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                                <input type='text'
                                    id='searchTerm'
                                    placeholder='Search...'
                                    className='border rounded-lg p-3 w-full'
                                    value={sidebardata.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex gap-2 flex-wrap item-center'>
                                <label className='font-semibold'>Type:</label>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="all" className='w-5'
                                        checked={sidebardata.type === 'all'}
                                        onChange={handleChange}
                                    />
                                    <span>Rent & Sale</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="rent" className='w-5'
                                        checked={sidebardata.type === 'rent'}
                                        onChange={handleChange}
                                    />
                                    <span>Rent</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="sale" className='w-5'
                                        checked={sidebardata.type === 'sale'}
                                        onChange={handleChange}
                                    />
                                    <span>Sale</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="offer" className='w-5'
                                        checked={sidebardata.offer}
                                        onChange={handleChange}
                                    />
                                    <span>Offer</span>
                                </div>
                            </div>
                            <div className='flex gap-2 flex-wrap item-center'>
                                <label className='font-semibold'>Amenities:</label>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="parking" className='w-5'
                                        checked={sidebardata.parking}
                                        onChange={handleChange}
                                    />
                                    <span>Parking</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" id="furnished" className='w-5'
                                        checked={sidebardata.furnished}
                                        onChange={handleChange} />
                                    <span>Furnished</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <label className='font-semibold'>Sort:</label>
                                <select id="sort_order" className='border rounded-lg p-3'
                                    value={`${sidebardata.sort}_${sidebardata.order}`}
                                    onChange={handleChange}>
                                    <option value='regularPrice_desc'>Price high to low</option>
                                    <option value='regularPrice_asc'>Price low to high</option>
                                    <option value='created_at_desc'>Latest</option>
                                    <option value='created_at_asc'>Oldest</option>
                                </select>
                            </div>
                            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity:95'>
                                Search
                            </button>
                        </form>
                    </div>
                    {/* Middle Side: Map */}
                    <div className="pt-4 w-3/4 h-screen">
                        {mapCenter ? (
                            <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {userListing && userListing.length > 0 &&
                                    userListing.map((listing) => (
                                        <Marker
                                            key={listing._id}
                                            position={[listing.latitude, listing.longitude]}
                                            icon={customIcon}
                                            eventHandlers={{
                                                mouseover: () => setActivePopup(listing._id),
                                                mouseout: () => setActivePopup(null)
                                            }}
                                        >
                                            {activePopup && activePopup === listing._id && (
                                                <Popup>
                                                    <div className="p-2">
                                                        <Link to={`/listing/${listing._id}`}>
                                                            <img
                                                                src={listing.imageUrls[0] ? listing.imageUrls[0] : im}
                                                                alt="listing"
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                        </Link>
                                                        <h2 className="text-lg font-semibold">{listing.name}</h2>
                                                    </div>
                                                </Popup>
                                            )}
                                        </Marker>
                                    ))}
                            </MapContainer>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {/* Right Side: Listings */}
                    <div className="w-1/2 p-4 custom-scrollbar">
                        <div className="overflow-y-auto max-h-screen">
                            {filteredListings && filteredListings.length > 0 ? (
                                filteredListings.map((listing) => (
                                    <div key={listing._id} className="mb-8 p-4 rounded-lg border hover:bg-gray-100 relative">
                                        <Link to={`/listing/${listing._id}`}>
                                            <img
                                                src={listing.imageUrls[0] ? listing.imageUrls[0] : im}
                                                alt="listing image"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </Link>
                                        <div className="mt-2 flex justify-between">
                                            <button
                                                onClick={() => handleListingDelete(listing._id)}
                                                className="text-red-700 uppercase"
                                            >
                                                Delete
                                            </button>
                                            <h4 className='text-gray-700 font-semibold items-center'>{listing.name}</h4>
                                            <Link to={`/update-listing/${listing._id}`}>
                                                <button className="text-green-700 uppercase">Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No listings found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
