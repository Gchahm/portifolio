'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { GalleryModal } from './GalleryModal'
import type { Project, Media } from '@/payload-types'

interface FlashyProjectCardProps {
  project: Project
  index?: number
}

export const FlashyProjectCard: React.FC<FlashyProjectCardProps> = ({ project, index = 0 }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const imageData = typeof project.image === 'object' ? project.image : null
  const hasGallery = project.gallery && project.gallery.length > 0

  const galleryImages = hasGallery
    ? (project.gallery as { image: string | Media; caption?: string | null }[])
    : imageData
      ? [{ image: project.image as Media, caption: imageData.alt }]
      : []

  const handleGalleryClick = (e: React.MouseEvent) => {
    if (galleryImages.length > 0) {
      e.preventDefault()
      setIsGalleryOpen(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <CardContainer containerClassName="py-8">
          <CardBody className="group/card relative h-auto w-full max-w-sm rounded-xl border border-white/10 bg-gray-900/80 p-6 backdrop-blur-sm md:max-w-md">
            <BackgroundGradient containerClassName="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

            {/* Image section */}
            {imageData?.url && (
              <CardItem
                translateZ={100}
                className="relative mb-4 w-full cursor-pointer overflow-hidden rounded-xl"
                onClick={handleGalleryClick}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={imageData.url}
                    alt={imageData.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                    {hasGallery ? (
                      <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        View Gallery ({galleryImages.length})
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                          <path d="M11 8v6" />
                          <path d="M8 11h6" />
                        </svg>
                        View Image
                      </span>
                    )}
                  </div>
                </div>
              </CardItem>
            )}

            {/* Title */}
            <CardItem translateZ={50} className="mb-2">
              <Link href={`/projects/${project.slug}`} className="group/title">
                <h3 className="text-xl font-bold text-white transition-colors group-hover/title:text-cyan-400">
                  {project.title}
                </h3>
              </Link>
            </CardItem>

            {/* Description */}
            {project.description && (
              <CardItem translateZ={30} className="mb-4">
                <p className="line-clamp-3 text-sm text-gray-400">{project.description}</p>
              </CardItem>
            )}

            {/* Keywords/Tags */}
            {project.keywords && project.keywords.length > 0 && (
              <CardItem translateZ={20} className="mb-4 flex flex-wrap gap-2">
                {project.keywords.slice(0, 4).map((keyword, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-3 py-1 text-xs text-gray-300"
                  >
                    {keyword}
                  </span>
                ))}
              </CardItem>
            )}

            {/* Action buttons */}
            <CardItem translateZ={40} className="flex gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:from-purple-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Learn More
              </Link>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  Demo
                </a>
              )}
            </CardItem>
          </CardBody>
        </CardContainer>
      </motion.div>

      <GalleryModal
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  )
}
