import { YStack, XStack, H1, Paragraph, Button } from '@my/ui'
import { SignInForm, SignUpForm } from './components'
import { useState } from 'react'

export function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <H1>{isSignIn ? 'Sign In' : 'Sign Up'}</H1>
      <Paragraph>Welcome to our app!</Paragraph>
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <XStack space>
        <Button onPress={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Need an account? Sign Up' : 'Have an account? Sign In'}
        </Button>
      </XStack>
    </YStack>
  )
}
