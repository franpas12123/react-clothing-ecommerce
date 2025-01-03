/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '@/contexts/user.context'
import { Link, Outlet } from 'react-router'
import './navigation.styles.scss'
import Logo from '@/assets/logo.svg?react'
import { signOutUser } from '@/utils/firebase'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' key='shop' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' key='sign-in' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
