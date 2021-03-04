import Order from '../models/Order.js';



//ADD ORDER
const addOrder = async (req, res) => {
    try {
        const { orderItems, address, totalPrice, shippingPrice } = req.body;
        console.log(shippingPrice)//

        if (!orderItems || !address || !totalPrice) { //   '|| !shippingPrice'   cannot be here because if it is 0, it will throw an error 
            return res.status(400).json({error: 'orderItems, address, totalPrice & shippingPrice required'})
        }

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({error: `No order items sent`})
        } else {
            const order = new Order({orderItems, address, totalPrice, shippingPrice, user: req.user._id});
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error`})
    }
}



export {addOrder}