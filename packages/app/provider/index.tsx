import { useColorScheme } from 'react-native'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config } from '@my/ui'
import { ToastViewport } from './ToastViewport'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, ClerkProviderNext } from './clerk-provider'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { AuthScreen } from '../features/auth/screen'
import { Navbar } from '@my/ui/src/navBar'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.EXPO_PUBLIC_CONVEX_URL

if (!convexUrl) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL or EXPO_PUBLIC_CONVEX_URL is not set')
}

const convex = new ConvexReactClient(convexUrl)

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useClerkAuth()

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return isSignedIn ? <>{children}</> : <AuthScreen />
}

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  const ClerkProviderComponent = typeof window !== 'undefined' ? ClerkProviderNext : ClerkProvider

  return (
    <ClerkProviderComponent>
      <ConvexProviderWithClerk client={convex} useAuth={useClerkAuth}>
        <I18nextProvider i18n={i18n}>
          <TamaguiProvider
            config={config}
            defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
            {...rest}
          >
            <ToastProvider swipeDirection="horizontal" duration={6000} native={[]}>
              <AuthWrapper>
                <Navbar />
                {children}
              </AuthWrapper>
              <CustomToast />
              <ToastViewport />
            </ToastProvider>
          </TamaguiProvider>
        </I18nextProvider>
      </ConvexProviderWithClerk>
    </ClerkProviderComponent>
  )
}
