import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { WorkExperienceBlock as WorkExperienceBlockProps } from '@/payload-types'
import { WorkExperience } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

export const WorkExperienceBlock = async (props: WorkExperienceBlockProps) => {
  const docs = await queryWorkExperiences()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" id="work-experience">
        {props.title}
      </h2>
      <div className="flex flex-col gap-4">
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
        <h3 className="text-xl">{companyName}</h3>
        <p className="text-sm">
          {jobTitle}
          <span className="pl-2 text-gray-500">{formatDateTime(startDate, 'mmyy')}</span>
          <span className="text-gray-500">
            {endDate ? ` - ${formatDateTime(endDate, 'mmyy')}` : 'present'}
          </span>
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
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
