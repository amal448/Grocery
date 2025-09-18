import cloudinary from 'cloudinary';
import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
    console.log(req.body);
    try {
        
        const productData = JSON.parse(req.body.productData)
        const images = req.files

        const imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,
                    { resource_type: 'image' }
                );
                return result.secure_url;
            })
        )
        await Product.create({ ...productData, image: imageUrl })
        res.json({ success: true, message: "Product Added" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//Change Product inStock 
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body

        const product = await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message:"Stock Updated" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}