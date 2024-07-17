import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function Err({ error }) {
    return (
        <div className="flex items-center space-x-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            <FontAwesomeIcon icon={faRobot} className="text-red-500 w-5 h-5" />
            <span className="text-sm">{error}</span>
        </div>
    );
}