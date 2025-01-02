import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '@/utils/firebase'

import FormInput from '@/components/form-input/form-input.component'
import Button from '@/components/button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const onChangeHandler = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }

    try {
      const res = await createAuthUserWithEmailAndPassword(email, password)
      if (res) {
        await createUserDocumentFromAuth(res.user, { displayName })
        resetForm()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={onSubmitHandler}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Email"
          type='email'
          name='email'
          value={email}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Password"
          type='password'
          name='password'
          value={password}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Confirm Password"
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
