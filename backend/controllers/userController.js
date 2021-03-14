import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';



//SIGN UP
const signup = async (req, res) => {
    try {
        //check if name, email, password
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({error: `Name, Email and Password required`});
        }

        //check if user exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({error: 'User already exists'})
        }

        //create user
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({error: 'Invalid user data'})
        }

    } catch (err) {
        res.status(500).json({error: 'Server Error'})
    }
}



//SIGN IN
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await User.findOne({email});

            if (user && (await user.matchPassword(password))) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                })
            } else {
                res.status(401).json({ error: `Invalid email or password`});
            }
        } else {
            res.status(400).json({error: 'Email and password are required'})
        }

    } catch (err) {
        res.status(500).json({error: 'Server Error'})
    }
}



//GET ALL USERS
//doesn't return the user who made this request
const getUsers = async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: req.user._id}});
        res.json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error'})
    }
}




export { signup, signin, getUsers };