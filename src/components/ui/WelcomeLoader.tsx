'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface WelcomeLoaderProps {
  onComplete: () => void
}

export function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [phase, setPhase] = useState<number>(0) // 0: Vortex, 1: Mascot & Laser, 2: Logo Reveal, 3: Completed
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  useEffect(() => {
    // Check session storage to see if preloader has already been shown
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('solai_preloader_seen')
      if (seen === 'true') {
        onComplete()
      } else {
        setTimeout(() => setShouldRender(true), 0)
      }
    }
  }, [onComplete])

  useEffect(() => {
    if (!shouldRender) return

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 1000) // Mascot enters + Laser scan
    const t2 = setTimeout(() => setPhase(2), 2600) // Logo reveal
    const t3 = setTimeout(() => {
      setPhase(3)
      sessionStorage.setItem('solai_preloader_seen', 'true')
      // Let the exit animation finish before calling onComplete
      setTimeout(onComplete, 800)
    }, 4500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [shouldRender, onComplete])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Phase 0: Vortex Portal */}
          <div className="relative flex items-center justify-center w-72 h-72">
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-indigo-500/20"
              style={{
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.1), inset 0 0 40px rgba(99, 102, 241, 0.05)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-56 h-56 rounded-full border border-dashed border-cyan-500/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-48 h-48 rounded-full border border-violet-500/10"
              style={{
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.15)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glowing Vortex Core */}
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 blur-xl opacity-20"
              animate={{
                scale: [1, 1.2, 0.9, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Phase 1 & 2: Mascot Presentation */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  className="absolute z-10 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className="relative w-36 h-36">
                    <Image
                      src="/sochi_soda.png"
                      alt="Sochi & Soda Mascot"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                  {/* Floating Chibi Hello bubble */}
                  <motion.div
                    className="absolute -top-6 rounded-xl bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 text-[10px] font-bold text-indigo-200 backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Hi! Sochi & Soda chào bạn! 👋
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phase 1: Dual Laser Beam Scanning Effect */}
          {phase === 1 && (
            <>
              {/* Sochi's Gold Laser */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent z-20"
                style={{
                  boxShadow: '0 0 15px #f59e0b, 0 0 30px #f59e0b',
                }}
                initial={{ top: '35%' }}
                animate={{ top: ['35%', '65%', '35%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Soda's Cyan Laser */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20"
                style={{
                  boxShadow: '0 0 15px #06b6d4, 0 0 30px #06b6d4',
                }}
                initial={{ top: '65%' }}
                animate={{ top: ['65%', '35%', '65%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}

          {/* Phase 2: Logo Reveal */}
          <div className="mt-8 h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-1"
                >
                  <h2 className="text-3xl font-black tracking-[0.2em] text-white">
                    SOL
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AI
                    </span>
                  </h2>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                    Connected intelligence
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phase 3 transition scanline overlay */}
          <motion.div
            className="absolute inset-0 bg-[#6366f1]/5 pointer-events-none z-30"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={phase >= 2 ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      )}

      {/* Screen Sweep Line at exit */}
      {phase === 3 && (
        <motion.div
          className="fixed inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-[60] pointer-events-none"
          style={{
            boxShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee',
          }}
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  )
}
