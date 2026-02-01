'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { Project } from '@/payload-types'
import { GalleryModal } from './GalleryModal'
import type { Media } from '@/payload-types'

interface BentoProjectCardProps {
  project: Project
  index: number
  size?: 'large' | 'medium' | 'small'
}

export const BentoProjectCard: React.FC<BentoProjectCardProps> = ({
  project,
  index,
  size = 'medium',
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const imageData = typeof project.image === 'object' ? project.image : null
  const hasGallery = project.gallery && project.gallery.length > 0

  const galleryImages = hasGallery
    ? (project.gallery as { image: string | Media; caption?: string | null }[])
    : imageData
      ? [{ image: project.image as Media, caption: imageData.alt }]
      : []

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  }

  const imageHeights = {
    large: 'h-64 md:h-80',
    medium: 'h-48',
    small: 'h-40',
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`group relative ${sizeClasses[size]}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card container */}
        <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
          {/* Spotlight effect */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: isHovered
                ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`
                : '',
            }}
          />

          {/* Border gradient on hover */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: isHovered
                ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.4), transparent 40%)`
                : '',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />

          <div className="relative h-full p-1">
            {/* Image */}
            {imageData?.url && (
              <div
                className={`relative ${imageHeights[size]} w-full overflow-hidden rounded-xl cursor-pointer`}
                onClick={() => galleryImages.length > 0 && setIsGalleryOpen(true)}
              >
                <Image
                  src={imageData.url}
                  alt={imageData.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={size === 'large' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Gallery indicator */}
                {hasGallery && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
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
                    {galleryImages.length}
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              {/* Tags */}
              {project.keywords && project.keywords.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.keywords.slice(0, size === 'large' ? 4 : 2).map((keyword, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-400"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <Link href={`/projects/${project.slug}`} className="group/link">
                <h3
                  className={`font-semibold text-white transition-colors group-hover/link:text-indigo-400 ${
                    size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                  }`}
                >
                  {project.title}
                </h3>
              </Link>

              {/* Description */}
              {project.description && (
                <p
                  className={`mt-2 text-gray-400 ${
                    size === 'large' ? 'line-clamp-4 text-base' : 'line-clamp-2 text-sm'
                  }`}
                >
                  {project.description}
                </p>
              )}

              {/* Action links */}
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  View Project
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
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                    Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <GalleryModal
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  )
}
