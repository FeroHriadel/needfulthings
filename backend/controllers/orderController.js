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



//GET ALL ORDERS
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) return res.status(404).json({error: 'No orders found'});
        res.json(orders)

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error'});
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



//UPDATE ORDER
// (updates:   .isPaid & .isDelivered)
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) return res.status(400).json({error: 'Order Id is required'});

        const { isPaid, isDelivered } = req.body;

        //cannot validate if at least one was sent, because if both are sent as false the "if(!isPaid && !isDelivered)" will fail even though they were sent. Validate this in frontend!

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({error: `Order not found`});

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {isDelivered, isPaid}, {new: true});

        res.json(updatedOrder);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: `Server Error`});
    }
}



const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({error: 'Order not found'});

        await Order.findByIdAndRemove(orderId);
        res.json({message: 'Order removed'});


    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error'})
    }
}





export {addOrder, getOrderById, getOrders, updateOrder, deleteOrder}