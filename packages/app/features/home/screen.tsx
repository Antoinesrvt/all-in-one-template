import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchRouterButton,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/navigation'
import { useTranslation } from 'react-i18next'

export function HomeScreen() {
  const { t } = useTranslation()
  const linkTarget = '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
      // ... existing props ...
      ></XStack>

      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          {t('welcome')}
        </H1>
        <Paragraph col="$color10" ta="center">
          {t('basicStarter')}
        </Paragraph>
        <Separator />
        <Paragraph ta="center">{t('sameCode')}</Paragraph>
        <Separator />
      </YStack>
    </YStack>
  )
}
