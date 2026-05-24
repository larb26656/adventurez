import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'outline';
  class?: string;
  children: ReactNode;
}

export function Badge({
  variant = 'default',
  class: className = '',
  children,
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-2 text-[12px] font-semibold rounded-full no-underline';

  const variantClasses = {
    default: 'bg-stone-100 text-stone-700 px-3 py-1',
    outline: 'border border-stone-300 text-stone-600 px-3 py-1',
  };

  const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
}