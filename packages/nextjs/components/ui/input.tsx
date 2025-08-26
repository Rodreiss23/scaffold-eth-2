import * as React from "react";
import { twMerge } from "tailwind-merge";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "h-10 w-full rounded-md border border-base-300 bg-base-100 px-3 py-2 text-sm outline-none focus:ring-2",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
