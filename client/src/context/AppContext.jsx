import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets.js";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const [user, setUser] = useState(null) //user
    const [isSeller, setIsSeller] = useState(false) //admin
    const [showUserLogin, setShowUserLogin] = useState(false) //to show login ui
    const [products, setProducts] = useState([]) //get product data
    const [cartItems, setCartItems] = useState({}) //store each user cartdetails
    const [searchQuery, setSearchQuery] = useState({}) // prompt data

    // fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-Auth');
            if (data.success) {
                setIsSeller(true)
            }
            else {
                setIsSeller(false)
            }
        }
        catch (error) {
            setIsSeller(false)
        }
    }
    //User Auth Status, User Data and Cart Items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-Auth');
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
            else {
                setUser(null)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //fetch All Products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            console.log(data);

            if (data.success) {
                setProducts(data.products)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }

    }

    //Add Product to Cart 
    const addToCart = (itemsId) => {
        console.log("itemsId", itemsId);

        let cartData = structuredClone(cartItems)
        if (cartData[itemsId]) {
            cartData[itemsId] += 1;
        }
        else {
            cartData[itemsId] = 1
        }
        setCartItems(cartData)
        toast.success("Added to Cart")
    }
    //Get Total Cart Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }
    //Get Total Cart Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemsInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemsInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    }
    //Update Cart Item Quantity 
    const updateCartItem = (itemsId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemsId] = quantity
        setCartItems(cartData)
        // toast.success("Cart Updated")
    }
    //Remove Product from Cart
    const removeFromCart = (itemsId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemsId]) cartData[itemsId] -= 1
        if (cartData[itemsId] === 0) delete cartData[itemsId]
        setCartItems(cartData)
        toast.success("Removed from Cart")
    }

    useEffect(() => {
        const updateCart = async () => {
            console.log("called update cart");
            
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (data.success) {
                    toast.success(data.message)
                }
            }
            catch (error) {

            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [])


    const value = {
        navigate, user, setUser, isSeller,
        setIsSeller, showUserLogin, setShowUserLogin,
        products, currency,
        addToCart,
        updateCartItem, removeFromCart,
        searchQuery, setSearchQuery,
        cartItems, getCartCount, getCartAmount, axios,
        fetchProducts,setCartItems,fetchUser
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
    return useContext(AppContext)
}