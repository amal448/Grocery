import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets.js";
import toast from "react-hot-toast";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems,setCartItems]=useState({})
    const [searchQuery,setSearchQuery]=useState({})

    //fetch All Products
    const fetchProducts = async () => {
        console.log(dummyProducts);
        
       await setProducts(dummyProducts)
    }

    //Add Product to Cart 
    const addToCart=(itemsId)=>{
        console.log("itemsId",itemsId);
        
        let cartData=structuredClone(cartItems)
        if(cartData[itemsId]){
            cartData[itemsId] +=1;
        } 
        else{
                cartData[itemsId]=1
            } 
        setCartItems(cartData)
        toast.success("Added to Cart")
    }
    //Get Total Cart Count
    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item]
        }
        return totalCount
    }
    //Get Total Cart Amount
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems)
        {
            let itemsInfo=products.find((product)=>product._id ===items);
            if(cartItems[items]>0){
                totalAmount+=itemsInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount *100)/100
    }
    //Update Cart Item Quantity 
    const updateCartItem=(itemsId,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemsId]=quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }
    //Remove Product from Cart
    const removeFromCart=(itemsId)=>{
        let cartData=structuredClone(cartItems)
        if(cartData[itemsId]) cartData[itemsId]-=1
        if(cartData[itemsId] ===0) delete cartData[itemsId]
        setCartItems(cartData)
        toast.success("Removed from Cart")
    }
    useEffect(() => {
        console.log("fetch call from useEffect");
        fetchProducts()
    }, [])
    const value = {
        navigate, user, setUser, isSeller,
        setIsSeller, showUserLogin, setShowUserLogin,
        products, currency,
        addToCart,
        updateCartItem,removeFromCart,
        searchQuery,setSearchQuery,
        cartItems,getCartCount,getCartAmount
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
    return useContext(AppContext)
}