import React, { createContext,  useEffect,  useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [food_list, setFoodList] = useState([]);
  const url="https://food-del-backend-2xat.onrender.com";

  const addToCart = async (itemId) => {
    
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      
      await axios.post(`${url}/api/cart/add`,{itemId}, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  const removeCartItem = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(`${url}/api/cart/remove`,{itemId}, { headers: { Authorization: `Bearer ${token}` } });

    }
  };

  const getTotalprice = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item]>0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeCartItem,
    getTotalprice,
    url,
    token,
    setToken
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  //load cart data
  const loadCartData = async (req,res)=>{
    try {
      const respones = await axios.post(`${url}/api/cart/get`,{},{ headers: { Authorization: `Bearer ${token}` } });
      
      setCartItems(respones.data.cartData);
    }catch(err){
      console.error("Error loading cart data:", err);
      res.status(500).json({ message: "Internal server error loading cart data", success: false });
    }
  }

  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      
    }
    loadData();
  },[])
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
