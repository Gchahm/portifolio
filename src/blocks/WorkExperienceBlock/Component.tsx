import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { WorkExperienceBlock as WorkExperienceBlockProps } from '@/payload-types'
import { WorkExperienceCard } from './work-experience-card'

export const WorkExperienceBlock = async (props: WorkExperienceBlockProps) => {
  const docs = await queryWorkExperiences()

  return (
    <>
      <ul className="group/list list-none">
        {docs?.map((doc, index) => (
          <li key={index} className="mb-12">
            <WorkExperienceCard key={index} {...doc} />
          </li>
        ))}
      </ul>
    </>
  )
}

const queryWorkExperiences = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'work-experiences',
    pagination: false,
  })

  return result.docs
})
