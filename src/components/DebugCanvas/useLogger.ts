import { useContext } from 'react'
import type { Logger } from './types'
import { DebugCanvasContext } from './DebugCanvas'

export const useLogger = (): Logger => {
  const context = useContext(DebugCanvasContext)

  if (!context) {
    throw new Error('useLogger must be used within a DebugCanvas component')
  }

  return context
}