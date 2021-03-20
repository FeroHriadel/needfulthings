import React from 'react';
import { Icon } from '@iconify/react';
import storeIcon from '@iconify/icons-mdi/store';
import './LocationMarker.css';



const LocationMarker = ({ lat, lng }) => {
    return (
        <div className="location-marker">
            <Icon icon={storeIcon} className='location-icon'></Icon>
        </div>
    )
}

export default LocationMarker
