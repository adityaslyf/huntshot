import { Loader } from "./ui/loader"
import { motion } from "framer-motion"
import { ScanSearch, Check, FileSearch } from "lucide-react"
import { useState, useEffect } from "react"

interface ParsingStatusProps {
  status: string
}

export function ParsingStatus({ status }: ParsingStatusProps) {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)
  const totalSteps = 3
  
  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        
        // Update steps based on progress
        const newProgress = prev + Math.random() * 3
        if (newProgress > 30 && step === 1) {
          setStep(2)
        } else if (newProgress > 70 && step === 2) {
          setStep(3)
        }
        
        return newProgress
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [step])
  
  const getStepIcon = (stepNumber: number) => {
    if (stepNumber === 1) return <ScanSearch className="h-5 w-5" />
    if (stepNumber === 2) return <FileSearch className="h-5 w-5" />
    return <Check className="h-5 w-5" />
  }
  
  const getStepLabel = (stepNumber: number) => {
    if (stepNumber === 1) return "Analyzing document"
    if (stepNumber === 2) return "Extracting data"
    return "Finalizing"
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Loader 
        variant="bars" 
        size="lg" 
        text={status || "Processing your resume..."}
      />
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Progress bar */}
        <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden glass">
          <motion.div 
            className="h-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 15 }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted-foreground">Processing</p>
          <p className="text-xs text-primary font-medium">{Math.min(Math.round(progress), 100)}%</p>
        </div>
      </motion.div>
      
      {/* Steps indicators */}
      <div className="flex w-full max-w-md justify-between relative">
        <div className="absolute h-0.5 top-5 left-0 right-0 bg-secondary/50 -z-10" />
        
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1
          const isActive = stepNumber <= step
          const isCompleted = stepNumber < step
          
          return (
            <motion.div 
              key={stepNumber}
              className="flex flex-col items-center"
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ 
                opacity: isActive ? 1 : 0.5, 
                y: 0,
              }}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isActive 
                    ? isCompleted 
                      ? 'glass bg-primary/20 text-primary' 
                      : 'glass bg-primary/20 text-primary animate-pulse' 
                    : 'glass bg-secondary/30 text-muted-foreground'
                }`}
                whileHover={{ scale: isActive ? 1.1 : 1 }}
              >
                {getStepIcon(stepNumber)}
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {getStepLabel(stepNumber)}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
