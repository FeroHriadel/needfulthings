import React from 'react';
import Map from '../Components/Map';
import './ContactScreen.css';
import background from './shingle.jpg';



const ContactScreen = () => {




    return (
        <div className='contact-screen'>
            
            <Map />

            <div className="image-and-text-box">
                <div
                    className="img"
                    style={{
                        width: '260px',
                        height: '260px',
                        background: `url(${background}) no-repeat center center/cover`
                    }}
                />
                <div className="txt">
                    <h1><span>N</span>eedful <span>T</span>hings</h1>
                    <p>Due to unfortunate circumstances we were forced to close down our old store in Castle Rock. But don't lose heart!</p>
                    <p>We have just set up a new store in Main St., Lincoln, Maine.</p>
                    <p>We are looking forward to seeing you soon!</p>
                </div>
            </div>
        </div>
    )
}

export default ContactScreen
