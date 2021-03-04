import jwt from 'jsonwebtoken';
import User from '../models/User.js';



const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; //token is encrypted userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //decrypt userId from header
            req.user = await User.findById(decoded.userId).select('-password'); //find user by id and fetch their details. Save these details as req.user. Now the controller gets: req.user = {_id, name, email...}
    
            next()
        } catch (err) {
            console.log(err);
            res.status(401).json({error: `Not authorized, token failed`});
        }
    }
}



export { protect };