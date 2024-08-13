import { Button, Input, YStack } from '@my/ui'
import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/clerk-react'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, isLoaded } = useSignIn()

  const handleSignIn = async () => {
    if (!isLoaded || !signIn) return
    try {
      await signIn.create({
        identifier: email,
        password,
      })
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <YStack space>
      <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleSignIn} disabled={!isLoaded}>
        {!isLoaded ? 'Loading...' : 'Sign In'}
      </Button>
    </YStack>
  )
}

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, isLoaded } = useSignUp()

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) return
    try {
      await signUp.create({
        emailAddress: email,
        password,
      })
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  return (
    <YStack space>
      <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleSignUp} disabled={!isLoaded}>
        {!isLoaded ? 'Loading...' : 'Sign Up'}
      </Button>
    </YStack>
  )
}
