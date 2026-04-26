export type LogLevel = 'log' | 'info' | 'warn' | 'error'

export interface LogEntry {
  id: number
  level: LogLevel
  message: string
  timestamp: Date
}

export interface Logger {
  log: (message: string) => void
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
  clear: () => void
}

export interface DebugCanvasProps {
  title?: string
  defaultConsoleOpen?: boolean
  children: React.ReactNode
}