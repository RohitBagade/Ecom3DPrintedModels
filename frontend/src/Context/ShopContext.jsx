import { useState, createContext, useEffect } from "react";
import Swal from 'sweetalert2';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
        let cart = {};
        for (let i = 1; i < 300 + 1; i++) {
            cart[i] = 0;
        }
        return cart;
    }

const ShopContextProvider = (props) => {

    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/all-products`)
            .then((response) => response.json())
            .then((data) => setAllProduct(data))

            if(localStorage.getItem("auth-token")) {
                fetch(`${process.env.REACT_APP_API_URL}/get-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem("auth-token")}`,
                        Accept: 'application/form-data'
                    },
                    body: JSON.stringify({}),
                })
                .then((response) => response.json())
                .then((data) => setCartItems(data));
            }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem("auth-token") === null) {
            Swal.fire({
                icon: 'error',
                title: 'Login Required',
                text: "Please login to add items to the cart",
            });
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                Accept: 'application/form-data'
            },
            body: JSON.stringify({"itemId": itemId})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Item Added',
                    text: "Item added to cart successfully",
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem("auth-token") === null) {
            Swal.fire({
                icon: 'error',
                title: 'Login Required',
                text: "Please login to remove items from the cart",
            });
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/remove-from-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                Accept: 'application/form-data'
            },
            body: JSON.stringify({ itemId })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Item Removed',
                    text: "Item removed from cart successfully",
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(itemId));
                totalAmount += cartItems[itemId] * itemInfo.new_price;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0)
            {
                totalItems += cartItems[itemId];
            }
        }
        return totalItems;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
