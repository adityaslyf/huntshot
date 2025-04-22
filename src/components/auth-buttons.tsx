import { Button } from "./ui/button"
import { useAuth } from "@/hooks/user-auth"
import { Loader2, LogOut, Mail, UserCircle, ChevronDown } from "lucide-react"
import { useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function AuthButtons() {
  const { 
    isSignedIn, 
    isLoaded,
    signOut, 
    signIn, 
    fetchUserDetails, 
    userDetails 
  } = useAuth()

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  const handleSignIn = () => {
    signIn("", (_, error) => {
      if (error) {
        console.error('Authentication failed:', error)
      }
    })
  }

  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Button variant="glass" disabled className="h-9 px-3">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {!isSignedIn ? (
        <motion.div
          key="signin"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Button 
            variant="gradient" 
            onClick={handleSignIn}
            className="font-medium"
            leftIcon={<UserCircle className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          key="user-menu"
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="glass" 
                className="rounded-full pl-3 pr-4 h-9 gap-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" alt={userDetails?.email || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userDetails?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium max-w-[80px] truncate">
                  {userDetails?.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass-card p-1 border-0 shadow-xl" align="end">
              <DropdownMenuLabel className="flex items-center gap-2 p-4 border-b border-border/10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={userDetails?.email || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userDetails?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Account</span>
                  <span className="text-xs text-muted-foreground">Manage your settings</span>
                </div>
              </DropdownMenuLabel>
              <div className="p-2">
                <DropdownMenuItem className="flex gap-2 rounded-lg mb-1 cursor-pointer">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{userDetails?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 rounded-lg cursor-pointer">
                  <UserCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm truncate">{userDetails?.user_id}</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="my-1 bg-border/10" />
              <div className="p-2">
                <DropdownMenuItem 
                  onClick={signOut} 
                  className="flex gap-2 rounded-lg text-destructive focus:bg-destructive/5 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
