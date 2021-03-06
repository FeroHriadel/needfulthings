import Order from '../models/Order.js';



//ADD ORDER
const addOrder = async (req, res) => {
    try {
        const { orderItems, address, totalPrice, shippingPrice, isPaid, paymentResult, paidAt } = req.body;

        if (!orderItems || !address || !totalPrice) { //   '|| !shippingPrice'   cannot be here because if it is 0, it will throw an error    // isPaid, paymentResult paidAt are not here 'cos we want unpaid 'pickup' orders go thru too.
            return res.status(400).json({error: 'orderItems, address, totalPrice & shippingPrice required'})
        }

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({error: `No order items sent`})
        } else {
            const order = new Order({orderItems, address, totalPrice, shippingPrice, user: req.user._id, isPaid, paymentResult, paidAt});
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error`})
    }
}



//GET ORDER BY ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'name email');

        if (order) {
            res.json(order)
        } else {
            res.status(404).json({error: `Order not found`})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Invalid orderId format or Server Error`})
    }
}




export {addOrder, getOrderById}