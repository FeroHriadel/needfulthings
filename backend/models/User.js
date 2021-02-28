import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; //install bcryptjs, not bcrypt!



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});



//create a schema method to compared hashed password with plain text password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
} //REMEMBER to call this ASYNCHRONOUSLY (await)!!!



//hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



const User = mongoose.model('User', userSchema);

export default User;