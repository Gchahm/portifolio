import clsx from 'clsx'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { WorkExperience } from '@/payload-types'
import type { WorkExperienceBlock as WorkExperienceBlockProps } from '@/payload-types'

export const WorkExperienceBlock = async (props: WorkExperienceBlockProps) => {
  const docs = await queryWorkExperiences()

  return (
    <div className={clsx('lg:container')}>
      {props.title}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => (
          <WorkExperienceItem key={index} {...doc} />
        ))}
      </div>
    </div>
  )
}

const WorkExperienceItem = (prop: WorkExperience) => {
  const { companyName, jobTitle, startDate, endDate, description } = prop

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{companyName}</h3>
        <p className="text-sm text-gray-500">{jobTitle}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

const queryWorkExperiences = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'work-experiences',
    draft,
    pagination: false,
    overrideAccess: draft,
  })

  return result.docs
})
