/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '@/utils/firebase'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })

    return unsubscribe
  })

  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}
