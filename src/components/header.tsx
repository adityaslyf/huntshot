import { ThemeToggle } from "./theme-toggle"
import { AuthButtons } from "./auth-buttons"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="HuntShot Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <span className="ml-2 sm:ml-3 font-bold text-lg sm:text-xl text-foreground">
            HuntShot
          </span>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
          <AuthButtons />
        </div>
      </div>
    </motion.header>
  )
} 