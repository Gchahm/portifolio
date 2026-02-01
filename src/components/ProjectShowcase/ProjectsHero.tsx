'use client'

import React from 'react'
import { motion } from 'motion/react'

export const ProjectsHero: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] overflow-hidden flex items-center justify-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Portfolio Projects
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-white">Building the </span>
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              future
            </span>
            {/* Underline glow */}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span>
          <br />
          <span className="text-white">one project at a time</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          From concept to deployment. Explore a collection of projects
          that push boundaries and solve real problems.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="h-2 w-1 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
