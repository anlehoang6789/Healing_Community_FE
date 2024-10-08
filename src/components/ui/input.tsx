import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define input variants using cva
const inputVariants = cva(
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-black bg-white placeholder:text-placeholderInput focus-visible:ring-1 focus-visible:ring-ring",
        outline:
          "border border-input bg-transparent focus-visible:ring-1 focus-visible:ring-ring",
        subtle:
          "bg-subtle text-subtle-foreground focus-visible:ring-1 focus-visible:ring-ring",
        destructive:
          "bg-destructive text-destructive-foreground focus-visible:ring-1 focus-visible:ring-ring",
        headerInput:
          "bg-headerinput text-headerinput-foreground border border-headerinput-border focus-visible:ring-1 focus-visible:ring-ring",
        bottomBorder:
          "border-0 border-b-2 border-gray-400 focus:border-b-2 focus:border-gray-600 focus:outline-none focus:ring-0 rounded-none shadow-none",
        borderless:
          "border-0 focus:ring-0 focus-visible:outline-none rounded-none shadow-none",
      },
      sizeVariant: {
        default: "h-9 px-3",
        sm: "h-8 px-2 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  size?: never;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizeVariant, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, sizeVariant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
