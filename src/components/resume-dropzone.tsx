import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileText, AlertCircle, Upload as UploadIcon, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ParsingStatus } from './parsing-status'
import { motion, AnimatePresence } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface ResumeDropzoneProps {
  onParse: (file: File) => void
  isProcessing?: boolean
  status?: string
}

export function ResumeDropzone({ 
  onParse, 
  isProcessing = false,
  status = ''
}: ResumeDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onParse(acceptedFiles[0])
    }
  }, [onParse])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isProcessing
  })

  // Separate the motion props from dropzone props
  const motionProps: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 }
  }

  // Animation for the upload icon
  const iconAnimation = {
    initial: { y: 0 },
    animate: isDragActive 
      ? { y: [0, -15, 0], transition: { repeat: Infinity, duration: 1.5 } }
      : { y: [0, -10, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }
  }

  return (
    <div className="relative">
      {/* Decorative blobs */}
      <div className="blob w-72 h-72 -top-20 -left-20 opacity-30"></div>
      <div className="blob w-64 h-64 -bottom-10 -right-10 opacity-20 animation-delay-500"></div>
      
      <motion.div
        {...motionProps}
        className={cn(
          "relative glass-card overflow-hidden border-2 border-dashed rounded-2xl p-10 transition-all duration-500",
          "group",
          isDragActive ? "border-primary shadow-neon scale-103" : "border-muted-foreground/25",
          isDragReject ? "border-destructive bg-destructive/5" : "",
          isProcessing ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:border-primary/50 hover:shadow-xl",
        )}
      >
        {/* Gradient overlay when active */}
        <div className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none",
          "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5",
          isDragActive ? "opacity-100" : "group-hover:opacity-80"
        )} />
        
        <div {...getRootProps()} className="relative z-10">
          <input {...getInputProps()} />
          
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <ParsingStatus status={status} />
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Upload icon with animation */}
                <motion.div
                  className="relative"
                  variants={iconAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="glass p-6 rounded-full">
                      {isDragActive ? (
                        <Cloud className="h-12 w-12 text-primary" />
                      ) : (
                        <UploadIcon className="h-12 w-12 text-primary" />
                      )}
                    </div>
                  </div>
                </motion.div>
                
                {/* Text content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 gradient-text">
                    {isDragActive ? "Drop your resume here" : "Upload your resume"}
                  </h3>
                  <p className="text-base text-muted-foreground mb-6">
                    {isDragActive 
                      ? "Release to upload" 
                      : "Drag & drop your file or click to select"}
                  </p>
                  
                  {/* File type badges */}
                  <div className="flex justify-center gap-3 mb-6">
                    {['PDF', 'DOC', 'DOCX'].map((format) => (
                      <motion.div 
                        key={format}
                        className="glass flex items-center space-x-2 px-4 py-2 rounded-xl"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{format}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* File size info */}
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Maximum file size: 5MB</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
