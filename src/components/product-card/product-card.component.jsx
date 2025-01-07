/* eslint-disable react/prop-types */
import { useContext } from 'react'
import Button from '../button/button.component'

import './product-card.styles.scss'

import { CartContext } from '@/contexts/cart.context'

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext)
  const { name, imageUrl, price } = product
  const addToCart = () => {
    addItemToCart(product)
  }
  
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <Button buttonType='inverted' onClick={addToCart}>
        Add to cart
      </Button>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
    </div>
  )
}

export default ProductCard
