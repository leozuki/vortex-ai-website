'use client'

/**
 * SVG icon set replacing all emoji usage across the app.
 * Each icon is a clean 24×24 stroke-based glyph.
 */

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
}

export function SemanticIcon({ name, size = 20, color = 'currentColor', className }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className }

  switch (name) {
    // Money / cost
    case 'money': case 'cost': case 'salary':
      return <svg {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3H15"/></svg>

    // Time / clock
    case 'clock': case 'time': case 'slow':
      return <svg {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>

    // Bottleneck / block
    case 'block': case 'bottleneck':
      return <svg {...s}><path d="M12 2L4 7v5c0 5 4 8.7 8 10 4-1.3 8-5 8-10V7L12 2z"/><path d="M12 8v4M12 16h.01"/></svg>

    // Visibility / eye
    case 'visibility': case 'eye':
      return <svg {...s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

    // Brain / AI / plan
    case 'brain': case 'ai': case 'plan': case 'planner':
      return <svg {...s}><path d="M9.5 2a2.5 2.5 0 015 0c0 .7-.3 1.4-.7 1.9A5 5 0 0117 8.5c0 .5-.1 1-.2 1.4A4 4 0 0118 13a4 4 0 01-2.8 3.8A3.5 3.5 0 0112 19a3.5 3.5 0 01-3.2-2.2A4 4 0 016 13a4 4 0 011.2-3.1 5 5 0 01-.2-1.4A5 5 0 0110.2 3.9 2.5 2.5 0 019.5 2z"/></svg>

    // Task / checklist
    case 'task': case 'checklist': case 'clipboard':
      return <svg {...s}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>

    // Worker / agent
    case 'worker': case 'agent': case 'user':
      return <svg {...s}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

    // Review / check
    case 'review': case 'check': case 'approve':
      return <svg {...s}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>

    // Dashboard / chart / stats
    case 'dashboard': case 'chart': case 'stats':
      return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12v4M12 8v8M16 10v6"/></svg>

    // Data / database
    case 'data': case 'database':
      return <svg {...s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>

    // Collect / download / import
    case 'collect': case 'download': case 'import': case 'inbox':
      return <svg {...s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>

    // Enrich / link / connect
    case 'enrich': case 'link': case 'connect':
      return <svg {...s}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>

    // Score / target / aim
    case 'score': case 'target': case 'aim':
      return <svg {...s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>

    // Alert / warning
    case 'alert': case 'warning': case 'issue':
      return <svg {...s}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>

    // Monitor / screen
    case 'monitor': case 'screen':
      return <svg {...s}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>

    // Shield / security / protect
    case 'shield': case 'security': case 'protect':
      return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>

    // Robot / automation / bot
    case 'robot': case 'automation': case 'bot':
      return <svg {...s}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7M8 7h8a2 2 0 000-4H8a2 2 0 000 4z"/><circle cx="9" cy="16" r="1" fill={color}/><circle cx="15" cy="16" r="1" fill={color}/></svg>

    // Key / access / token
    case 'key': case 'access': case 'token':
      return <svg {...s}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>

    // Uptrend / growth
    case 'trend': case 'growth': case 'uptrend':
      return <svg {...s}><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>

    // Video / film
    case 'video': case 'film':
      return <svg {...s}><polygon points="23,7 16,12 23,17 23,7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>

    // Music / audio / sound
    case 'music': case 'audio': case 'sound':
      return <svg {...s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>

    // Palette / design / visual
    case 'palette': case 'design': case 'visual':
      return <svg {...s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1" fill={color}/><circle cx="12" cy="5" r="1.5" fill={color}/><circle cx="17" cy="8" r="1.5" fill={color}/><circle cx="17" cy="16" r="1.5" fill={color}/><circle cx="12" cy="19" r="1.5" fill={color}/><circle cx="7" cy="16" r="1.5" fill={color}/><circle cx="7" cy="8" r="1.5" fill={color}/></svg>

    // Upload / publish / deploy
    case 'upload': case 'publish': case 'deploy':
      return <svg {...s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>

    // Calendar / schedule
    case 'calendar': case 'schedule':
      return <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>

    // People / team / contacts
    case 'people': case 'team': case 'contacts':
      return <svg {...s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>

    // Pipeline / workflow / flow
    case 'pipeline': case 'workflow': case 'flow':
      return <svg {...s}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>

    // Bell / notification / alert
    case 'bell': case 'notification':
      return <svg {...s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>

    // Email / message / send
    case 'email': case 'message': case 'send':
      return <svg {...s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>

    // Phone / call
    case 'phone': case 'call':
      return <svg {...s}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 12.7a19.79 19.79 0 01-3.07-8.67A2 2 0 012.71 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>

    // Folder / file storage
    case 'folder': case 'storage': case 'files':
      return <svg {...s}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>

    // Document / file
    case 'document': case 'file': case 'report':
      return <svg {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>

    // Lock / secure
    case 'lock': case 'secure':
      return <svg {...s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>

    // Search / find
    case 'search': case 'find':
      return <svg {...s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>

    // Settings / gear / config
    case 'settings': case 'gear': case 'config':
      return <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>

    // Puzzle / integration / extension
    case 'puzzle': case 'integration': case 'extension':
      return <svg {...s}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>

    // Layers / stack / multi
    case 'layers': case 'stack': case 'multi':
      return <svg {...s}><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>

    // Repeat / sync / refresh
    case 'repeat': case 'sync': case 'refresh':
      return <svg {...s}><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>

    // Mic / transcribe / voice
    case 'mic': case 'transcribe': case 'voice':
      return <svg {...s}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>

    // Translate / language
    case 'translate': case 'language':
      return <svg {...s}><path d="M5 8l6 6M4 14l6-6M2 5h7M8 2v3"/><path d="M12 5h7M19 5l-5 5M14 10l-2 5 2 5M17 15h-6"/></svg>

    // Video file / recording
    case 'video-file': case 'recording': case 'clip':
      return <svg {...s}><path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7z"/><polyline points="14,2 14,8 20,8"/><polygon points="10,11 10,17 15,14 10,11"/></svg>

    // Subtitle / caption / text
    case 'subtitle': case 'caption': case 'transcript':
      return <svg {...s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>

    // Ads / megaphone / campaign
    case 'ads': case 'megaphone': case 'campaign':
      return <svg {...s}><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>

    // Cursor / click / mouse
    case 'cursor': case 'click': case 'mouse':
      return <svg {...s}><path d="M5 3l14 9-7 1-4 7-3-17z"/></svg>

    // Copy / duplicate
    case 'copy': case 'duplicate':
      return <svg {...s}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>

    // Satellite / signal / broadcast
    case 'satellite': case 'signal': case 'broadcast':
      return <svg {...s}><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>

    // Wand / magic / spark / AI generate
    case 'wand': case 'magic': case 'spark': case 'generate':
      return <svg {...s}><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19.2 13.2M17.8 6.2l1.4-1.4M12.2 6.2L10.8 4.8M12.2 11.8l-1.4 1.4"/><path d="M2 22L16 8M16 8l2 2M16 8h2v2"/></svg>

    // Down arrow / decrease / drop
    case 'down': case 'decrease': case 'drop':
      return <svg {...s}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19,12 12,19 5,12"/></svg>

    // Person question / confused
    case 'confused': case 'question':
      return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>

    // Headphones / support / listen
    case 'headphones': case 'support': case 'listen':
      return <svg {...s}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>

    // Globe / web / world
    case 'globe': case 'web': case 'world':
      return <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>

    // Success / celebrate / party
    case 'success': case 'celebrate': case 'party':
      return <svg {...s}><polyline points="20,6 9,17 4,12"/></svg>

    // Location / pin / place
    case 'location': case 'pin': case 'place':
      return <svg {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>

    // Mail / contact
    case 'mail': case 'contact':
      return <svg {...s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>

    // Zap / lightning / fast
    case 'zap': case 'lightning': case 'fast':
      return <svg {...s}><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>

    // Star / featured / best
    case 'star': case 'featured': case 'best':
      return <svg {...s}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>

    // Play / start / begin
    case 'play': case 'start': case 'begin':
      return <svg {...s}><polygon points="5,3 19,12 5,21 5,3"/></svg>

    // Gift / reward / offer
    case 'gift': case 'reward': case 'offer':
      return <svg {...s}><polyline points="20,12 20,22 4,22 4,12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>

    // Fallback — generic circle dot
    default:
      return <svg {...s}><circle cx="12" cy="12" r="4" fill={color} stroke="none"/></svg>
  }
}
