import { useState, useCallback } from 'react'
import { ComponentTreeNode } from './ComponentTreeNode'
import type { TreeNodeData, RenderEvent, ReactInteractiveProps } from './types'

let nodeCounter = 0

const generateId = (prefix: string) => `${prefix}-${++nodeCounter}`

export const ComponentTree = ({ initialTree, title, onRenderEvent }: ReactInteractiveProps) => {
  const [tree, setTree] = useState<TreeNodeData[]>(initialTree || [
    { id: generateId('node'), name: 'App', children: [
      { id: generateId('node'), name: 'Header', children: [
        { id: generateId('node'), name: 'Logo' },
        { id: generateId('node'), name: 'Nav' },
      ]},
      { id: generateId('node'), name: 'Main', children: [
        { id: generateId('node'), name: 'Content' },
        { id: generateId('node'), name: 'Sidebar' },
      ]},
      { id: generateId('node'), name: 'Footer' },
    ]},
  ])
  const [renderEvents, setRenderEvents] = useState<RenderEvent[]>([])
  const [showStats, setShowStats] = useState(true)
  const [newNodeIds, setNewNodeIds] = useState<Set<string>>(new Set())
  const [updateVersion, setUpdateVersion] = useState(0)

  const addRenderEvent = useCallback((nodeId: string, nodeName: string, type: RenderEvent['type']) => {
    const event: RenderEvent = { nodeId, nodeName, type, timestamp: new Date() }
    setRenderEvents(prev => [...prev.slice(-19), event])
    onRenderEvent?.(event)
  }, [onRenderEvent])

  const findAndUpdateNode = (
    nodes: TreeNodeData[],
    id: string,
    updater: (node: TreeNodeData) => TreeNodeData
  ): TreeNodeData[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return updater(node)
      }
      if (node.children) {
        return { ...node, children: findAndUpdateNode(node.children, id, updater) }
      }
      return node
    })
  }

  const findNode = (nodes: TreeNodeData[], id: string): TreeNodeData | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findNode(node.children, id)
        if (found) return found
      }
    }
    return null
  }

  const collectAllNodeIds = (nodes: TreeNodeData[]): string[] => {
    const ids: string[] = []
    const traverse = (nodes: TreeNodeData[]) => {
      for (const node of nodes) {
        ids.push(node.id)
        if (node.children) traverse(node.children)
      }
    }
    traverse(nodes)
    return ids
  }

  const handleAddChild = (parentId: string) => {
    const parent = findNode(tree, parentId)
    if (!parent) return

    const childName = `Component${nodeCounter + 1}`
    const newChild: TreeNodeData = { id: generateId('node'), name: childName }

    setTree(prev => findAndUpdateNode(prev, parentId, node => ({
      ...node,
      children: [...(node.children || []), newChild],
    })))

    setNewNodeIds(prev => new Set([...prev, newChild.id]))
  }

  const handleMountComplete = useCallback((nodeId: string) => {
    setNewNodeIds(prev => {
      const next = new Set(prev)
      next.delete(nodeId)
      return next
    })
  }, [])

  const handleRemove = (id: string) => {
    const nodeToRemove = findNode(tree, id)
    if (!nodeToRemove) return

    const removeNode = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes
        .filter(node => node.id !== id)
        .map(node => {
          if (node.children) {
            return { ...node, children: removeNode(node.children) }
          }
          return node
        })
    }

    addRenderEvent(id, nodeToRemove.name, 'unmount')
    setTimeout(() => setTree(removeNode(tree)), 300)
  }

  const handleUpdate = (id: string) => {
    const nodeToUpdate = findNode(tree, id)
    if (!nodeToUpdate) return

    const collectAllDescendants = (nodes: TreeNodeData[]): TreeNodeData[] => {
      const result: TreeNodeData[] = []
      const traverse = (nodes: TreeNodeData[]) => {
        for (const node of nodes) {
          result.push(node)
          if (node.children) traverse(node.children)
        }
      }
      traverse(nodes)
      return result
    }

    const allNodes = collectAllDescendants(tree)
    allNodes.forEach(node => {
      addRenderEvent(node.id, node.name, 'update')
    })

    setUpdateVersion(v => v + 1)
  }

  const mountCount = renderEvents.filter(e => e.type === 'mount').length
  const updateCount = renderEvents.filter(e => e.type === 'update').length
  const unmountCount = renderEvents.filter(e => e.type === 'unmount').length

  const renderNode = (node: TreeNodeData, depth: number): React.ReactNode => {
    const isNew = newNodeIds.has(node.id)
    return (
      <ComponentTreeNode
        key={node.id}
        node={node}
        depth={depth}
        isNew={isNew}
        updateVersion={updateVersion}
        onRemove={handleRemove}
        onAddChild={handleAddChild}
        onUpdate={handleUpdate}
        onMountComplete={handleMountComplete}
      />
    )
  }

  const renderTree = (nodes: TreeNodeData[], depth: number): React.ReactNode[] => {
    return nodes.flatMap(node => [
      renderNode(node, depth),
      ...(node.children ? renderTree(node.children, depth + 1) : []),
    ])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-200">{title || 'Component Tree'}</span>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
        >
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>
      </div>

      {showStats && (
        <div className="flex gap-4 px-3 py-2 bg-gray-900 border-b border-gray-700 text-xs font-mono">
          <span className="text-green-400">Mount: {mountCount}</span>
          <span className="text-yellow-400">Update: {updateCount}</span>
          <span className="text-red-400">Unmount: {unmountCount}</span>
          <span className="text-gray-500">Total: {renderEvents.length}</span>
        </div>
      )}

      <div className="flex-1 p-2 overflow-auto bg-gray-950">
        {renderTree(tree, 0)}
      </div>

      <div className="px-3 py-2 bg-gray-800 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          Click buttons on each node to interact. Events are logged to the console below.
        </p>
      </div>
    </div>
  )
}

export default ComponentTree