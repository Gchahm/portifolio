'use client'

import React from 'react'
import { Project } from '@/payload-types'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GithubSvg } from '@/components/ui/svgs'
import { Eye } from 'lucide-react'

export const ProjectCard = (project: Project) => {
  const { title, description, slug, image, githubUrl, demoUrl, stack } = project
  const imageDoc = typeof image === 'object' && image !== null && 'url' in image ? image : null

  return (
    <Card>
      <CardHeader className="aspect-video object-cover rounded border-2 border-stone-200/10 transition group-hover:border-stone-200/30 ">
        <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
          <img src={imageDoc?.url || ''} alt={title || ''} className="object-cover max-h-10" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link
          href={`/projects/${slug}`}
          className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
        >
          <CardTitle title={title}>{title}</CardTitle>
        </Link>
        {<CardDescription className="line-clamp-3">{description}</CardDescription>}
        <Separator />
        <div className="flex items-center gap-4 text-sm text-muted-foreground"></div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {stack?.map((item, i) => (
            <Badge>{item.name}</Badge>
          ))}
        </div>
        <div className="flex flex-row-reverse gap-2">
          {demoUrl && (
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Eye />
            </Link>
          )}
          {githubUrl && (
            <Link href={githubUrl}>
              <GithubSvg />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
