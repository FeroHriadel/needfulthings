import React from 'react';



const ShowCategoryImg = ({ category }) => {


    return (
             <div 
                style={{
                    background: `url('/api/categories/getImage/${category._id}') no-repeat center center/cover`,
                    width: '200px',
                    height: '200px',
                }} 
            />
    )
}

export default ShowCategoryImg
