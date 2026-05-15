'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  phrases: string[]
  interval?: number
  className?: string
}

export function AnimatedText({ phrases, interval = 3000, className }: AnimatedTextProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, interval)
    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <span
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'inline-block',
      }}
    >
      {phrases[index]}
    </span>
  )
}
