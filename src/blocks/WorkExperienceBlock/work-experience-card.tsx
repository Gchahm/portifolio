'use client'

import React from 'react'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WorkExperience } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

export const WorkExperienceCard = (prop: WorkExperience) => {
  const { companyName, jobTitle, startDate, endDate, description, keywords } = prop

  return (
    <Card>
      <CardHeader className="pb-3 text-sm pl-2 text-neutral-400 flex flex-col justify-around items-center">
        <span>{endDate ? `${formatDateTime(endDate, 'yymm')}` : 'present'}</span>
        <span className="grow w-0.5 bg-neutral-400"/>
        <span>{formatDateTime(startDate, 'yymm')}</span>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardTitle>
          {jobTitle} - {companyName}
        </CardTitle>
        {<CardDescription className="line-clamp-3">{description}</CardDescription>}
        <Separator />
        <ul className="flex flex-wrap gap-2">
          {keywords?.map((item, i) => (
            <li key={i}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
