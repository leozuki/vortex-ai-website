'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Brain, X, Shield, Sparkles, MessageSquare } from 'lucide-react'

type CostumeType = 'snake' | 'dragon' | 'astronaut'

const DEFAULT_SPEECHES = [
  { spk: 'Sochi ☀️', txt: 'Bạn ghé thăm SOLAI là Sochi vui lắm luôn!' },
  { spk: 'Soda 🌙', txt: 'Cần hỗ trợ tìm tài nguyên cứ hỏi Soda nhé!' },
  { spk: 'Sochi & Soda 🛸', txt: 'Bấm vào tụi mình để khám phá bảng Hologram bí ẩn!' },
  { spk: 'Soda 🔮', txt: 'SOLAI cung cấp các giải pháp tự động hóa thông minh bậc nhất!' },
]

function getRandomSpeech(mascot?: 'sochi' | 'soda') {
  if (mascot === 'sochi') {
    const sochiMsgs = [
      { spk: 'Sochi ☀️', txt: 'Sochi đang rất hào hứng giúp bạn đây!' },
      { spk: 'Sochi 🎵', txt: 'Sochi thích hát hò lắm, click chọn Sing thử xem!' },
      { spk: 'Sochi ⚡', txt: 'Cần hỏi gì cứ gõ vào form nha!' }
    ]
    return sochiMsgs[Math.floor(Math.random() * sochiMsgs.length)]
  }
  if (mascot === 'soda') {
    const sodaMsgs = [
      { spk: 'Soda 🌙', txt: 'Soda luôn sẵn sàng tính toán mọi thuật toán!' },
      { spk: 'Soda 🧠', txt: 'Cần phân tích dữ liệu à? Để Soda lo hết cho nha!' },
      { spk: 'Soda 🔮', txt: 'Thử thách Soda làm toán AI xem nào!' }
    ]
    return sodaMsgs[Math.floor(Math.random() * sodaMsgs.length)]
  }
  return DEFAULT_SPEECHES[Math.floor(Math.random() * DEFAULT_SPEECHES.length)]
}

