import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { CustomToaster } from "@/components/ui/custom-toaster";
import {
  Menu,
  X,
  Sparkles,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import { useAuth } from "@/hooks/user-auth";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

const LandingPage = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGetStarted = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-black text-white">
        {/* Minimal Magic UI Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          
          {/* Magic grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          {/* Subtle floating elements */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Clean Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolling
                ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-3"
                : "bg-transparent py-5"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex h-14 items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative flex items-center justify-center h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <span className="font-semibold text-lg">HuntShot</span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/5"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Button
                    onClick={handleGetStarted}
                    className="bg-white text-black hover:bg-white/90 font-medium"
                  >
                    Get Started
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                  >
                    {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Simple Mobile menu */}
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/5"
                >
                  <div className="p-4 space-y-3">
                    <Link to="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Log in
                      </Button>
                    </Link>
                    <Button onClick={handleGetStarted} className="w-full">
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>

          {/* Landing Page Sections */}
          <Hero handleGetStarted={handleGetStarted} />
          <Features />
          <HowItWorks handleGetStarted={handleGetStarted} />

          {/* Minimalistic Footer */}
          <footer className="py-12 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="flex items-center justify-center h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-semibold">HuntShot</span>
                </div>

                <div className="flex space-x-6">
                  <Link
                    to="https://instagram.com/huntshot"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    to="https://twitter.com/huntshot"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    to="mailto:hello@huntshot.com"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-sm text-white/40">
                  © 2024 HuntShot. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <CustomToaster />
    </ThemeProvider>
  );
};

export default LandingPage;
