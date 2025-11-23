'use client'

import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface SectionNavigationProps {
  blocks: Page['layout'][0][]
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({ blocks }) => {
  const [activeSection, setActiveSection] = useState<string>('')

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) {
    return null
  }

  // Extract section IDs and names from blocks
  const sections = blocks
    .map((block, index) => {
      const id = block.blockName || `${index}`
      const name = block.blockName || `Section ${index + 1}`
      return { id, name }
    })
    .filter((section) => section.id)

  if (sections.length === 0) {
    return null
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sections])

  return (
    <nav className="my-20">
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'text-sm transition',
                activeSection === section.id
                  ? 'font-semibold text-slate-200'
                  : 'text-slate-400 hover:text-slate-200',
              )}
            >
              {section.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
