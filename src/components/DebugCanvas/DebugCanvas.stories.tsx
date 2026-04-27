import type { Meta, StoryObj } from '@storybook/react'
import DebugCanvas from './DebugCanvas'
import { useLogger } from './useLogger'
import type { DebugCanvasProps } from './types'
import { useEffect } from 'react'

const meta: Meta<DebugCanvasProps> = {
  title: 'DebugCanvas',
  component: DebugCanvas,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    defaultConsoleOpen: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<DebugCanvasProps>

export const Default: Story = {
  args: {
    title: 'Debug Console',
    defaultConsoleOpen: false,
    children: <div className="p-4 bg-gray-100 text-gray-800">Content goes here</div>,
  },
}

export const ConsoleOpen: Story = {
  args: {
    title: 'Debug Console',
    defaultConsoleOpen: true,
    children: <div className="p-4 bg-gray-100 text-gray-800">Content goes here</div>,
  },
}

function LoggerButtons() {
  const logger = useLogger()

  useEffect(() => {
    logger.log('Logger initialized')
  }, [logger])

  const handleLog = (level: 'log' | 'info' | 'warn' | 'error') => {
    logger[level](`Sample ${level} message at ${new Date().toLocaleTimeString()}`)
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-gray-700">Click buttons to log messages:</p>
      <div className="flex gap-2">
        <button onClick={() => handleLog('log')} className="px-3 py-1 bg-gray-200 rounded">Log</button>
        <button onClick={() => handleLog('info')} className="px-3 py-1 bg-blue-200 rounded">Info</button>
        <button onClick={() => handleLog('warn')} className="px-3 py-1 bg-yellow-200 rounded">Warn</button>
        <button onClick={() => handleLog('error')} className="px-3 py-1 bg-red-200 rounded">Error</button>
      </div>
    </div>
  )
}

export const WithLoggingExample: Story = {
  args: {
    title: 'Logger Example',
    defaultConsoleOpen: true,
    children: <LoggerButtons />,
  },
}