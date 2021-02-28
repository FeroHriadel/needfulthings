import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';



//SIGN UP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({error: 'User already exists'})
        }

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


/*
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401).res.json({error: 'Unauthorized'})
    }
}
*/


//SIGN IN => doesn't check password properly!!! Validates any non-empty password as valid!!!
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




export { signup, signin };