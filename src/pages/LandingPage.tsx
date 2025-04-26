import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { CustomToaster } from "@/components/ui/custom-toaster";
import {
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/user-auth";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

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
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Enhanced background with unique gradients and shapes */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Main background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#101730] to-[#0A0F1E] opacity-80"></div>

          {/* Animated gradient circles */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Abstract shapes */}
            <div className="absolute top-[5%] left-[10%] w-[35%] h-[40%] rounded-full bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-violet-600/10 blur-[120px] animate-pulse-slow"></div>
            <div className="absolute top-[40%] right-[5%] w-[30%] h-[50%] rounded-full bg-gradient-to-l from-blue-600/10 via-cyan-600/10 to-blue-400/10 blur-[100px] animate-float-slow"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[40%] rounded-full bg-gradient-to-tr from-fuchsia-600/10 via-blue-600/10 to-violet-600/10 blur-[130px] animate-pulse-slow animation-delay-2000"></div>

            {/* Mesh gradient noise overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light"></div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Header Navigation - Enhanced with glass morphism */}
          <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolling
                ? "bg-[#060B19]/80 backdrop-blur-lg border-b border-white/10 py-3"
                : "bg-transparent py-5"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="flex h-16 md:h-20 items-center justify-between">
                <div className="flex items-center">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 mr-8 group"
                  >
                    <div className="relative flex items-center justify-center h-9 w-9">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur-[6px] opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                      <Sparkles className="h-5 w-5 text-white relative z-10" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                      HuntShot
                    </span>
                  </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="hover:bg-white/5 font-medium relative overflow-hidden group"
                    >
                      <span className="relative z-10">Log in</span>
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 group-hover:w-full transition-all duration-300"></span>
                    </Button>
                  </Link>
                  <Button
                    onClick={handleGetStarted}
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
                  >
                    <span className="relative z-10">Get Started</span>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="absolute top-0 left-0 w-3/4 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:animate-shine"></span>
                  </Button>
                </div>

                <div className="md:hidden flex items-center">
                  <Button
                    variant="ghost"
                    className="p-1"
                    onClick={toggleMobileMenu}
                  >
                    {showMobileMenu ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden p-4 bg-[#0c1222] border-t border-white/5"
              >
                <div className="flex flex-col space-y-3">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full justify-center border-white/10"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Button
                    onClick={handleGetStarted}
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </header>

          {/* Landing Page Sections */}
          <Hero handleGetStarted={handleGetStarted} />
          <Features />
          <HowItWorks handleGetStarted={handleGetStarted} />
          <CTA handleGetStarted={handleGetStarted} />

          {/* Footer */}
          <footer className="py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-12">
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="relative flex items-center justify-center h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-lg">HuntShot</span>
                  </div>
                  <p className="text-sm text-white/50 mb-4 max-w-xs">
                    The intelligent resume and profile management platform for
                    modern professionals.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-white/40">
                    Product
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/features"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pricing"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/templates"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Templates
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-white/40">
                    Company
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/about"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/careers"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-white/40">
                    Legal
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/privacy"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        Terms
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-white/40 mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} HuntShot. All rights
                  reserved.
                </p>
                <div className="flex space-x-6">
                  {["Twitter", "LinkedIn", "GitHub"].map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-white/40 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>

          <CustomToaster />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
