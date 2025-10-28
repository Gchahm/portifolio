'use client'

import React from 'react'
import { Project } from '@/payload-types'
import { motion } from 'motion/react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Variants } from 'motion'
import StackIcon from 'tech-stack-icons'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { IsolatedIcon } from '@/components/ui/isolated-icon'

const variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: 10,
    transition: {
      duration: 0.2,
    },
  },
}

const growVariant: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
}

export const ProjectCard = (project: Project) => {
  const { title, description, image, githubUrl, demoUrl, stack } = project
  const imageDoc = typeof image === 'object' && image !== null && 'url' in image ? image : null

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="relative h-full rounded-2xl border-2 border-transparent hover:border-border p-2 md:rounded-3xl md:p-3 flex flex-col gap-4"
    >
      {(githubUrl || demoUrl) && (
        <div className="flex gap-3">
          {githubUrl && (
            <a className="text-sm underline" href={githubUrl} target="_blank" rel="noreferrer">
              <IsolatedIcon name="github" className="h-6 w-6" />
            </a>
          )}
          {demoUrl && (
            <a className="text-sm underline" href={demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
        </div>
      )}
      {imageDoc && (
        <motion.div
          variants={growVariant}
          className="relative w-full h-48 overflow-hidden rounded bg-neutral-900"
        >
          <img src={imageDoc?.url || ''} alt={title || ''} className="object-cover" />
        </motion.div>
      )}
      <motion.div variants={variants} className="flex flex-col gap-2">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </motion.div>
      <AnimatedTooltip
        items={
          stack?.map((stack, index) => ({
            id: index,
            name: stack.name || '',
          })) || []
        }
      />
    </motion.div>
  )
}
