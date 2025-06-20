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
        staggerChildren: 0.3,
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
          <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
            {/* Background decorative elements */}
            <div className="blob w-[500px] h-[500px] -top-64 -left-64 opacity-20"></div>
            <div className="blob w-[600px] h-[600px] -bottom-96 -right-96 opacity-10"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-transparent to-background opacity-70 pointer-events-none"></div>
            
            <Header />
            
            <main className="relative container mx-auto px-4 py-8">
              <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="text-center mb-12"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-center mb-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resume Parser</h1>
                  </div>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Upload your resume and we'll parse it for you.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ResumeDropzone 
                    onParse={handleResumeParse} 
                    isProcessing={isProcessing} 
                  />
                </motion.div>
                
                <motion.div 
                  className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={itemVariants}
                >
                  {[
                    { 
                      title: 'Upload Resume', 
                      description: 'Support for PDF, DOC, and DOCX formats',
                      icon: <Upload className="h-6 w-6" />
                    },
                    { 
                      title: 'AI Parsing', 
                      description: 'Our AI extracts all relevant information',
                      icon: <FileText className="h-6 w-6" />
                    },
                    { 
                      title: 'Get Started', 
                      description: 'Create your professional profile instantly',
                      icon: <ChevronRight className="h-6 w-6" />
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="card-glass"
                      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    >
                      <div className="glass p-3 rounded-full inline-block mb-4">
                        <div className="text-primary">{item.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
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
