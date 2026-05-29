'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion'
import { Music, Brain, X } from 'lucide-react'

type CostumeType = 'snake' | 'dragon' | 'astronaut'

const DEFAULT_SPEECHES = [
  { spk: 'Sochi ☀️', txt: 'Bạn ghé thăm SOLAI là Sochi vui lắm luôn!' },
  { spk: 'Soda 🌙', txt: 'Cần hỗ trợ điền form hay tìm tài nguyên cứ nhấp vào Soda nhé!' },
  { spk: 'Sochi & Soda 🛸', txt: 'Nhấp chuột phải vào tụi mình để mở bảng Hologram bí ẩn!' },
  { spk: 'Soda 🔮', txt: 'SOLAI cung cấp các giải pháp tự động hóa thông minh bậc nhất!' },
]

function getRandomSpeech() {
  return DEFAULT_SPEECHES[Math.floor(Math.random() * DEFAULT_SPEECHES.length)]
}

// Time-aware greeting dialogues declared outside the component to prevent re-creation
function getTimeDialogue() {
  const hours = new Date().getHours()
  if (hours >= 5 && hours < 11) {
    return {
      spk: 'Sochi ☀️',
      txt: 'Chào buổi sáng! Sochi đầy nắng lượng chúc bạn một ngày tràn trề nhiệt huyết nha!',
    }
  } else if (hours >= 11 && hours < 17) {
    return {
      spk: 'Soda 🥤',
      txt: 'Chiều rồi, Soda nhắc bạn uống nước hoặc làm ly trà sữa để nạp năng lượng nhé!',
    }
  } else if (hours >= 17 && hours < 22) {
    return {
      spk: 'Sochi 🌄',
      txt: 'Trời chập tối rồi. Sochi tính rủ Soda đi ăn tối đây, bạn cũng nghỉ ngơi xíu đi!',
    }
  } else {
    return {
      spk: 'Soda 🌙',
      txt: 'Khuya quá rồi đó nha! Đừng lo, Soda & Sochi sẽ thức canh và diệt bug giúp bạn.',
    }
  }
}

