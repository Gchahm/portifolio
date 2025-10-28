import React from 'react'
import { createRoot } from 'react-dom/client'
import root from 'react-shadow'
import StackIcon from 'tech-stack-icons'
import { useTheme } from '@/providers/Theme'

interface IsolatedIconProps {
  name: string
  className?: string
}

export function IsolatedIcon({ name, className }: IsolatedIconProps) {
  const { theme } = useTheme();

  return (
    <root.div className={className}>
      <StackIcon className={className} name={name} variant={theme === 'dark' ? 'dark' : 'light'} />
    </root.div>
  )
}
