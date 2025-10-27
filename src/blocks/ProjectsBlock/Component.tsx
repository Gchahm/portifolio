import clsx from 'clsx'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ProjectsBlock as ProjectsBlockProps } from '@/payload-types'
import { ProjectCard } from '@/blocks/ProjectsBlock/ProjectCard'

export const ProjectsBlock = async (props: ProjectsBlockProps) => {
  const docs = await queryProjects()

  return (
    <div className={clsx('lg:container')}>
      {props.title}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => (
          <ProjectCard key={index} {...doc} />
        ))}
      </div>
    </div>
  )
}
const queryProjects = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    pagination: false,
    overrideAccess: draft,
  })

  return result.docs
})
