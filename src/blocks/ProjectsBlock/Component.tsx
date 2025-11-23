import clsx from 'clsx'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ProjectsBlock as ProjectsBlockProps } from '@/payload-types'
import { ProjectCard } from '@/blocks/ProjectsBlock/project-card'

export const ProjectsBlock = async (props: ProjectsBlockProps) => {
  const docs = await queryProjects()

  return (
    <ul className="group/list list-none">
      {docs?.map((doc, index) => (
        <li key={index} className="mb-12">
          <ProjectCard {...doc} />
        </li>
      ))}
    </ul>
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
