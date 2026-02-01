import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { BentoGrid, ProjectsHero } from '@/components/ProjectShowcase'

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description:
    'Explore my collection of projects, from creative experiments to production applications.',
  openGraph: {
    title: 'Projects | Portfolio',
    description:
      'Explore my collection of projects, from creative experiments to production applications.',
  },
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    pagination: false,
  })

  // Sort: featured projects first, then by order
  const sortedProjects = [...projects.docs].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ProjectsHero />

      <div className="pb-32">
        {sortedProjects.length > 0 ? (
          <BentoGrid projects={sortedProjects} />
        ) : (
          <div className="container mx-auto px-6 py-20 text-center">
            <p className="text-lg text-gray-400">No projects found. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </main>
  )
}
