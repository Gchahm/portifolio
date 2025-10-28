import React from 'react'
import { createRoot } from 'react-dom/client'
import root from 'react-shadow'
import StackIcon from 'tech-stack-icons'

interface IsolatedIconProps {
  name: string
  className?: string
}

export function IsolatedIcon({ name, className }: IsolatedIconProps) {
  return (
    <root.div>
      <StackIcon name={name} className={className} />
    </root.div>
  )
}
