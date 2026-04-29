import { useState, useEffect, useRef } from 'react'
import type { TreeNodeData } from './types'

type RenderStatus = 'idle' | 'mount' | 'update' | 'unmount'

interface ComponentTreeNodeProps {
  node: TreeNodeData
  depth: number
  isNew?: boolean
  updateVersion?: number
  onRemove: (id: string) => void
  onAddChild: (parentId: string) => void
  onUpdate: (id: string) => void
  onMountComplete?: (id: string) => void
}

const statusColors: Record<RenderStatus, string> = {
  idle: 'bg-gray-500',
  mount: 'bg-green-500',
  update: 'bg-yellow-500',
  unmount: 'bg-red-500',
}

export const ComponentTreeNode = ({
  node,
  depth,
  isNew = false,
  updateVersion = 0,
  onRemove,
  onAddChild,
  onUpdate,
  onMountComplete,
}: ComponentTreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [status, setStatus] = useState<RenderStatus>('idle')
  const hasMounted = useRef(false)
  const prevUpdateVersion = useRef(updateVersion)

  useEffect(() => {
    if (isNew && !hasMounted.current) {
      hasMounted.current = true
      setStatus('mount')
      const timer = setTimeout(() => {
        setStatus('idle')
        onMountComplete?.(node.id)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isNew, node.id, onMountComplete])

  useEffect(() => {
    if (status === 'update') {
      const timer = setTimeout(() => setStatus('idle'), 500)
      return () => clearTimeout(timer)
    }
  }, [status])

  useEffect(() => {
    if (updateVersion > prevUpdateVersion.current && hasMounted.current) {
      setStatus('update')
      const timer = setTimeout(() => setStatus('idle'), 500)
      return () => clearTimeout(timer)
    }
    prevUpdateVersion.current = updateVersion
  }, [updateVersion])

  useEffect(() => {
    if (status === 'unmount') {
      const timer = setTimeout(() => onRemove(node.id), 300)
      return () => clearTimeout(timer)
    }
  }, [status, node.id, onRemove])

  const handleUpdate = () => {
    setStatus('update')
    onUpdate(node.id)
  }

  const handleRemove = () => {
    setStatus('unmount')
  }

  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="select-none">
      <div
        className={`
          flex items-center gap-2 py-1 px-2 rounded
          border-l-2 transition-all duration-300
          ${status === 'mount' ? 'bg-green-500/20 animate-pulse' : ''}
          ${status === 'update' ? 'bg-yellow-500/20' : ''}
          ${status === 'unmount' ? 'bg-red-500/20 opacity-50' : ''}
        `}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-4 h-4 flex items-center justify-center text-xs text-gray-400 hover:text-white"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}

        <div className={`w-2 h-2 rounded-full ${statusColors[status]} ${status !== 'idle' ? 'animate-ping' : ''}`} />

        <span className="text-sm text-gray-200 font-mono">{node.name}</span>

        <div className="flex gap-1 ml-auto">
          <button
            onClick={handleUpdate}
            className="px-2 py-0.5 text-xs bg-yellow-600/50 hover:bg-yellow-600 text-yellow-200 rounded transition-colors"
          >
            Update
          </button>
          <button
            onClick={() => onAddChild(node.id)}
            className="px-2 py-0.5 text-xs bg-blue-600/50 hover:bg-blue-600 text-blue-200 rounded transition-colors"
          >
            +Child
          </button>
          <button
            onClick={handleRemove}
            className="px-2 py-0.5 text-xs bg-red-600/50 hover:bg-red-600 text-red-200 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="border-l border-gray-700 ml-2">
          {node.children!.map(child => (
            <ComponentTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onRemove={onRemove}
              onAddChild={onAddChild}
              onUpdate={onUpdate}
              onMountComplete={onMountComplete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ComponentTreeNode