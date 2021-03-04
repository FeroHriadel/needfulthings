import React from 'react';
import './PageIntro.css';



const PageIntro = () => {
    return (
        <div className="otj-split-page-container">

            <div className="otj-split-page-side" id='otj-split-page-side1'>
                <div className="otj-split-page-text-container">
                    <h1>
                        <span className="otj-split-page-big-text">N</span>
                        <span className="otj-split-screen-small-text">EEDFUL</span>
                        <span className="otj-split-page-big-text">T</span>
                        <span className="otj-split-screen-small-text">HINGS</span>
                    </h1>
                </div>
            </div>

            <div className="otj-split-page-side" id='otj-split-page-side2'>
                <div className="otj-split-page-text-container">
                    <h1>
                        <span className="otj-split-page-big-text">N</span>
                        <span className="otj-split-screen-small-text">EEDFUL</span>
                        <span className="otj-split-page-big-text">T</span>
                        <span className="otj-split-screen-small-text">HINGS</span>
                    </h1>
                </div>
            </div>

        </div>
    )
}

export default PageIntro
