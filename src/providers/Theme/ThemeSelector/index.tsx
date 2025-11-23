'use client'

import React from 'react'

import { useTheme } from '..'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className="relative z-20 bg-transparent p-0.5 text-foreground hover:bg-transparent"
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
    >
      {' '}
      {theme == 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  )
}
