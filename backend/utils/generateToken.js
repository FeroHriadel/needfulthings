import jwt from 'jsonwebtoken';



const generateToken = (userId) => { //encrypts user._id
    return jwt.sign({userId}, process.env.JWT_SECRET);
}

export default generateToken;