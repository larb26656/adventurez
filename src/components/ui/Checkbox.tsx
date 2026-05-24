import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  primaryColorClass?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, primaryColorClass = "text-primary", disabled, ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={clsx(
          "accent-primary p h-5 w-5 rounded",
          primaryColorClass,
          className,
        )}
        {...props}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
