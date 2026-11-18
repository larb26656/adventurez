interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  class?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  class: className = "",
  disabled = false,
  onClick,
  children,
  type = "button",
}: ButtonProps) {
  const baseClasses = "quiz-button not-content";

  const variantClasses = {
    primary: "quiz-button--primary",
    secondary: "quiz-button--secondary",
    ghost: "quiz-button--ghost",
  };

  const sizeClasses = {
    sm: "quiz-button--sm",
    md: "quiz-button--md",
    lg: "quiz-button--lg",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
