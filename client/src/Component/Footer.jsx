import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="font-serif text-2xl">
                        Rathore Estate
                    </div>
                    <div className="flex space-x-4 items-center">
                        <a href="#" className="text-gray-500 hover:text-white">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
                <div className="flex justify-center space-x-8 text-gray-500 text-sm">
                    <a href="#" className="hover:text-white">PRIVACY</a>
                    <a href="#" className="hover:text-white">SITE MAP</a>
                    <a href="#" className="hover:text-white">COOKIE PREFERENCE</a>
                    <a href="#" className="hover:text-white">LEGAL</a>
                    <div className="flex items-center">
                        <span className="mr-1">|</span>
                        <img src="https://www.tollbrothers.com/images/eho_logo.svg" alt="Equal Housing Opportunity" className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

