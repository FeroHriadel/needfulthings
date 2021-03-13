import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ modalShown, modalText, closeFunction, actionFunction }) => {
    //close modal if use clicks outside the dialogue box ('modal-content' class)
    const closeOnOutsideClick = e => {
        if (!e.target.className.includes('modal-content')) {
            closeFunction();
        }
    }

    const [actionConfirmed, setActionConfirmed] = useState(false);

    const carryOutActionFunction = () => {
        if (actionConfirmed) {
            actionFunction();
            setActionConfirmed(false);
            closeFunction();
        }
    }

    return (
        <div className={modalShown ? 'modal shown' : 'modal'} onClick={closeOnOutsideClick}>

            <div className="modal-content">
                <p className='modal-content-text'>{modalText}</p>
                <div className="modal-content-buttons">
                
                    <button 
                        className='modal-content-btn' 
                        onClick={() => {
                            setActionConfirmed(true);
                            carryOutActionFunction();
                        }
                    }>OK</button>

                    <button 
                        className='modal-content-btn' 
                        onClick={closeFunction}
                    >
                        Close
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Modal
