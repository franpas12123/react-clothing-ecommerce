import { useState } from 'react'

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword
} from '@/utils/firebase'

import Button from '@/components/button/button.component'
import FormInput from '@/components/form-input/form-input.component'

import './sign-in-form.styles.scss'

const SignInForm = () => {
  const handleSignInWithPopup = async () => {
    await signInWithGooglePopup()
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const defaultFormFields = {
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { user } = await signInAuthWithEmailAndPassword(
        formFields.email,
        formFields.password
      )

      if (user) {
        resetFormFields()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          label='Email'
          name='email'
          value={email}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          value={password}
          onChange={onChangeHandler}
          required
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={handleSignInWithPopup} buttonType='google'>
            Sign In Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
