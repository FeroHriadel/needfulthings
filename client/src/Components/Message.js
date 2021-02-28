import React from 'react';
import './Message.css';



const Message = ({ shown, text }) => {
    const popupClassName = shown ? 'message-popup' : 'message-popup hidden';

    return (
        <div className='message-container'>
            <div className={popupClassName}>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Message
