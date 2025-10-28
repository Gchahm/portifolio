import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { WorkExperienceBlock as WorkExperienceBlockProps } from '@/payload-types'
import { WorkExperience } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

export const WorkExperienceBlock = async (props: WorkExperienceBlockProps) => {
  const docs = await queryWorkExperiences()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" id="work-experience">
        {props.title}
      </h2>
      <div className="flex flex-col gap-10">
        {docs?.map((doc, index) => (
          <WorkExperienceItem key={index} {...doc} />
        ))}
      </div>
    </div>
  )
}

const WorkExperienceItem = (prop: WorkExperience) => {
  const { companyName, jobTitle, startDate, endDate, description, techStack } = prop

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">{companyName}</h3>
          <p>
            <span className="text-semibold">{jobTitle}</span>
            <span className="text-sm pl-2 text-neutral-400">
              {formatDateTime(startDate, 'mmyy')}
              {endDate ? ` - ${formatDateTime(endDate, 'mmyy')}` : ' - present'}
            </span>
          </p>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
        <div className="flex gap-2">
          <AnimatedTooltip
            items={
              techStack?.map((stack, index) => ({
                id: index,
                name: stack.name || '',
              })) || []
            }
          />
        </div>
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
