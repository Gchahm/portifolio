'use client'

import React from 'react'
import { Project } from '@/payload-types'
import { motion } from 'motion/react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Variants } from 'motion'
import StackIcon from 'tech-stack-icons'

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
      className="relative h-full rounded-2xl hover:border-2 p-2 md:rounded-3xl md:p-3"
    >
      {imageDoc && (
        <motion.div
          variants={growVariant}
          className="relative w-full h-48 overflow-hidden rounded bg-neutral-900">
          <img src={imageDoc?.url || ''} alt={title || ''} className="object-cover" />
        </motion.div>
      )}
      <motion.div variants={variants} className="flex flex-col gap-2">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </motion.div>
      {(githubUrl || demoUrl) && (
        <div className="flex gap-3">
          {githubUrl && (
            <a className="text-sm underline" href={githubUrl} target="_blank" rel="noreferrer">
              <StackIcon name="github" className="h-4 w-4" />
            </a>
          )}
          {demoUrl && (
            <a className="text-sm underline" href={demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
        </div>
      )}
      {Array.isArray(stack) && stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {stack.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
            >
              {s?.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

const ProjectCardBody = ({ children }: React.PropsWithChildren) => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
      <motion.div variants={variants} className="flex flex-col">
        {children}
      </motion.div>
    </motion.div>
  )
}
