import { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '@/utils/firebase'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignIn = () => {
  const handleSignInWithPopup = async () => {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const onChangeHandler = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <div>I am Sign In page</div>
      <button onClick={handleSignInWithPopup}>Sign In with popup</button>

      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input type='text' name='displayName' value={displayName} onChange={onChangeHandler} required  />

        <label>Email</label>
        <input type='email' name='email' value={email} onChange={onChangeHandler} required  />

        <label>Password</label>
        <input type='password' name='password' value={password} onChange={onChangeHandler} required  />

        <label>Confirm Password</label>
        <input type='password' name='confirmPassword' value={confirmPassword} onChange={onChangeHandler} required  />

        <button type='submit'>Sign In</button>
      </form>
    </>
  )
}

export default SignIn
