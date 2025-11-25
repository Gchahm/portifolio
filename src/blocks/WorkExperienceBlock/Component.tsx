import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { WorkExperienceBlock as WorkExperienceBlockProps, Media } from '@/payload-types'
import { WorkExperienceCard } from './work-experience-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

export const WorkExperienceBlock = async (props: WorkExperienceBlockProps) => {
  const docs = await queryWorkExperiences()
  const { cv } = props

  // Get the CV URL if it exists
  const cvMedia = typeof cv === 'object' ? cv : null
  const cvUrl = cvMedia?.url

  return (
    <>
      <ul className="group/list list-none">
        {docs?.map((doc, index) => (
          <li key={index} className="mb-12">
            <WorkExperienceCard key={index} {...doc} />
          </li>
        ))}
      </ul>

      {cvUrl && (
        <div className="mt-8 flex justify-start">
          <Button asChild variant="link" size="default">
            <Link href={cvUrl} target="_blank" rel="noopener noreferrer">
              View full CV
              <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
      )}
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
