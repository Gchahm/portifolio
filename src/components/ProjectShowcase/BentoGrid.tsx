'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { Project } from '@/payload-types'
import { BentoProjectCard } from './BentoProjectCard'

interface BentoGridProps {
  projects: Project[]
}

export const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  // Determine card sizes based on position and featured status
  const getCardSize = (index: number, project: Project): 'large' | 'medium' | 'small' => {
    // Featured projects get large size
    if (project.featured && index < 2) return 'large'
    // First non-featured project is large
    if (index === 0) return 'large'
    // Create visual variety
    if (index % 5 === 0) return 'large'
    return 'medium'
  }

  return (
    <section className="relative">
      {/* Section background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-6xl opacity-30">
          <div
            className="h-full w-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Featured Work
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            A selection of projects that showcase problem-solving, creativity, and technical expertise.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {projects.map((project, index) => (
            <BentoProjectCard
              key={project.id}
              project={project}
              index={index}
              size={getCardSize(index, project)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
