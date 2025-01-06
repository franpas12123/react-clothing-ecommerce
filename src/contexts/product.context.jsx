/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { createContext, useState } from "react"
import PRODUCTS from '@/shop-data.json'


export const ProductContext = createContext({
  products: [],
  setProducts: () => {}
})

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(PRODUCTS)
  }, [])

  return <ProductContext.Provider value={{products, setProducts}}>{children}</ProductContext.Provider>
}