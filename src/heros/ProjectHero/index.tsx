import React from 'react'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { title, description, image, stack, githubUrl, demoUrl } = project

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          {description && (
            <p className="text-lg mb-6 max-w-2xl">{description}</p>
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                GitHub
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>

          {stack && stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {image && typeof image !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={image} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
