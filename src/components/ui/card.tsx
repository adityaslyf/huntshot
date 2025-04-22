import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "outline" | "modern" | "floating"
  animation?: boolean
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", animation = false, interactive = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl border bg-card text-card-foreground shadow-md transition-all duration-300"
    
    // Variant-specific styles
    const variantStyles = {
      default: "bg-card",
      glass: "glass-card backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10",
      gradient: "bg-gradient-to-br from-primary/10 via-accent/10 to-background border-none",
      outline: "bg-transparent border-primary/20 hover:border-primary/40",
      modern: "card-modern",
      floating: "card-3d hover:rotate-y-5 hover:rotate-x-5"
    }
    
    // Interactive styles for hover and focus
    const interactiveStyles = interactive 
      ? "hover:-translate-y-1 hover:shadow-lg cursor-pointer" 
      : ""
    
    // Render as motion.div if animation is enabled
    if (animation) {
      const motionProps: HTMLMotionProps<"div"> = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        },
        className: cn(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          className
        )
      }
      
      if (interactive) {
        motionProps.whileHover = { y: -5 }
      }
      
      return (
        <motion.div
          ref={ref}
          {...motionProps}
        >
          {children}
        </motion.div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
