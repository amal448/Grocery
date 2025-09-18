import Order from '../models/Order.js'
import Product from '../models/Product.js'

// place order COD 

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        console.log("Items", items);

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })
        }
        //Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)
        //Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02)
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        })
        return res.json({ success: true, message: "Order Placed Successfully" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get Orders of a user
export const getuserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId, $or: [{ paymentType: 'COD' }, { isPaid: true }] })
            .populate("items.product.address").sort({ createdAt: -1 })
            console.log("items.product.address",orders);
            
        return res.json({ success: true, orders })

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get All Orders(for seller/admin)
export const getAllOrders = async (req, res) => {
    try {
      
        const orders = await Order.find({ $or: [{ paymentType: 'COD' }, { isPaid: true }] })
            .populate("items.product.address").sort({ createdAt: -1 })
            console.log("items.product.address",orders);
            
        return res.json({ success: true, orders })

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}