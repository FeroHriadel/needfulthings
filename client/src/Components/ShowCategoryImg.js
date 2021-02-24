import React from 'react';



const ShowCategoryImg = ({ category }) => {
    //hover event listeners
    const zoomIn = (e) => {
        e.target.style.transform = 'scale(1.5)';
        e.target.style.transition = 'transform 5s linear';
    }

    const zoomOut = (e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.transition = 'transform 0.5s linear';
    }


    
    return (
             <div 
                style={{
                    background: `url('/api/categories/getImage/${category._id}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.5s linear'
                }}
                onMouseOver={zoomIn}
                onMouseLeave={zoomOut}
            />
    )
}

export default ShowCategoryImg
