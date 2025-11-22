import clsx from 'clsx'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ProjectsBlock as ProjectsBlockProps } from '@/payload-types'
import { ProjectCard } from '@/blocks/ProjectsBlock/project-card'

export const ProjectsBlock = async (props: ProjectsBlockProps) => {
  const docs = await queryProjects()

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {props.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
        {docs?.map((doc, index) => (
          <ProjectCard key={index} {...doc} />
        ))}
      </div>
    </>
  )
}
const queryProjects = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    pagination: false,
  })

  return result.docs
})
