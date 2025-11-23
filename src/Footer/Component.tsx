import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { GithubSvg, LinkedInSvg } from '@/components/ui/svgs'

const labelMapper: Record<string, any> = {
  linkedin: <LinkedInSvg />,
  github: <GithubSvg />,
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto">
      <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
        {navItems.map(({ link }, i) => {
          return (
            <Link className="text-white" key={i} href={link.url || ''}>
              {labelMapper[link.label]}
            </Link>
          )
        })}
      </div>
    </footer>
  )
}
