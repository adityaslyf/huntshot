import { ThemeProvider } from "./components/theme-provider"
import { Header } from "./components/header"
import { ResumeDropzone } from "./components/resume-dropzone"
import { CustomToaster } from "./components/ui/custom-toaster"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useResume } from './contexts/resume-context'
import { parseResume } from "./lib/resume-parser"
import { AuthProvider } from '@/contexts/auth-context'
import { ProfileProvider } from '@/contexts/profile-context'
import { motion } from 'framer-motion'
import { Upload, FileText, ChevronRight } from 'lucide-react'

function App() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const { setParsedResume } = useResume()

  const handleResumeParse = async (file: File) => {
    try {
      setIsProcessing(true)
      const parsedData = await parseResume(file)
      
      if (parsedData) {
        console.log('Parsed resume data:', parsedData)
        setParsedResume(parsedData)
        navigate('/profile')
      }
    } catch (error) {
      console.error('Resume parsing error:', error)
      toast.error('Failed to parse resume')
    } finally {
      setIsProcessing(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <AuthProvider>
      <ProfileProvider>
        <ThemeProvider defaultTheme="system">
          <div className="relative min-h-screen bg-background text-foreground">
            <Header />
            
            <main className="container mx-auto px-4 py-8 lg:py-16">
              <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Title Section */}
                <motion.div 
                  className="text-center mb-8 lg:mb-12"
                  variants={itemVariants}
                >
                  <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4">
                      Resume Parser
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                      Upload your resume and we'll parse it for you using advanced AI technology.
                    </p>
                  </div>
                </motion.div>
                
                {/* Resume Upload Section */}
                <motion.div 
                  variants={itemVariants}
                  className="mb-12 lg:mb-16"
                >
                  <ResumeDropzone 
                    onParse={handleResumeParse} 
                    isProcessing={isProcessing} 
                  />
                </motion.div>
                
                {/* Features Section */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  variants={itemVariants}
                >
                  {[
                    { 
                      title: 'Upload Resume', 
                      description: 'Support for PDF, DOC, and DOCX formats',
                      icon: <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                    },
                    { 
                      title: 'AI Parsing', 
                      description: 'Our AI extracts all relevant information',
                      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                    },
                    { 
                      title: 'Get Started', 
                      description: 'Create your professional profile instantly',
                      icon: <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                      whileHover={{ y: -2, transition: { type: 'spring', stiffness: 300 } }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 mb-3 sm:mb-4">
                        <div className="text-primary">{item.icon}</div>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </main>
            
            <CustomToaster />
          </div>
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
