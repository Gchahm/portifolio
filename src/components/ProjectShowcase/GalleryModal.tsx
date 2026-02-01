'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Media } from '@/payload-types'
import Image from 'next/image'

type GalleryImage = {
  image: string | Media
  caption?: string | null
}

interface GalleryModalProps {
  images: GalleryImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goToNext, goToPrevious, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    setTouchStart(null)
  }

  const currentImage = images[currentIndex]
  const imageData = typeof currentImage?.image === 'object' ? currentImage.image : null

  if (!imageData?.url) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Image container */}
          <motion.div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={imageData.url}
              alt={imageData.alt || currentImage.caption || 'Gallery image'}
              width={imageData.width || 1200}
              height={imageData.height || 800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />

            {/* Caption */}
            {currentImage.caption && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-4 pt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-center text-white">{currentImage.caption}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
