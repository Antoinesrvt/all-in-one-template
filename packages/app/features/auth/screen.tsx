import { YStack, XStack, H1, Paragraph, Button } from '@my/ui'
import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'

export function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <H1>{isSignIn ? 'Sign In' : 'Sign Up'}</H1>
      <Paragraph>Welcome to our app!</Paragraph>
      {isSignIn ? <SignIn routing="virtual" /> : <SignUp />}
    </YStack>
  )
}
