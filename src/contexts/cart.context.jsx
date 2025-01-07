/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems]
  const index = cartItems.findIndex((item) => item.id === productToAdd.id)
  if (index < 0) {
    const newItem = { ...productToAdd, quantity: 1 }
    newCartItems.push(newItem)
  } else {
    newCartItems[index].quantity += 1
  }
  return newCartItems
}

const removeCartItem = (cartItems, productToDelete) => {
  return cartItems.reduce((acc, cur) => {
    if (cur.id === productToDelete.id && cur.quantity > 1) {
      acc.push({...cur, quantity: cur.quantity--})
    } else {
      acc.push({...cur})
    }
  }, [])
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: []
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [itemCount, setItemCount] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
    setItemCount(itemCount + 1)
  }

  const removeItemToCart = (productToDelete) => {
    setCartItems(removeCartItem(cartItems, productToDelete))
    setItemCount(itemCount - 1)
  }

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}
