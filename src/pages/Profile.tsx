import { useEffect, useState } from 'react'
import { useProfile } from "@/contexts/profile-context"
import { Button } from "@/components/ui/button"
import { BasicInfoSection } from "@/components/profile/basic-info-section"
import { ExperienceSection } from "@/components/profile/experience-section"
import { EducationSection } from "@/components/profile/education-section"
import { ProjectsSection } from "@/components/profile/projects-section"
import { AchievementsSection } from "@/components/profile/achievements-section"
import { TemplatesSection } from '@/components/profile/template-section'
import { useResume } from '@/contexts/resume-context'
import { useToast } from "@/components/ui/custom-toaster"
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/hooks/user-auth"
import { Save, Briefcase, GraduationCap, Trophy, FolderGit2, User, ChevronLeft, Mail, LogOut, Menu, X } from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProfilePage() {
  const { parsedResume } = useResume()
  const { userDetails, fetchUserDetails, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const { profile, updateProfile } = useProfile()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('basic-info')
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isSidebarHidden, setSidebarHidden] = useState(false)
  


  const navigate = useNavigate()
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  } | null>(null)

  // Load existing profile or parsed resume data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        
        if (!userDetails?.user_id) {
          throw new Error('User not authenticated')
        }

        if (parsedResume) {
          // If we have parsed resume data, use that
          updateProfile(parsedResume)
        } else {
          // Try to load existing profile
          const { data: existingProfile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userDetails.user_id)
            .maybeSingle()

          if (existingProfile && !error) {
            updateProfile(existingProfile)
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [userDetails, parsedResume, updateProfile])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('[Profile] Current auth session:', {
        userId: session?.user?.id,
        matchesUserDetails: session?.user?.id === userDetails?.user_id
      })
    }
    checkAuth()
  }, [userDetails?.user_id])

  useEffect(() => {
    const refreshSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        console.error('[Profile] Session refresh error:', error)
        // Redirect to login or show error
        return
      }
      console.log('[Profile] Session refreshed:', {
        userId: session.user.id,
        email: session.user.email
      })
    }
    refreshSession()
  }, [])

  const handleSave = async () => {
    try {
      if (!userDetails?.user_id) {
        throw new Error('User not authenticated')
      }

      // Show saving alert
      setAlertInfo({
        show: true,
        type: 'success',
        message: 'Saving changes...'
      });

      // Step 1: Save profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: userDetails.user_id,
          basic_info: profile?.basic_info,
          experience: profile?.experience,
          education: profile?.education,
          projects: profile?.projects,
          achievements: profile?.achievements
        }, {
          onConflict: 'user_id'
        })

      if (profileError) {
        throw profileError
      }

      console.log('[Profile] Profile saved successfully')

      // Step 2: Get current session
      const { data: { session } } = await supabase.auth.getSession()
      console.log('[Profile] Current session:', {
        sessionUserId: session?.user?.id,
        userDetailsId: userDetails.user_id
      })

      // Step 3: First verify the user exists
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userDetails.user_id)
        .single()

      console.log('[Profile] Found user:', { 
        existingUser,
        findError,
        userMatch: session?.user?.id === existingUser?.user_id
      })

      if (findError) {
        console.error('[Profile] Error finding user:', findError)
        throw findError
      }

      if (!existingUser) {
        throw new Error('User not found')
      }

      // Step 4: Update has_profile flag using a simpler update
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update({ has_profile: true })
        .eq('id', existingUser.id)
        .select()

      console.log('[Profile] User update attempt:', {
        updateQuery: {
          table: 'users',
          id: existingUser.id,
          user_id: existingUser.user_id,
          update: { has_profile: true }
        },
        result: {
          data: updatedUser,
          error: userError ? {
            code: userError.code,
            message: userError.message,
            details: userError.details,
            hint: userError.hint
          } : null
        }
      })

      if (userError) {
        console.error('[Profile] User update error:', userError)
        throw userError
      }

      // Step 5: Verify the update
      const { data: verifyUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', existingUser.id)
        .single()

      console.log('[Profile] Verification:', {
        before: existingUser.has_profile,
        after: verifyUser?.has_profile
      })

      // Step 6: Refresh user details
      await fetchUserDetails()

      // Show success alert
      setAlertInfo({
        show: true,
        type: 'success',
        message: 'Changes saved successfully!'
      });

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlertInfo(null);
      }, 3000);

    } catch (error) {
      console.error('[Profile] Save error:', error)
      // Show error alert
      setAlertInfo({
        show: true,
        type: 'error',
        message: error instanceof Error 
          ? `Failed to save: ${error.message}`
          : 'Failed to save profile. Please try again.'
      });

      // Hide error alert after 5 seconds
      setTimeout(() => {
        setAlertInfo(null);
      }, 5000);
    }
  }
  
  const handleLogout = () => {
    signOut();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-primary/5">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl animate-pulse"></div>
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#131f38] flex overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#111827]/90 backdrop-blur-md border-b border-white/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/90 to-blue-600/70 flex items-center justify-center text-white font-semibold text-sm">
              {profile?.basic_info?.name?.[0]?.toUpperCase() || userDetails?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-medium text-white text-sm">
                {profile?.basic_info?.name || userDetails?.email?.split('@')[0] || 'User'}
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-8 w-8 p-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111827]/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          <MobileNavButton
            icon={<User />}
            label="Info"
            isActive={activeTab === 'basic-info'}
            onClick={() => setActiveTab('basic-info')}
          />
          <MobileNavButton
            icon={<Briefcase />}
            label="Work"
            isActive={activeTab === 'experience'}
            onClick={() => setActiveTab('experience')}
          />
          <MobileNavButton
            icon={<GraduationCap />}
            label="Education"
            isActive={activeTab === 'education'}
            onClick={() => setActiveTab('education')}
          />
          <MobileNavButton
            icon={<FolderGit2 />}
            label="Projects"
            isActive={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
          />
          <MobileNavButton
            icon={<Trophy />}
            label="Awards"
            isActive={activeTab === 'achievements'}
            onClick={() => setActiveTab('achievements')}
          />
          <MobileNavButton
            icon={<Mail />}
            label="Templates"
            isActive={activeTab === 'templates'}
            onClick={() => setActiveTab('templates')}
          />
        </div>
      </div>

      {/* Floating Sidebar Toggle Button - Desktop Only */}
      {isSidebarHidden && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block fixed left-4 top-4 z-50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSidebarHidden(false)
              setSidebarCollapsed(false)
            }}
            className="h-10 w-10 p-0 bg-[#111827]/90 backdrop-blur-md border border-white/10 hover:bg-[#111827] text-white rounded-full shadow-lg"
            title="Show sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Desktop Sidebar */}
      {!isSidebarHidden && (
      <motion.div 
          className={`hidden lg:block fixed left-0 top-0 h-full bg-[#111827]/90 backdrop-blur-md shadow-xl z-50 transition-all duration-300 
          ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}
        initial={{ x: -20, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#111827]/90 to-[#111827]/60">
          <div className="flex items-center justify-between">

            {!isSidebarCollapsed && (
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/90 to-blue-600/70 flex items-center justify-center text-white font-semibold ring-2 ring-[#111827]">
                    {profile?.basic_info?.name?.[0]?.toUpperCase() || userDetails?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-[#111827]"></div>
                </div>
                <div>
                  <h3 className="font-medium text-white/90">
                    {profile?.basic_info?.name || userDetails?.email?.split('@')[0] || 'User'}
                  </h3>
                  <p className="text-xs text-blue-400/80">
                    {profile?.basic_info?.title || 'Complete your profile'}
                  </p>
                </div>
              </motion.div>
            )}
            <div className="hidden lg:flex items-center gap-2">
            <Button 
              variant="ghost" 
                size="sm"
                className="hover:bg-blue-500/10 rounded-full text-white/80 h-8 w-8 p-0"
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronLeft className={`h-3 w-3 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-red-500/10 rounded-full text-white/80 h-8 w-8 p-0"
                onClick={() => setSidebarHidden(true)}
                title="Hide sidebar"
              >
                <X className="h-3 w-3" />
            </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <div className={`mb-6 ${isSidebarCollapsed ? 'text-center' : 'px-2'}`}>
            {!isSidebarCollapsed && <p className="text-xs text-gray-400 font-medium uppercase tracking-wider opacity-70">Profile Sections</p>}
          </div>
          <NavButton
            icon={<User />}
            label="Basic Info"
            isActive={activeTab === 'basic-info'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('basic-info')}
          />
          <NavButton
            icon={<Briefcase />}
            label="Experience"
            isActive={activeTab === 'experience'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('experience')}
          />
          <NavButton
            icon={<GraduationCap />}
            label="Education"
            isActive={activeTab === 'education'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('education')}
          />
          <NavButton
            icon={<FolderGit2 />}
            label="Projects"
            isActive={activeTab === 'projects'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('projects')}
          />
          <NavButton
            icon={<Trophy />}
            label="Achievements"
            isActive={activeTab === 'achievements'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('achievements')}
          />
          <div className="my-6 border-t border-white/5"></div>
          <div className={`mb-2 ${isSidebarCollapsed ? 'text-center' : 'px-2'}`}>
            {!isSidebarCollapsed && <p className="text-xs text-gray-400 font-medium uppercase tracking-wider opacity-70">Options</p>}
          </div>
          <NavButton
            icon={<Mail />}
            label="Templates"
            isActive={activeTab === 'templates'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveTab('templates')}
          />
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/5 bg-gradient-to-t from-[#111827]/90 to-[#111827]/60">
          <AnimatePresence>
            {alertInfo && alertInfo.show && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute bottom-full left-4 right-4 mb-4 p-3 rounded-lg shadow-xl backdrop-blur-sm ${
                  alertInfo.type === 'success' 
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {alertInfo.type === 'success' ? (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-medium text-sm">{alertInfo.message}</span>
                  </div>
                  <button 
                    onClick={() => setAlertInfo(null)}
                    className="text-sm hover:text-white/90 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-3">
            <Button 
              className="w-full relative group overflow-hidden bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSave}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/80 via-blue-500/60 to-blue-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -z-10"></span>
              <span className="absolute inset-0 w-0 bg-white/10 h-full group-hover:w-full transition-all duration-700 ease-out rounded-md -z-10"></span>
              <Save className="h-4 w-4 mr-2" />
              {!isSidebarCollapsed && (
                <>
                  Save Changes
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    ✓
                  </span>
                </>
              )}
            </Button>

            <Button 
              className="w-full relative group overflow-hidden bg-transparent border border-red-500/50 text-red-400 hover:text-red-300"
              onClick={handleLogout}
              variant="outline"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/10 via-red-400/5 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="mr-2"
              >
                <LogOut className="h-4 w-4" />
              </motion.div>
              {!isSidebarCollapsed && (
                <span className="group-hover:font-medium transition-all">Logout</span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 
        ${isSidebarHidden ? 'lg:ml-0' : isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} 
        ml-0`}>
        {/* Content Area */}
        <div className="p-4 lg:p-8 pt-24 lg:pt-20 pb-24 lg:pb-8 max-w-5xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-sm p-6 relative"
          >
            <div className="absolute inset-0  -z-10 rounded-xl"></div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="basic-info" className="animate-in fade-in-50 slide-in-from-left-2 duration-300 text-white">
                <div className="dark-mode-section" style={{
                  '--input-bg': 'rgba(19, 31, 56, 0.7)',
                  '--border-color': 'rgba(59, 130, 246, 0.2)',
                  '--text-color': 'white'
                } as React.CSSProperties}>
                  <style dangerouslySetInnerHTML={{ 
                    __html: `
                    .dark-mode-section label {
                      color: white !important;
                    }
                    .dark-mode-section input, 
                    .dark-mode-section textarea {
                      background-color: rgba(19, 31, 56, 0.7) !important;
                      border-color: rgba(59, 130, 246, 0.2) !important;
                      color: white !important;
                      border-radius: 0.375rem !important;
                    }
                    .dark-mode-section input:focus, 
                    .dark-mode-section textarea:focus {
                      outline: none !important;
                      box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.8) !important;
                    }
                    .dark-mode-section h2 {
                      color: white !important;
                    }
                  `}} />
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Basic Information</h2>
                    <p className="text-sm text-blue-400/80">Add your personal details to complete your profile</p>
                  </div>
                  <BasicInfoSection />
                </div>
              </TabsContent>
              <TabsContent value="experience" className="animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <div className="dark-mode-section">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Work Experience</h2>
                    <p className="text-sm text-blue-400/80">Add your work history and professional experience</p>
                  </div>
                  <ExperienceSection />
                </div>
              </TabsContent>
              <TabsContent value="education" className="animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <div className="dark-mode-section">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Education</h2>
                    <p className="text-sm text-blue-400/80">Add your educational background and qualifications</p>
                  </div>
                  <EducationSection />
                </div>
              </TabsContent>
              <TabsContent value="projects" className="animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <div className="dark-mode-section">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Projects</h2>
                    <p className="text-sm text-blue-400/80">Add your personal and professional projects</p>
                  </div>
                  <ProjectsSection />
                </div>
              </TabsContent>
              <TabsContent value="achievements" className="animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <div className="dark-mode-section">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Achievements</h2>
                    <p className="text-sm text-blue-400/80">Add your certifications, awards and accomplishments</p>
                  </div>
                  <AchievementsSection />
                </div>
              </TabsContent>
              <TabsContent value="templates" className="animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <div className="dark-mode-section">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-lg font-medium text-white">Resume Templates</h2>
                    <p className="text-sm text-blue-400/80">Choose and customize your resume template</p>
                  </div>
                  <TemplatesSection />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Mobile Floating Save Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Button
            onClick={handleSave}
            className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg p-0"
          >
            <Save className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

// Helper Components
interface NavButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
  onClick: () => void
}

function NavButton({ icon, label, isActive, isCollapsed, onClick }: NavButtonProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {isActive && !isCollapsed && (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute left-0 top-0 w-1 h-full bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start ${isActive 
          ? 'bg-primary/10 text-primary pl-4' 
          : 'hover:bg-muted/30 text-foreground/80 hover:text-foreground'}`}
        onClick={onClick}
      >
        <motion.span 
          className={`${isActive ? 'text-primary' : ''}`}
          initial={{ scale: 1 }}
          animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
        {!isCollapsed && (
          <motion.span 
            className={`ml-3 font-medium ${isActive ? 'text-primary' : ''}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
        
        {isActive && isCollapsed && (
          <motion.div 
            layoutId="activeDot"
            className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
          />
        )}
      </Button>
    </motion.div>
  )
}

// Mobile Navigation Button Component
interface MobileNavButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function MobileNavButton({ icon, label, isActive, onClick }: MobileNavButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'text-blue-400 bg-blue-500/10' 
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-1"
      >
        {icon}
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <motion.div
          layoutId="mobileActiveIndicator"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-400 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
}

