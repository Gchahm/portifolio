'use client'

import React from 'react'
import { Project } from '@/payload-types'
import { Variants } from 'motion'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { cn } from '@/utilities/ui'

const variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: 10,
    transition: {
      duration: 0.2,
    },
  },
}

const growVariant: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
}

export const ProjectCard = (project: Project) => {
  const { title, description, slug, image, githubUrl, demoUrl, stack } = project
  const imageDoc = typeof image === 'object' && image !== null && 'url' in image ? image : null

  return (
    <Card>
      <CardHeader className="pb-3">
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/*<Button*/}
          {/*  variant="ghost"*/}
          {/*  size="icon-sm"*/}
          {/*  onClick={handleLikeClick}*/}
          {/*  disabled={isPending}*/}
          {/*  className="hover:text-red-500"*/}
          {/*>*/}
          {/*  <Heart*/}
          {/*    className={`h-4 w-4 transition-all ${isLiked ? 'fill-red-500 text-red-500' : ''}`}*/}
          {/*  />*/}
          {/*  <span className="ml-1.5">{post.likeCount}</span>*/}
          {/*</Button>*/}
          {/*<div className="flex items-center gap-1.5">*/}
          {/*  <MessageCircle className="h-4 w-4" />*/}
          {/*  <span>{post.commentCount}</span>*/}
          {/*</div>*/}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AnimatedTooltip
            items={
              stack?.map((stack, index) => ({
                id: index,
                name: stack.name || '',
              })) || []
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
