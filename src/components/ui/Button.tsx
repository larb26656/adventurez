interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  class: className = '',
  disabled = false,
  onClick,
  children,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-[10px] no-underline cursor-pointer border';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground border-transparent hover:bg-primary-hover',
    secondary: 'bg-transparent text-foreground border-border hover:border-primary hover:text-primary',
    ghost: 'bg-transparent text-muted border-transparent hover:text-foreground',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[13px]',
    md: 'px-7 py-3.5 text-[16px]',
    lg: 'px-7 py-3.5 text-[16px]',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={disabled ? undefined : href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}