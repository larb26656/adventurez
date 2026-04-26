import { createContext, useState, useCallback, type Context } from 'react'
import type { LogEntry, Logger, DebugCanvasProps } from './types'

export const DebugCanvasContext: Context<Logger | null> = createContext<Logger | null>(null)

const DebugCanvasContent = ({
  title,
  defaultConsoleOpen = false,
  children,
}: DebugCanvasProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isOpen, setIsOpen] = useState(defaultConsoleOpen)

  const log = useCallback((message: string, level: LogEntry['level'] = 'log') => {
    setLogs(prev => [...prev, { id: Date.now(), level, message, timestamp: new Date() }])
  }, [])

  const logger: Logger = {
    log: (message: string) => log(message, 'log'),
    info: (message: string) => log(message, 'info'),
    warn: (message: string) => log(message, 'warn'),
    error: (message: string) => log(message, 'error'),
    clear: () => setLogs([]),
  }

  const levelColors: Record<LogEntry['level'], string> = {
    log: 'text-gray-300',
    info: 'text-blue-400',
    warn: 'text-yellow-400',
    error: 'text-red-400',
  }

  return (
    <DebugCanvasContext.Provider value={logger}>
      <div className="flex flex-col">
        <div className="flex-1 min-h-[200px]">{children}</div>
        
        <div className="flex justify-between items-center px-2 py-1 bg-gray-800">
          <span className="text-xs text-gray-400 font-mono">{title || 'Debug Canvas'}</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            {isOpen ? 'Hide Console' : 'Show Console'}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-gray-700 bg-gray-900 p-3 max-h-48 overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500 font-mono">Console</span>
              <button
                onClick={() => logger.clear()}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              {logs.length === 0 ? (
                <div className="text-gray-600 text-xs font-mono">No logs</div>
              ) : (
                logs.map(entry => (
                  <div key={entry.id} className={`text-xs font-mono ${levelColors[entry.level]}`}>
                    <span className="text-gray-600">
                      [{entry.timestamp.toLocaleTimeString()}]
                    </span>{' '}
                    {entry.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </DebugCanvasContext.Provider>
  )
}

const DebugCanvas = ({ title, defaultConsoleOpen, children }: DebugCanvasProps) => {
  return (
    <DebugCanvasContent
      title={title}
      defaultConsoleOpen={defaultConsoleOpen}
    >
      {children}
    </DebugCanvasContent>
  )
}

export default DebugCanvas