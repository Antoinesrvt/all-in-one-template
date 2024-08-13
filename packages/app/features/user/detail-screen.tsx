import { Button, Paragraph, YStack, XStack, Avatar, H2, Text, SwitchThemeButton } from '@my/ui'
import { ChevronLeft, LogOut } from '@tamagui/lucide-icons'
import { useParams, useRouter } from 'solito/navigation'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Platform } from 'react-native'

export function UserDetailScreen() {
  const router = useRouter()
  const { id } = useParams()
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <YStack f={1} p="$4" gap="$4" bg="$background">
      {user ? (
        <YStack gap="$4" ai="center">
          <Avatar size="$12" circular>
            <Avatar.Image accessibilityLabel="Cam" src={user.imageUrl} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <H2>{user.fullName}</H2>
          <XStack gap="$2">
            <Text fow="bold">Email:</Text>
            <Text>{user.primaryEmailAddress?.emailAddress}</Text>
          </XStack>
          <XStack gap="$2">
            <Text fow="bold">Username:</Text>
            <Text>{user.username}</Text>
          </XStack>
          {Platform.OS === 'web' && (
            <>
              <SwitchThemeButton />
            </>
          )}
          <Button icon={LogOut} onPress={handleLogout}>
            Log Out
          </Button>
        </YStack>
      ) : (
        <Paragraph>Loading user data...</Paragraph>
      )}
    </YStack>
  )
}
