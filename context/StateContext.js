import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);


  let foundProduct
  let index
  // Decrease and increase the quantity of products - 1 +
  const  incQty = () =>{
    setQty(prevQty => prevQty + 1 )
  }
  const  decQty = () =>{
    setQty(prevQty => {
      if(prevQty - 1 < 1) return 1 

      return prevQty - 1 
    })
  }
  // Add products in cart 
    const onAddCart = (product,quantity) =>{
      const checkProductIsInCart = cartItems.find((item)  => item._id === product._id)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)

      if(checkProductIsInCart){

        const updateCardItems = cartItems.map(cartProduct => {
          if(cartProduct._id === product._id) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        })
        setCartItems(updateCardItems)
        
      }else{
        product.quantity = quantity
        setCartItems([...cartItems,{...product}])
      }
      toast.success(`${qty} ${product.name} added to the cart!`)
    }

    // quantity of items in the cart - 0 +
    const toggleCartItemQuantity= (id,value)=>{
      foundProduct = cartItems.find((item)=> item._id === id)
      index = cartItems.findIndex(product => product._id === id ) // FindIndex returns the position of the product inside cardItems array
      const newCartItems =  cartItems.filter((item) =>  item._id !== id)// creating a new cartItems to find which is decrease or increase

      if(value === 'inc'){
        setCartItems([...newCartItems,{...foundProduct ,quantity: foundProduct.quantity + 1 }])
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
      }else if(value === 'dec' ){
        if(foundProduct.quantity > 1) {
          setCartItems([...newCartItems,{...foundProduct ,quantity: foundProduct.quantity - 1 }])
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)

        }
      }
    }
    // Remove the product from the cart
    const onRemove = (product) => {
      foundProduct = cartItems.find((item)=> item._id === product._id)
      const newCartItems =  cartItems.filter((item) =>  item._id !== product._id)
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
      setCartItems(newCartItems)




    }


  return(
    <Context.Provider   
      value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAddCart,
      toggleCartItemQuantity,
      onRemove,
      setCartItems,
      setTotalPrice,
      setTotalQuantities 
    }}>
      {children}
    </Context.Provider>
  )
}
export const useStateContext = () => useContext(Context)