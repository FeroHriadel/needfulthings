import mongoose from 'mongoose';



const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            price: {type: Number, required: true},
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    address: {
        name: {type: String, required: true}, //so we at least have user's name in the order
        street: {type: String}, //not required because user can choose 'pickup'
        city: {type: String}, //not required because user can choose 'pickup'
        zip: {type: String}, //not required because user can choose 'pickup'
        country: {type: String}, //not required because user can choose 'pickup'
        shipping: {type: String, required: true, default: 'pickup'} //shipping type: 'pickup' or 'ship', shoulda called it shippingType :(
    },
    paymentResult: { //PAYPAL: this will be filled by updateOrderToPaid after PayPal Payment
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    isPaid: { //PAYPAL: this will be filled by updateOrderToPaid after PayPal Payment
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: { //PAYPAL: this will be filled by updateOrderToPaid after PayPal Payment
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

export default Order;