import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        outline:
          "border border-input bg-background shadow-sm hover:border-primary/50 hover:shadow-md hover:bg-accent/10 hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        ghost: 
          "hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-200",
        link: 
          "text-primary underline-offset-4 hover:underline",
        glass: 
          "backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-foreground hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200",
        gradient: 
          "bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
      },
      size: {
        default: "h-10 px-5 py-2 sm:h-10 sm:px-5 sm:py-2",
        sm: "h-8 px-3 text-xs sm:h-9 sm:px-3 sm:text-xs",
        lg: "h-10 px-4 text-sm sm:h-12 sm:px-8 sm:text-base",
        icon: "h-8 w-8 sm:h-10 sm:w-10",
        mobile: "h-9 px-4 py-2 text-sm sm:h-10 sm:px-5 sm:py-2 sm:text-base",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
