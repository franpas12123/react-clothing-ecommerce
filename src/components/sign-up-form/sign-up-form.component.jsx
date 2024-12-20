import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '@/utils/firebase'
import FormInput from '@/components/form-input/form-input.component'

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
    <div>
      <h1>Sign up with your email and password</h1>

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

        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default SignUpForm
