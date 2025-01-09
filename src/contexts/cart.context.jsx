/* eslint-disable react/prop-types */
import { useEffect } from 'react'
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
    if (cur.id !== productToDelete.id ) {
      acc.push({...cur})
      return acc
    }
    if (cur.quantity > 1) {
      acc.push({...cur, quantity: cur.quantity - 1})
    }
    return acc
  }, [])
}

const clearCartItems = (cartItems, productToDelete) => {
  return cartItems.filter(item => item.id !== productToDelete.id)
}

const countItems = (cartItems) => {
  return cartItems.reduce((acc, cur) => acc += cur.quantity, 0)
}

const computeTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, {price, quantity}) => acc += price * quantity, 0)
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
  const [totalPrice, setTotalPrice] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
    setItemCount(itemCount + 1)
  }

  const removeItemFromCart = (productToDelete) => {
    setCartItems(removeCartItem(cartItems, productToDelete))
    setItemCount(itemCount - 1)
  }

  const clearItemFromCart = (productToDelete) => {
    setCartItems(clearCartItems(cartItems, productToDelete))
  }

  useEffect(() => {
    setItemCount(countItems(cartItems))
  }, [cartItems])

  useEffect(() => {
    setTotalPrice(computeTotalPrice(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, totalPrice, cartItems, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}
