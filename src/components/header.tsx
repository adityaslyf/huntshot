import { ThemeToggle } from "./theme-toggle"
import { AuthButtons } from "./auth-buttons"
import { motion } from "framer-motion"
import { Sparkle } from "lucide-react"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative glass p-2 rounded-full flex items-center justify-center">
              <Sparkle className="h-5 w-5 text-primary" />
            </div>
          </div>
          <span className="ml-3 font-bold text-xl gradient-text">HuntShot</span>
        </Link>
        <div className="flex items-center space-x-4">
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