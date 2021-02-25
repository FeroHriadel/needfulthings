import mongoose from 'mongoose';



const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    rating: {type: Number, required: true},
    comment: {type: String, required: true}
}, {timestamps: true});



const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    sold: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    reviews: [reviewSchema]
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;