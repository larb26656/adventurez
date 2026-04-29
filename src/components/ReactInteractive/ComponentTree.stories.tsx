import type { Meta, StoryObj } from '@storybook/react'
import { useLogger } from '../DebugCanvas/useLogger'
import DebugCanvas from '../DebugCanvas'
import { ComponentTree } from './ComponentTree'
import type { TreeNodeData } from './types'

const meta: Meta = {
  title: 'ReactInteractive/ComponentTree',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

const sampleTree: TreeNodeData[] = [
  {
    id: 'app',
    name: 'App',
    children: [
      {
        id: 'header',
        name: 'Header',
        children: [
          { id: 'logo', name: 'Logo' },
          { id: 'nav', name: 'Nav' },
        ],
      },
      {
        id: 'main',
        name: 'Main',
        children: [
          { id: 'content', name: 'Content' },
          { id: 'sidebar', name: 'Sidebar' },
        ],
      },
      { id: 'footer', name: 'Footer' },
    ],
  },
]

function TreeWithLogger() {
  const logger = useLogger()

  const handleRenderEvent = (event: { nodeName: string; type: string }) => {
    if (event.type === 'mount') logger.log(`🔵 Mount: ${event.nodeName}`)
    else if (event.type === 'update') logger.log(`🟡 Update: ${event.nodeName}`)
    else if (event.type === 'unmount') logger.log(`🔴 Unmount: ${event.nodeName}`)
  }

  return (
    <div className="h-96">
      <ComponentTree title="Component Tree Demo" initialTree={sampleTree} onRenderEvent={handleRenderEvent} />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <DebugCanvas title="Component Tree Demo" defaultConsoleOpen>
      <TreeWithLogger />
    </DebugCanvas>
  ),
}

export const Interactive: Story = {
  render: () => (
    <DebugCanvas title="Interactive Component Tree" defaultConsoleOpen>
      <div className="h-[500px]">
        <ComponentTree title="Try interacting!" />
      </div>
    </DebugCanvas>
  ),
}