export function MascotWidget() {
  const [dialogue, setDialogue] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<string | null>(null)
  const [costume, setCostume] = useState<CostumeType>('snake')
  const [isDizzy, setIsDizzy] = useState(false)
  const [isSuper, setIsSuper] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notes, setNotes] = useState<{ id: number; x: number; y: number }[]>([])
  const [mathNotes, setMathNotes] = useState<{ id: number; x: number; y: number; text: string }[]>([])

  // Sochi position motion values
  const sochiX = useMotionValue(-55)
  const sochiY = useMotionValue(-8)
  const springSochiX = useSpring(sochiX, { stiffness: 180, damping: 15 })
  const springSochiY = useSpring(sochiY, { stiffness: 180, damping: 15 })

  // Soda position motion values
  const sodaX = useMotionValue(55)
  const sodaY = useMotionValue(8)
  const springSodaX = useSpring(sodaX, { stiffness: 120, damping: 14 })
  const springSodaY = useSpring(sodaY, { stiffness: 120, damping: 14 })

  // Sochi 3D rotation motion values
  const sochiRotateX = useMotionValue(0)
  const sochiRotateY = useMotionValue(0)
  const springSochiRotateX = useSpring(sochiRotateX, { stiffness: 150, damping: 15 })
  const springSochiRotateY = useSpring(sochiRotateY, { stiffness: 150, damping: 15 })

  // Soda 3D rotation motion values
  const sodaRotateX = useMotionValue(0)
  const sodaRotateY = useMotionValue(0)
  const springSodaRotateX = useSpring(sodaRotateX, { stiffness: 150, damping: 15 })
  const springSodaRotateY = useSpring(sodaRotateY, { stiffness: 150, damping: 15 })

  // Sochi drag motion values
  const sochiDragX = useMotionValue(0)
  const sochiDragY = useMotionValue(0)

  // Soda drag motion values
  const sodaDragX = useMotionValue(0)
  const sodaDragY = useMotionValue(0)

  // Drag physics tracking
  const widgetRef = useRef<HTMLDivElement>(null)
  const [isDraggingSochi, setIsDraggingSochi] = useState(false)
  const [isDraggingSoda, setIsDraggingSoda] = useState(false)
  const isDragging = isDraggingSochi || isDraggingSoda

  // Double Click / Click counter for Dizzy
  const clickCount = useRef(0)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)

  // Idle tracking
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  const [isIdle, setIsIdle] = useState(false)
  const [idleAction, setIdleAction] = useState<'sleep' | 'rps' | null>(null)

  // 1. Confetti helper declared first to avoid hoisting issues
  const triggerConfetti = useCallback(() => {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute pointer-events-none'
      particle.style.width = `${Math.random() * 8 + 4}px`
      particle.style.height = `${Math.random() * 8 + 4}px`
      particle.style.borderRadius = '50%'
      const colors = ['#8b5cf6', '#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#10b981']
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.boxShadow = '0 0 10px rgba(255,255,255,0.8)'

      if (widgetRef.current) {
        widgetRef.current.appendChild(particle)
        const animation = particle.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
              transform: `translate(${(Math.random() - 0.5) * 200}px, ${-(Math.random() * 150 + 100)}px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 1500,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
          }
        )
        animation.onfinish = () => particle.remove()
      }
    }
  }, [])

  // 2. Super Mode declared next
  const triggerSuperMode = useCallback(() => {
    setIsSuper(true)
    setSpeaker('Super Sochi & Soda 🔥')
    setDialogue('KÍCH HOẠT CHẾ ĐỘ SUPER TWINS! Sức mạnh AI tối thượng tăng 999%!')
    triggerConfetti()
    setTimeout(() => {
      setIsSuper(false)
      setSpeaker('Sochi & Soda ⚡')
      setDialogue('Chế độ Super Twins đã hoàn tất. Cảm ơn bạn!')
    }, 6000)
  }, [triggerConfetti])

  // 3. Idle action helper
  const triggerIdleAction = useCallback(() => {
    const isRps = Math.random() > 0.5
    if (isRps) {
      setIdleAction('rps')
      setSpeaker('Sochi ✊✌️✋')
      setDialogue('Soda ơi! Oẳn tù tì không?')
      setTimeout(() => {
        const moves = ['✊', '✌️', '✋']
        const sochiMove = moves[Math.floor(Math.random() * 3)]
        const sodaMove = moves[Math.floor(Math.random() * 3)]
        setSpeaker('Sochi & Soda ✊✌️✋')
        setDialogue(`Sochi ra ${sochiMove}, Soda ra ${sodaMove}. ${sochiMove === sodaMove ? 'Hòa nhau rồi!' : 'Có người thắng rồi nha! 🎉'}`)
      }, 3000)
    } else {
      setIdleAction('sleep')
      setSpeaker('Sochi 💤')
      setDialogue('Zzz... Sochi ngủ gật xíu...')
      setTimeout(() => {
        setSpeaker('Soda 🤫')
        setDialogue('Sochi ơi dậy thôi! Khách đang xem website kìa!')
        setTimeout(() => {
          setSpeaker('Sochi ⚡')
          setDialogue('Á! Sochi tỉnh rồi, Sochi không ngủ gật nữa đâu!')
        }, 3000)
      }, 3000)
    }
  }, [])

  // 4. Reset idle timer helper
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    setIdleAction(null)
    if (idleTimer.current) clearTimeout(idleTimer.current)

    idleTimer.current = setTimeout(() => {
      setIsIdle(true)
      triggerIdleAction()
    }, 20000) // 20s idle
  }, [triggerIdleAction])

  // 3D Flying orbit simulation loop
  useEffect(() => {
    let frame = 0
    let active = true

    const animateLoop = () => {
      if (!active) return
      frame += 0.015

      // Sochi and Soda orbit independently when not being dragged
      if (!isDraggingSochi) {
        // Sochi floats in a slow figure-8/Lissajous path on the left
        const targetSochiX = Math.sin(frame) * 16 - 55
        const targetSochiY = Math.cos(frame * 1.3) * 10 - 8
        sochiX.set(targetSochiX)
        sochiY.set(targetSochiY)
      }

      if (!isDraggingSoda) {
        // Soda floats in a slightly different phase and offset on the right
        const targetSodaX = Math.sin(frame * 1.1 + Math.PI) * 16 + 55
        const targetSodaY = Math.cos(frame * 0.7) * 10 + 8
        sodaX.set(targetSodaX)
        sodaY.set(targetSodaY)
      }

      requestAnimationFrame(animateLoop)
    }

    animateLoop()
    return () => { active = false }
  }, [isDraggingSochi, isDraggingSoda, sochiX, sochiY, sodaX, sodaY])

  // Set initial greeting and handle custom events
  useEffect(() => {
    const greeting = getTimeDialogue()
    const timer = setTimeout(() => {
      setSpeaker(greeting.spk)
      setDialogue(greeting.txt)
    }, 0)
    const idleTimerDefer = setTimeout(() => {
      resetIdleTimer()
    }, 0)

    const handleFocusEvent = (e: Event) => {
      resetIdleTimer()
      const customEvent = e as CustomEvent<{ field: string }>
      const field = customEvent.detail?.field
      if (field === 'name') {
        setSpeaker('Sochi 🔎')
        setDialogue('Tên của bạn đẹp quá! Cho Sochi làm quen nha!')
      } else if (field === 'email') {
        setSpeaker('Soda ✉️')
        setDialogue('Nhớ điền đúng email để tụi mình gửi thư hồi đáp trong 24 giờ nhé!')
      } else if (field === 'message') {
        setSpeaker('Sochi & Soda 📝')
        setDialogue('Bạn muốn nhắn gửi điều gì? Tụi mình đang chăm chú lắng nghe đây!')
      }
    }

    const handleFormSubmitSuccess = () => {
      setSpeaker('Sochi & Soda 🎉')
      setDialogue('Gửi tin nhắn thành công rồi! Đợi tụi mình phản hồi nha, chúc mừng bạn!')
      triggerConfetti()
    }

    window.addEventListener('solaiFormFocus', handleFocusEvent)
    window.addEventListener('solaiFormSuccess', handleFormSubmitSuccess)

    return () => {
      clearTimeout(timer)
      clearTimeout(idleTimerDefer)
      window.removeEventListener('solaiFormFocus', handleFocusEvent)
      window.removeEventListener('solaiFormSuccess', handleFormSubmitSuccess)
      if (clickTimer.current) clearTimeout(clickTimer.current)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [resetIdleTimer, triggerConfetti])

  // Keyboard Easter Eggs
  useEffect(() => {
    let keysPressed = ''
    const handleKeyDown = (e: KeyboardEvent) => {
      resetIdleTimer()
      keysPressed += e.key.toLowerCase()
      if (keysPressed.endsWith('solai') || keysPressed.endsWith('twins')) {
        triggerSuperMode()
        keysPressed = ''
      }
      if (keysPressed.length > 20) keysPressed = keysPressed.slice(-10)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [resetIdleTimer, triggerSuperMode])

  // 3D Look-at mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging || isDizzy || menuOpen) return
      const widget = widgetRef.current
      if (!widget) return
      
      const rect = widget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 800) {
        // Tilt Sochi slightly faster
        sochiRotateX.set(-Math.min(Math.max(dy / 30, -15), 15))
        sochiRotateY.set(Math.min(Math.max(dx / 30, -15), 15))
        
        // Tilt Soda slightly slower
        sodaRotateX.set(-Math.min(Math.max(dy / 45, -12), 12))
        sodaRotateY.set(Math.min(Math.max(dx / 45, -12), 12))
      } else {
        sochiRotateX.set(0)
        sochiRotateY.set(0)
        sodaRotateX.set(0)
        sodaRotateY.set(0)
      }
    }

    const handleMouseLeave = () => {
      sochiRotateX.set(0)
      sochiRotateY.set(0)
      sodaRotateX.set(0)
      sodaRotateY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDragging, isDizzy, menuOpen, sochiRotateX, sochiRotateY, sodaRotateX, sodaRotateY])

  // Trigger Dizzy Easter Egg
  const triggerDizzyMode = useCallback(() => {
    setIsDizzy(true)
    setSpeaker('Sochi & Soda 😵')
    setDialogue('Ui da, chóng mặt quá! Đầu óc tụi mình xoay mòng mòng luôn rồi! @ @')
    setTimeout(() => {
      setIsDizzy(false)
      setSpeaker('Sochi 🌸')
      setDialogue('Phù, tụi mình tỉnh táo lại rồi. Đừng trêu tụi mình nữa nhé!')
    }, 5000)
  }, [])

  // Click behavior (dialogue trigger & dizzy check)
  const handleWidgetClick = useCallback(() => {
    resetIdleTimer()
    if (isDragging) return

    // Click counter dizzy
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 3000)

    if (clickCount.current >= 5) {
      triggerDizzyMode()
      return
    }

    // Toggle default speech
    if (menuOpen) return
    const chosen = getRandomSpeech()
    setSpeaker(chosen.spk)
    setDialogue(chosen.txt)
  }, [isDragging, menuOpen, resetIdleTimer, triggerDizzyMode])

  // Custom menu interactions
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
    resetIdleTimer()
  }

  const triggerSing = () => {
    setSpeaker('Sochi 🎵')
    setDialogue('La la la~ SOLAI kết nối tương lai~ Cùng bạn vươn xa tầm nhìn~ 🎶')
    // Generate floating musical notes
    const newNotes = Array.from({ length: 5 }, (_, i) => ({
      id: Math.random() + i,
      x: Math.random() * 80 - 40,
      y: -30 - Math.random() * 60,
    }))
    setNotes(newNotes)
    setTimeout(() => setNotes([]), 2000)
    setMenuOpen(false)
  }

  const triggerCompute = () => {
    setSpeaker('Soda 🧠')
    setDialogue('Đang giải mã ma trận thuật toán AI... Đã tối ưu 1 + 1 = Cặp song sinh siêu quậy!')
    const mathSymbols = ['01', '10', 'f(x)', '√x', '∑', 'π', '∞']
    const newMathNotes = Array.from({ length: 6 }, (_, i) => ({
      id: Math.random() + i,
      x: Math.random() * 80 - 40,
      y: -30 - Math.random() * 60,
      text: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
    }))
    setMathNotes(newMathNotes)
    setTimeout(() => setMathNotes([]), 2000)
    setMenuOpen(false)
  }

  const handleCostumeChange = (type: CostumeType) => {
    setCostume(type)
    resetIdleTimer()
    setSpeaker('Sochi & Soda 👕')
    if (type === 'snake') {
      setDialogue('Tụi mình đã mặc Hoodie Rắn ôm ấm cúng rồi nè! 🐍')
    } else if (type === 'dragon') {
      setDialogue('Hoodie Rồng Lửa siêu ngầu kích hoạt! Sẵn sàng bay nhảy! 🐉')
    } else {
      setDialogue('Trang phục Phi Hành Gia vũ trụ kết nối trung tâm điều khiển! 🧑‍🚀')
    }
    setMenuOpen(false)
  }

  // Costume style filter properties
  const getCostumeFilter = () => {
    if (isSuper) return 'hue-rotate(180deg) saturate(1.8) contrast(1.2)'
    if (costume === 'dragon') return 'hue-rotate(280deg) saturate(1.3)'
    if (costume === 'astronaut') return 'hue-rotate(120deg) brightness(1.1) saturate(1.2)'
    return 'none'
  }

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-40 select-none pointer-events-none w-72 h-32 relative">
      {/* Dialogue chat bubble */}
      <AnimatePresence>
        {dialogue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64 bg-slate-900/90 border border-indigo-500/25 p-3 rounded-2xl shadow-2xl backdrop-blur-md z-50 pointer-events-auto cursor-default"
          >
            {/* Speaker name */}
            <div className="text-[10px] font-black tracking-wider uppercase text-indigo-400 mb-1">
              {speaker}
            </div>
            {/* Text message */}
            <p className="text-xs text-white leading-relaxed">{dialogue}</p>
            {/* Close button */}
            <button
              onClick={() => setDialogue(null)}
              className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
            {/* Bubble arrow pointing down */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-indigo-500/25 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hologram Menu Layer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 w-44 bg-[#0a0b16]/95 border border-cyan-500/30 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl z-50 pointer-events-auto flex flex-col gap-1.5 text-xs text-white"
          >
            <div className="text-[9px] font-black uppercase tracking-wider text-cyan-400 border-b border-white/5 pb-1 flex justify-between items-center">
              <span>Hologram Twins</span>
              <button onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={10} />
              </button>
            </div>

            {/* Action: Sing */}
            <button
              onClick={triggerSing}
              className="flex items-center gap-2 w-full p-1.5 rounded-lg hover:bg-indigo-500/20 text-left transition-colors"
            >
              <Music size={12} className="text-indigo-400" />
              <span>Yêu cầu Sochi hát</span>
            </button>

            {/* Action: Compute */}
            <button
              onClick={triggerCompute}
              className="flex items-center gap-2 w-full p-1.5 rounded-lg hover:bg-indigo-500/20 text-left transition-colors"
            >
              <Brain size={12} className="text-pink-400" />
              <span>Soda làm toán AI</span>
            </button>

            {/* Costume Sub-options Header */}
            <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 border-t border-white/5 pt-1.5">
              Thay đổi trang phục
            </div>

            {/* Costume Options Grid */}
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleCostumeChange('snake')}
                className={`p-1 rounded text-[9px] border text-center transition-all ${
                  costume === 'snake'
                    ? 'border-indigo-500 bg-indigo-500/20 text-white'
                    : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Rắn 🐍
              </button>
              <button
                onClick={() => handleCostumeChange('dragon')}
                className={`p-1 rounded text-[9px] border text-center transition-all ${
                  costume === 'dragon'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Rồng 🐉
              </button>
              <button
                onClick={() => handleCostumeChange('astronaut')}
                className={`p-1 rounded text-[9px] border text-center transition-all ${
                  costume === 'astronaut'
                    ? 'border-cyan-500 bg-cyan-500/20 text-white'
                    : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Trũ 🧑‍🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sochi (Left Twin) */}
      <motion.div
        style={{
          x: springSochiX,
          y: springSochiY,
          position: 'absolute',
          left: 'calc(50% - 40px)',
          top: 'calc(50% - 80px)',
          transformStyle: 'preserve-3d',
        }}
        className="w-20 h-40 pointer-events-none"
      >
        <motion.div
          drag
          dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
          onDragStart={() => {
            setIsDraggingSochi(true)
            setSpeaker('Sochi ☀️')
            setDialogue('Vút... Sochi đang bay bồng bềnh!')
          }}
          onDragEnd={(e, info) => {
            setIsDraggingSochi(false)
            animate(sochiDragX, 0, { type: 'spring', stiffness: 300, damping: 20 })
            animate(sochiDragY, 0, { type: 'spring', stiffness: 300, damping: 20 })
            if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
              setSpeaker('Sochi 🚀')
              setDialogue('Aaa! Sochi bay cao quá, đáp đất an toàn rồi nha!')
            }
          }}
          style={{
            x: sochiDragX,
            y: sochiDragY,
            rotateX: isDizzy ? undefined : springSochiRotateX,
            rotateY: isDizzy ? undefined : springSochiRotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          animate={{
            ...(isDizzy ? {
              rotateX: [0, 15, -15, 15, 0],
              rotateY: [0, -15, 15, -15, 0]
            } : {}),
            scale: isDraggingSochi ? 1.15 : isSuper ? 1.25 : 1,
            y: isIdle && idleAction === 'sleep' ? [0, 4, 0] : 0,
          }}
          transition={
            isDizzy
              ? { duration: 1, repeat: Infinity }
              : isIdle && idleAction === 'sleep'
              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 200, damping: 15 }
          }
          onContextMenu={handleRightClick}
          onClick={handleWidgetClick}
          className="w-full h-full relative cursor-grab active:cursor-grabbing pointer-events-auto origin-center"
        >
          {/* Glowing aura under Sochi */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{
              background: isSuper
                ? 'radial-gradient(circle, #f43f5e 0%, transparent 70%)'
                : costume === 'dragon'
                ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
                : costume === 'astronaut'
                ? 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
                : 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            }}
          />

          {/* Sochi Cropped Image using background-image */}
          <div
            className="relative w-full h-full transition-transform duration-300"
            style={{
              backgroundImage: 'url(/sochi_soda.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              filter: getCostumeFilter(),
            }}
          />

          {/* Dizzy overlay eyes */}
          {isDizzy && (
            <div className="absolute top-[30%] left-[25%] right-[25%] h-4 flex justify-center pointer-events-none z-10">
              <span className="text-[10px] font-bold text-yellow-400 bg-black/60 rounded px-0.5">@ @</span>
            </div>
          )}

          {/* Floating Musical Notes */}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, x: note.x, y: note.y, scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute text-cyan-400 text-sm font-bold pointer-events-none"
              style={{ left: '40%', top: '20%' }}
            >
              🎵
            </motion.div>
          ))}

          {/* Super Twins sparks */}
          {isSuper && (
            <motion.div
              className="absolute -inset-2 border border-rose-500/40 rounded-full pointer-events-none"
              animate={{ scale: [1.0, 1.2, 1.0], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Soda (Right Twin) */}
      <motion.div
        style={{
          x: springSodaX,
          y: springSodaY,
          position: 'absolute',
          left: 'calc(50% - 40px)',
          top: 'calc(50% - 80px)',
          transformStyle: 'preserve-3d',
        }}
        className="w-20 h-40 pointer-events-none"
      >
        <motion.div
          drag
          dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
          onDragStart={() => {
            setIsDraggingSoda(true)
            setSpeaker('Soda 🌙')
            setDialogue('Vút... Soda đang bay lượn lờ!')
          }}
          onDragEnd={(e, info) => {
            setIsDraggingSoda(false)
            animate(sodaDragX, 0, { type: 'spring', stiffness: 300, damping: 20 })
            animate(sodaDragY, 0, { type: 'spring', stiffness: 300, damping: 20 })
            if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
              setSpeaker('Soda 🚀')
              setDialogue('Aaa! Soda tiếp đất an toàn rồi phè phỡn ghê~')
            }
          }}
          style={{
            x: sodaDragX,
            y: sodaDragY,
            rotateX: isDizzy ? undefined : springSodaRotateX,
            rotateY: isDizzy ? undefined : springSodaRotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          animate={{
            ...(isDizzy ? {
              rotateX: [0, 15, -15, 15, 0],
              rotateY: [0, -15, 15, -15, 0]
            } : {}),
            scale: isDraggingSoda ? 1.15 : isSuper ? 1.25 : 1,
            y: isIdle && idleAction === 'sleep' ? [0, 4, 0] : 0,
          }}
          transition={
            isDizzy
              ? { duration: 1, repeat: Infinity }
              : isIdle && idleAction === 'sleep'
              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 200, damping: 15 }
          }
          onContextMenu={handleRightClick}
          onClick={handleWidgetClick}
          className="w-full h-full relative cursor-grab active:cursor-grabbing pointer-events-auto origin-center"
        >
          {/* Glowing aura under Soda */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{
              background: isSuper
                ? 'radial-gradient(circle, #f43f5e 0%, transparent 70%)'
                : costume === 'dragon'
                ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
                : costume === 'astronaut'
                ? 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
                : 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            }}
          />

          {/* Soda Cropped Image using background-image */}
          <div
            className="relative w-full h-full transition-transform duration-300"
            style={{
              backgroundImage: 'url(/sochi_soda.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              filter: getCostumeFilter(),
            }}
          />

          {/* Dizzy overlay eyes */}
          {isDizzy && (
            <div className="absolute top-[30%] left-[25%] right-[25%] h-4 flex justify-center pointer-events-none z-10">
              <span className="text-[10px] font-bold text-yellow-400 bg-black/60 rounded px-0.5">@ @</span>
            </div>
          )}

          {/* Floating Math Symbols */}
          {mathNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, x: note.x, y: note.y, scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute text-emerald-400 text-xs font-mono font-bold pointer-events-none"
              style={{ left: '40%', top: '20%' }}
            >
              {note.text}
            </motion.div>
          ))}

          {/* Super Twins sparks */}
          {isSuper && (
            <motion.div
              className="absolute -inset-2 border border-rose-500/40 rounded-full pointer-events-none"
              animate={{ scale: [1.0, 1.2, 1.0], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
