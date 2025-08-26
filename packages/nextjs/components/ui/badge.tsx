import * as React from "react";
import { twMerge } from "tailwind-merge";

export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={twMerge("inline-flex items-center rounded-full border px-2 py-0.5 text-xs", className)} {...props} />
);
