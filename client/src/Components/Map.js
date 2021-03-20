import React, {useEffect, useState} from 'react';
import GoogleMapreact from 'google-map-react';
import './Map.css';
import LocationMarker from './LocationMarker';


const Map = ({ center, zoom }) => {
    //GOOGLEMAPS KEY FROM BACKEND
    const [key, setKey] = useState(null);

    const getGooglemapsKey = async () => {
        const res = await fetch('api/config/googlemaps');
        const data = await res.json();
        setKey(data.googlemapsKey);
    }

    useEffect(() => {
        if (key === null) {
            getGooglemapsKey();
        }
    }, [key])






    return (
        key ?
            <div className='map'>
                <GoogleMapreact
                    bootstrapURLKeys={{key: key}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <LocationMarker lat={center.lat} lng={center.lng} />
                </GoogleMapreact>
            </div>
        :
        <p>Map is loading...</p>
    )
}



Map.defaultProps = {
    center: {
        lat: 45.364048658154275,
        lng: -68.50359498172017
    },
    zoom: 16
}

export default Map
