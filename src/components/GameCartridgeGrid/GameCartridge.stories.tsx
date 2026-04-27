import type { Meta, StoryObj } from '@storybook/react'
import GameCartridge from './GameCartridge'
import type { Course, GameCartridgeProps } from './types'

const sampleCourse: Course = {
  id: 'ADV001',
  title: 'Dungeon Explorer',
  description: 'Explore mysterious dungeons',
  thumbnail: 'https://picsum.photos/400/300?random=1',
  tags: ['Adventure', 'RPG'],
  href: '/game/dungeon-explorer',
  color: '#e74c3c',
}

const comingSoonCourse: Course = {
  id: 'COMING',
  title: 'Cyber Runner',
  description: 'Coming soon',
  thumbnail: 'https://picsum.photos/400/300?random=5',
  tags: ['Action'],
  href: '',
  comingSoon: true,
  color: '#f39c12',
}

const meta: Meta<GameCartridgeProps> = {
  title: 'GameCartridge',
  component: GameCartridge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<GameCartridgeProps>

export const Default: Story = {
  args: {
    course: sampleCourse,
    isActive: false,
  },
}

export const Active: Story = {
  args: {
    course: sampleCourse,
    isActive: true,
  },
}

export const ComingSoon: Story = {
  args: {
    course: comingSoonCourse,
    isActive: false,
  },
}