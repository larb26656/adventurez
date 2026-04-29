export interface TreeNodeData {
  id: string
  name: string
  children?: TreeNodeData[]
}

export interface RenderEvent {
  nodeId: string
  nodeName: string
  type: 'mount' | 'update' | 'unmount'
  timestamp: Date
}

export interface ReactInteractiveProps {
  title?: string
  initialTree?: TreeNodeData[]
  onRenderEvent?: (event: RenderEvent) => void
}