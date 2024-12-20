import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '@/utils/firebase'

const SignIn = () => {
  const handleSignInWithPopup = async () => {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)
  }

  return (
    <>
      <div>I am Sign In page</div>
      <button onClick={handleSignInWithPopup}>Sign In with popup</button>
    </>
  )
}

export default SignIn
