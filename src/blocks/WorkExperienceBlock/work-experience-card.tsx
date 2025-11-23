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
      <CardHeader className="pb-3">
        <span className="text-sm pl-2 text-neutral-400">
          {formatDateTime(startDate, 'mmyy')}
          {endDate ? ` - ${formatDateTime(endDate, 'mmyy')}` : ' - present'}
        </span>
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
