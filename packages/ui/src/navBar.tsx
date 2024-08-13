import { XStack, YStack, Image, Avatar, Sheet, Button } from 'tamagui'
import { Menu, ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { usePathname } from 'solito/navigation'
import { MotiLink } from 'solito/moti'

export function Navbar() {
  const router = useRouter()
  const { user } = useUser()
  const isHome = usePathname() === '/'

  return (
    <XStack
      backgroundColor="$background"
      borderBottomColor="$borderColor"
      borderBottomWidth={1}
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$4"
      paddingVertical="$2"
    >
      {isHome ? (
        <Image source={{ uri: '/path-to-your-icon.png' }} width={40} height={40} />
      ) : (
        <Button
          icon={ChevronLeft}
          circular
          onPress={() => router.back()}
          backgroundColor="transparent"
        />
      )}

      <XStack space="$4" alignItems="center" $sm={{ display: 'flex' }} $xs={{ display: 'none' }}>
        {user && (
          <Avatar circular size="$4" onPress={() => router.push('/user/nate')}>
            <Avatar.Image source={{ uri: user.imageUrl }} />
          </Avatar>
        )}
      </XStack>
    </XStack>
  )
}
