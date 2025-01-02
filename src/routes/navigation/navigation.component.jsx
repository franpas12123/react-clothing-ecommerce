/* eslint-disable react/prop-types */
import { Link, Outlet } from 'react-router'
import './navigation.styles.scss'
import Logo from '@/assets/logo.svg?react'

const Navigation = () => {
  return (
    <>
      <div className='navigation'>
          <Link className='logo-container' to={'/'}>
            <Logo className='logo' />
          </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' key='shop' to='/shop'>
            Shop
          </Link>
          <Link className='nav-link' key='sign-in' to='/auth'>
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
