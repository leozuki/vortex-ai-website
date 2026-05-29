'use client'

import type { VisualType } from '@/types'
import {
  AgentsIcon,
  DataIcon,
  MonitorIcon,
  CreativeIcon,
  CrmIcon,
  ReportIcon,
  DesktopIcon,
  ExtensionIcon,
  DmsIcon,
  TranscriptIcon,
  AdsIcon,
} from '@/components/icons'

interface Props {
  type: VisualType
  color: string
  size?: number
  className?: string
  hovered?: boolean
}

export function ProductIcon({ type, color, size = 32, className, hovered = false }: Props) {
  const iconProps = { color, size, className, hovered }

  switch (type) {
    case 'agents':
      return <AgentsIcon {...iconProps} />
    case 'data':
      return <DataIcon {...iconProps} />
    case 'monitor':
      return <MonitorIcon {...iconProps} />
    case 'creative':
      return <CreativeIcon {...iconProps} />
    case 'crm':
      return <CrmIcon {...iconProps} />
    case 'report':
      return <ReportIcon {...iconProps} />
    case 'desktop':
      return <DesktopIcon {...iconProps} />
    case 'extension':
      return <ExtensionIcon {...iconProps} />
    case 'dms':
      return <DmsIcon {...iconProps} />
    case 'transcript':
      return <TranscriptIcon {...iconProps} />
    case 'ads':
      return <AdsIcon {...iconProps} />
    default:
      return null
  }
}
