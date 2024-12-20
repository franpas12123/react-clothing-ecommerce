import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '@/utils/firebase'

import SignUpForm from '@/components/sign-up-form/sign-up-form.component'
import Button from '@/components/button/button.component'

const SignIn = () => {
  const handleSignInWithPopup = async () => {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)
  }

  return (
    <>
      <div>I am Sign In page</div>
      <Button onClick={handleSignInWithPopup} buttonType='google'>Sign In with popup</Button>
      <SignUpForm />
    </>
  )
}

export default SignIn