function getTimeDialogue() {
  const hours = new Date().getHours()
  if (hours >= 5 && hours < 11) {
    return {
      spk: 'Sochi ☀️',
      txt: 'Chào buổi sáng! Sochi đầy năng lượng chúc bạn một ngày mới tuyệt vời nhé!',
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

interface GlobalMascotsProps {
  scrollProgress: any
  isMobile: boolean
}

export function GlobalMascots({ scrollProgress, isMobile }: GlobalMascotsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogue, setDialogue] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<string | null>(null)
  const [costume, setCostume] = useState<CostumeType>('snake')
  const [isSuper, setIsSuper] = useState(false)
  const [isDizzy, setIsDizzy] = useState(false)
  const [notes, setNotes] = useState<{ id: number; x: number; y: number }[]>([])
  const [mathNotes, setMathNotes] = useState<{ id: number; x: number; y: number; text: string }[]>([])
  const bubbleRef = useRef<HTMLDivElement>(null)

  const speak = useCallback((spk: string | null, txt: string | null) => {
    setSpeaker(spk)
    setDialogue(txt)
  }, [])

  // Confetti helper
  const triggerConfetti = useCallback(() => {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute pointer-events-none'
      particle.style.width = `${Math.random() * 6 + 3}px`
      particle.style.height = `${Math.random() * 6 + 3}px`
      particle.style.borderRadius = '50%'
      const colors = ['#8b5cf6', '#6366f1', '#06b6d4', '#f59e0b', '#ec4899']
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = `${Math.random() * 80 + 10}%`
      particle.style.top = '100%'

      if (bubbleRef.current) {
        bubbleRef.current.appendChild(particle)
        const animation = particle.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
              transform: `translate(${(Math.random() - 0.5) * 120}px, ${-(Math.random() * 80 + 60)}px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 1200,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
          }
        )
        animation.onfinish = () => particle.remove()
      }
    }
  }, [])

  // Super Mode
  const triggerSuperMode = useCallback(() => {
    setIsSuper(true)
    speak('Super Twins 🔥', 'KÍCH HOẠT CHẾ ĐỘ SUPER TWINS! Sức mạnh AI tối thượng tăng 999%!')
    triggerConfetti()
    setTimeout(() => {
      setIsSuper(false)
      speak('Sochi & Soda ⚡', 'Trở lại trạng thái bình thường.')
    }, 4500)
  }, [triggerConfetti, speak])

  // Initial and contact form event handlers
  useEffect(() => {
    const greeting = getTimeDialogue()
    const timer = setTimeout(() => {
      speak(greeting.spk, greeting.txt)
    }, 1500)

    const handleFocusEvent = (e: Event) => {
      setIsOpen(true)
      const customEvent = e as CustomEvent<{ field: string }>
      const field = customEvent.detail?.field
      if (field === 'name') {
        speak('Sochi ☀️', 'Tên của bạn đẹp quá! Cho Sochi làm quen nha!')
      } else if (field === 'email') {
        speak('Soda 🌙', 'Nhớ điền đúng email để tụi mình gửi thư hồi đáp trong 24 giờ nhé!')
      } else if (field === 'message') {
        speak('Sochi & Soda 📝', 'Bạn muốn nhắn gửi điều gì? Tụi mình đang chăm chú lắng nghe đây!')
      }
    }

    const handleFormSubmitSuccess = () => {
      setIsOpen(true)
      speak('Sochi & Soda 🎉', 'Gửi tin nhắn thành công rồi! Đợi tụi mình phản hồi nha!')
      triggerConfetti()
    }

    const handleProductHover = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string | null; name: string | null }>
      const productId = customEvent.detail?.id
      const productName = customEvent.detail?.name
      if (productId) {
        setIsOpen(true)
        if (productId.startsWith('consult-')) {
          speak('Sochi & Soda 🚀', `Bạn đang cần tư vấn giải pháp cho ngành ${productName || 'này'} ư? Hãy để lại thông tin liên hệ nhé!`)
        } else if (productId === 'digital-office') {
          speak('Sochi 🏢', 'Văn phòng số (Digital Office) giúp giảm thiểu 90% giấy tờ và tối ưu quy trình doanh nghiệp đấy!')
        } else if (productId === 'bigdata-pipeline') {
          speak('Soda 🧬', 'Đường dẫn dữ liệu lớn (Big Data Pipeline) xử lý hàng triệu bản ghi mỗi giây cực kỳ mượt!')
        } else if (productId === 'crm') {
          speak('Soda 📊', 'Hệ thống CRM giúp chăm sóc khách hàng tự động, tăng tỷ lệ chốt đơn tới 75%!')
        } else if (productId === 'web-fleet') {
          speak('Sochi 🌐', 'Hạm đội web SEO Web Fleet giúp phủ sóng thương hiệu tự động trên Google cực mạnh!')
        } else {
          speak('Sochi & Soda 🛠️', `Sản phẩm ${productName} là giải pháp tuyệt vời để tối ưu hóa vận hành doanh nghiệp.`)
        }
      }
    }

    window.addEventListener('solaiFormFocus', handleFocusEvent)
    window.addEventListener('solaiFormSuccess', handleFormSubmitSuccess)
    window.addEventListener('solaiProductHover', handleProductHover)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('solaiFormFocus', handleFocusEvent)
      window.removeEventListener('solaiFormSuccess', handleFormSubmitSuccess)
      window.removeEventListener('solaiProductHover', handleProductHover)
    }
  }, [speak, triggerConfetti])

  const triggerSing = () => {
    speak('Sochi 🎵', 'La la la~ SOLAI kết nối tương lai~ Cùng bạn vươn xa tầm nhìn~ 🎶')
    const newNotes = Array.from({ length: 5 }, (_, i) => ({
      id: Math.random() + i,
      x: Math.random() * 60 - 30,
      y: -30 - Math.random() * 50,
    }))
    setNotes(newNotes)
    setTimeout(() => setNotes([]), 2000)
  }

  const triggerCompute = () => {
    speak('Soda 🧠', 'Đang giải mã thuật toán AI... Đã tối ưu 1 + 1 = Cặp song sinh siêu quậy!')
    const mathSymbols = ['01', '10', 'f(x)', '√x', '∑', 'π', '∞']
    const newMathNotes = Array.from({ length: 6 }, (_, i) => ({
      id: Math.random() + i,
      x: Math.random() * 60 - 30,
      y: -30 - Math.random() * 50,
      text: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
    }))
    setMathNotes(newMathNotes)
    setTimeout(() => setMathNotes([]), 2000)
  }

  const triggerCostume = (type: CostumeType) => {
    setCostume(type)
    if (type === 'snake') {
      speak('Sochi & Soda 👕', 'Tụi mình đã mặc Hoodie Rắn ấm cúng rồi nè! 🐍')
    } else if (type === 'dragon') {
      speak('Sochi & Soda 👕', 'Hoodie Rồng Lửa siêu ngầu kích hoạt! 🐉')
    } else if (type === 'astronaut') {
      speak('Sochi & Soda 👕', 'Trang phục Phi Hành Gia vũ trụ đã sẵn sàng! 🧑‍🚀')
    }
  }

  const getCostumeFilter = () => {
    if (isSuper) return 'hue-rotate(180deg) saturate(1.8) contrast(1.2)'
    if (costume === 'dragon') return 'hue-rotate(280deg) saturate(1.3)'
    if (costume === 'astronaut') return 'hue-rotate(120deg) brightness(1.1) saturate(1.2)'
    return 'none'
  }

  const handleMascotClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen && !dialogue) {
      const chosen = getRandomSpeech()
      speak(chosen.spk, chosen.txt)
    }
  }

  if (isMobile) return null

  return (
    <div className="fixed right-6 bottom-6 z-50 pointer-events-auto flex flex-col items-end gap-3">
      
      {/* Dialogue Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            ref={bubbleRef}
            className="w-[300px] glass-strong border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 font-sans relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="text-[10px] font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                {speaker || 'Sochi & Soda 🛸'}
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble speech */}
            <div className="text-xs text-zinc-200 leading-relaxed font-medium min-h-8">
              {dialogue || 'Chào bạn! Tụi mình là Sochi & Soda. Hãy khám phá SOLAI cùng tụi mình nhé!'}
            </div>

            {/* Micro console actions */}
            <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5 font-mono text-[10px]">
              <span className="text-zinc-500 uppercase tracking-wider">Mascot Actions:</span>
              <div className="grid grid-cols-2 gap-1 text-zinc-300">
                <button
                  onClick={triggerSing}
                  className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:text-white transition-all text-left flex items-center gap-1.5"
                >
                  <Music className="w-3 h-3 text-indigo-400" /> Sochi.sing()
                </button>
                <button
                  onClick={triggerCompute}
                  className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:text-white transition-all text-left flex items-center gap-1.5"
                >
                  <Brain className="w-3 h-3 text-emerald-400" /> Soda.solve()
                </button>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <span className="text-zinc-500 uppercase">Costumes:</span>
                <div className="flex gap-1">
                  {(['snake', 'dragon', 'astronaut'] as CostumeType[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => triggerCostume(c)}
                      className={`px-2 py-0.5 rounded text-[8px] capitalize transition-colors ${
                        costume === c ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/35' : 'bg-slate-900/50 hover:bg-slate-800 text-zinc-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={triggerSuperMode}
                className="mt-1.5 w-full py-1 rounded bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500/20 text-rose-300 transition-all font-bold text-center flex items-center justify-center gap-1"
              >
                <Shield className="w-3 h-3" /> SUPER TWINS MODE
              </button>
            </div>

            {/* Note Particles animation container */}
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, x: note.x, y: note.y, scale: 1.2 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute text-cyan-400 text-xs font-bold pointer-events-none"
                style={{ left: '50%', bottom: '30%' }}
              >
                🎵
              </motion.div>
            ))}

            {/* Math Symbols animation container */}
            {mathNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, x: note.x, y: note.y, scale: 1.2 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute text-emerald-400 text-[10px] font-mono font-bold pointer-events-none"
                style={{ left: '50%', bottom: '30%' }}
              >
                {note.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Bubble Trigger Button */}
      <button
        onClick={handleMascotClick}
        className={`group flex items-center justify-center relative rounded-full p-1.5 border transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-indigo-950/80 border-indigo-500/40 shadow-lg' : 'bg-slate-950/40 border-white/10 hover:border-white/20'
        }`}
        style={{
          boxShadow: isOpen ? '0 0 25px rgba(99, 102, 241, 0.25)' : 'none',
        }}
      >
        {/* Avatars container */}
        <div className="flex -space-x-4 items-center">
          {/* Sochi avatar */}
          <div
            className="w-10 h-10 rounded-full border border-amber-500/30 overflow-hidden bg-cover bg-no-repeat mascot-sharp"
            style={{
              backgroundImage: 'url(/sochi_soda.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              filter: getCostumeFilter(),
            }}
          />
          {/* Soda avatar */}
          <div
            className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden bg-cover bg-no-repeat mascot-sharp"
            style={{
              backgroundImage: 'url(/sochi_soda.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              filter: getCostumeFilter(),
            }}
          />
        </div>

        {/* Small active dot */}
        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border border-[#020208] rounded-full animate-pulse" />
      </button>
    </div>
  )
}
