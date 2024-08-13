import React from 'react'
import { ClerkProvider as ClerkProviderWeb } from '@clerk/nextjs'
import { ClerkProvider as ClerkProviderExpo } from '@clerk/clerk-expo'
import Constants from 'expo-constants'

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    // Web environment
    return <ClerkProviderWeb publishableKey={publishableKey}>{children}</ClerkProviderWeb>
  } else {
    // Expo environment
    return <ClerkProviderExpo publishableKey={publishableKey}>{children}</ClerkProviderExpo>
  }
}

export function ClerkProviderNext({ children }: { children: React.ReactNode }) {
  return <ClerkProviderWeb publishableKey={publishableKey}>{children}</ClerkProviderWeb>
}
