import type { Meta, StoryObj } from '@storybook/react'
import GameCartridgeGrid from './index'
import type { Course, GameCartridgeGridProps } from './types'

const sampleCourses: Course[] = [
  {
    id: 'ADV001',
    title: 'Dungeon Explorer',
    description: 'Explore mysterious dungeons',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    tags: ['Adventure', 'RPG'],
    href: '/game/dungeon-explorer',
    color: '#e74c3c',
  },
  {
    id: 'ADV002',
    title: 'Space Odyssey',
    description: 'Journey through the stars',
    thumbnail: 'https://picsum.photos/400/300?random=2',
    tags: ['Sci-Fi', 'Action'],
    href: '/game/space-odyssey',
    color: '#3498db',
  },
  {
    id: 'ADV003',
    title: 'Medieval Wars',
    description: 'Command your armies',
    thumbnail: 'https://picsum.photos/400/300?random=3',
    tags: ['Strategy', 'Medieval'],
    href: '/game/medieval-wars',
    color: '#2ecc71',
  },
  {
    id: 'ADV004',
    title: 'Haunted Mansion',
    description: 'Survive the haunted house',
    thumbnail: 'https://picsum.photos/400/300?random=4',
    tags: ['Horror', 'Survival'],
    href: '/game/haunted-mansion',
    color: '#9b59b6',
  },
  {
    id: 'COMING',
    title: 'Cyber Runner',
    description: 'Coming soon',
    thumbnail: 'https://picsum.photos/400/300?random=5',
    tags: ['Action'],
    href: '',
    comingSoon: true,
    color: '#f39c12',
  },
]

const meta: Meta<GameCartridgeGridProps> = {
  title: 'GameCartridgeGrid',
  component: GameCartridgeGrid,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<GameCartridgeGridProps>

export const Default: Story = {
  args: {
    courses: sampleCourses,
  },
}

export const Empty: Story = {
  args: {
    courses: [],
  },
}