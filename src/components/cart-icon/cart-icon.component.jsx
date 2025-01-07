import ShoppingIcon from '@/assets/shopping-bag.svg?react'

import './cart-icon.styles.scss'
import { useContext } from 'react'
import { CartContext } from '@/contexts/cart.context'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext)
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      {itemCount ? <span className='item-count'>{itemCount}</span> : ''}
    </div>
  )
}

export default CartIcon
