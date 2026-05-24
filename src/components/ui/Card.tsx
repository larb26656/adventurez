import type { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'dashed';
  class?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Card({
  variant = 'default',
  class: className = '',
  padding = 'md',
  children,
}: CardProps) {
  const baseClasses = 'rounded-[14px] border';

  const variantClasses = {
    default: 'bg-white border-stone-200',
    dashed: 'bg-stone-50 border-stone-300 border-dashed',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}