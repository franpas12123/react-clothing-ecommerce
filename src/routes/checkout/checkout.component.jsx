import './checkout.styles.scss'
import { useContext } from 'react'
import { CartContext } from '@/contexts/cart.context'
import CheckoutItem from '@/components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext)
  const headers = ['Product', 'Description', 'Quantity', 'Price', 'Remove']
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        {headers.map((header) => (
          <div key={header} className='header-block'>
            {header}
          </div>
        ))}
      </div>
      {cartItems && cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)}
      <span className='total'>Total: {totalPrice}</span>
    </div>
  )
}

export default Checkout
