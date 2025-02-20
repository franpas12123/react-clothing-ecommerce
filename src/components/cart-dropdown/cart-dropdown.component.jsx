import './cart-dropdown.styles.scss'

import { useNavigate } from 'react-router'
import { useContext } from 'react'

import Button from '@/components/button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '@/contexts/cart.context'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => navigate('/checkout')
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems && cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
