import jwt from 'jsonwebtoken';
import User from '../models/User.js';



//require matching user._id in Header
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



//require admin user
const admin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin === true) {
            next();
        } else {
            res.status(401).json({error: 'Not authorized as asmin'})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error (admin middleware)`})
    }


}



export { protect, admin };