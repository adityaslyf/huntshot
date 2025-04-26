import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { CustomToaster } from "@/components/ui/custom-toaster";
import {
  Sparkles,
  FileText,
  User,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useAuth } from "@/hooks/user-auth";

const features = [
  {
    title: "AI Resume Parsing",
    description:
      "Our AI extracts all key information from your resume automatically with industry-leading accuracy.",
    icon: <FileText className="h-7 w-7 text-blue-400" />,
  },
  {
    title: "Professional Profile",
    description:
      "Create a customizable professional profile that highlights your most relevant skills and experience.",
    icon: <User className="h-7 w-7 text-blue-400" />,
  },
  {
    title: "AI Email Templates",
    description:
      "Generate personalized email templates tailored to specific roles and companies to boost your application success.",
    icon: <Mail className="h-7 w-7 text-blue-400" />,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { userDetails, signIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize any necessary setup
  }, []);

  // Handle navigation with profile check
  const handleGetStarted = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userDetails?.user_id) {
      navigate("/login");
      return;
    }

    // User is logged in, sign in action
    signIn("", (_, error) => {
      if (error) {
        console.error("Authentication failed:", error);
      } else {
        navigate("/home");
      }
    });
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
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5">
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
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
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

          {/* Hero Section - Enhanced with unique animations */}
          <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Animated badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-4 inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full py-1.5 px-4 backdrop-blur-lg border border-purple-500/20 relative overflow-hidden"
                  >
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 animate-shine-slow"></div>

                    <div className="relative flex items-center">
                      <span className="flex h-2 w-2 relative mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                      <span className="text-xs font-medium text-purple-300">
                        Just launched new AI features
                      </span>
                    </div>
                  </motion.div>

                  {/* Animated headline with staggered text reveal */}
                  <div className="overflow-hidden mb-8">
                    <motion.h1
                      className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.div
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.5,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div>Transform your</div>
                      </motion.div>

                      <motion.div
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.65,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="relative inline-block">
                          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                            resume
                          </span>
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                          ></motion.div>
                        </div>
                        <span> into a</span>
                      </motion.div>

                      <motion.div
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.8,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="relative inline-block">
                          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                            winning profile
                          </span>
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.4 }}
                          ></motion.div>
                        </div>
                      </motion.div>
                    </motion.h1>
                  </div>

                  {/* Animated description with typewriter effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="mb-10"
                  >
                    <p className=" text-sm md:text-xl text-white/70 max-w-xl">
                      HuntShot uses AI to parse your resume, extract key
                      information, and create a standout professional profile
                      that gets noticed by recruiters. Generate personalized
                      email templates tailored for specific roles and companies
                      to significantly boost your application success rate.
                    </p>
                  </motion.div>

                  {/* Animated buttons with hover effects */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  >
                    <button
                      onClick={handleGetStarted}
                      className="group relative inline-flex items-center justify-center px-8 py-4 md:py-5 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white font-medium shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-purple-500/25"
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 w-full h-full translate-x-full -translate-y-full transform bg-white/30 opacity-0 transition-all group-hover:translate-x-[-30%] group-hover:translate-y-[-30%] group-hover:rotate-[20deg] group-hover:opacity-20 duration-700"></span>
                      <span className="flex items-center relative z-10">
                        Start For Free
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </button>
                  </motion.div>
                </motion.div>

                {/* Animated mockup with floating elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="relative hidden lg:block"
                >
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>

                  <motion.div
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
                    animate={{
                      y: [0, 20, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  ></motion.div>

                  {/* Main mockup with glass effect */}
                  <div className="relative">
                    {/* Glass effect border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg animate-pulse-slow"></div>

                    {/* Glass card */}
                    <div className="relative bg-gradient-to-b from-white/[0.09] to-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden h-[580px]">
                      {/* Subtle grid pattern */}
                      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-[0.03] bg-repeat"></div>

                      <div className="relative h-full w-full overflow-hidden">
                        {/* Dashboard preview */}
                        <motion.img
                          src="https://placehold.co/1200x800/101730/FFFFFF/png?text=Profile+Dashboard&font=montserrat"
                          alt="HuntShot Dashboard Preview"
                          className="object-cover w-full h-full"
                          initial={{ scale: 1.1, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ duration: 1, delay: 1 }}
                        />

                        {/* Floating elements on the mockup */}
                        <motion.div
                          className="absolute top-6 left-6 right-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-lg py-2 px-3"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                        >
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <div className="text-xs text-white/80 font-medium">
                              Profile score: 92%
                            </div>
                          </div>
                        </motion.div>

                        {/* Floating testimonial */}
                        <motion.div
                          className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-lg border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8, duration: 0.5 }}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="relative w-10 h-10 flex-shrink-0">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-[1px]"></div>
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                                A
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">Alex Morgan</div>
                              <div className="text-sm text-white/70">
                                Full Stack Developer
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-white/80">
                            "HuntShot transformed my resume into an impressive
                            profile that landed me interviews at top tech
                            companies."
                          </p>
                        </motion.div>

                        {/* Floating elements */}
                        <motion.div
                          className="absolute top-1/4 right-10 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-xs text-white/80"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2, duration: 0.5 }}
                          style={{ y: 0 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500/80 rounded-full mr-2"></div>
                            <span>Skills matched: 18/20</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute top-2/4 left-10 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-xs text-white/80"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.2, duration: 0.5 }}
                          style={{ y: 0 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500/80 rounded-full mr-2"></div>
                            <span>Experience: Verified ✓</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section with 3D cards */}
          <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-[0.02] bg-repeat"></div>

            {/* Section divider line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
              {/* Section header with animated highlight */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full py-1.5 px-4 backdrop-blur-xl border border-purple-500/20 mb-6"
                >
                  <div className="flex items-center">
                    <span className="flex h-2 w-2 relative mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-xs font-medium text-purple-300">
                      Exclusive Features
                    </span>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-5"
                >
                  Everything you need for a{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                      perfect profile
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    ></motion.span>
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl text-white/70 max-w-2xl mx-auto"
                >
                  Our intelligent platform combines cutting-edge AI with
                  beautiful design to help you stand out
                </motion.p>
              </motion.div>

              {/* 3D Feature Cards */}
              <div className="flex flex-wrap justify-center items-stretch gap-8">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotateX: 10, y: 80 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      translateY: -10,
                      rotateY: 5,
                      rotateX: 5,
                      scale: 1.02,
                    }}
                    className="group relative transform-gpu w-full md:w-[30%] flex-grow flex-shrink-0 max-w-md"
                  >
                    {/* Card glow hover effect */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ opacity: [0, 0.15, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    ></motion.div>

                    {/* Card container */}
                    <div className="relative bg-gradient-to-b from-white/[0.15] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full overflow-hidden transform transition-all duration-300 flex flex-col">
                      {/* Reflective light effect */}
                      <div className="absolute -inset-[300%] bg-gradient-to-t from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-all duration-1000"></div>

                      {/* Icon with glow effect */}
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-blue-600/50 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-xl"></div>
                        <div className="relative p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 rounded-xl inline-block mb-6 group-hover:shadow-lg transition-all duration-300">
                          {feature.icon}
                        </div>
                      </div>

                      {/* Text with animations */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-3 bg-gradient-to-br from-white to-white/80 bg-clip-text group-hover:text-transparent transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>

                      {/* Animated arrow */}
                      <div className="mt-6 overflow-hidden h-6">
                        <motion.div
                          className="flex items-center font-medium text-purple-400 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300"
                          initial={{ y: 30 }}
                          whileInView={{ y: 30 }}
                          whileHover={{ y: 0 }}
                        >
                          Learn more{" "}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      </div>

                      {/* 3D depth lines */}
                      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-0 right-0 h-1/2 w-px bg-gradient-to-b from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature showcase with parallax effect */}
              <motion.div
                className="mt-32 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Content column with staggered reveal */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full py-1.5 px-4 backdrop-blur-lg border border-purple-500/20 mb-6"
                    >
                      <span className="flex h-2 w-2 relative mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                      <span className="text-xs font-medium text-purple-300">
                        AI-Powered Analysis
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-3xl md:text-4xl font-bold mb-6"
                    >
                      Intelligent Resume Extraction
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-lg text-white/70 mb-8"
                    >
                      Our advanced AI extracts key information from your resume,
                      organizing your experience, skills, and achievements into
                      a structured profile that stands out to recruiters.
                    </motion.p>

                    {/* Animated feature list */}
                    <motion.ul className="space-y-4">
                      {[
                        "Smart skill categorization and ranking",
                        "Automatic experience highlighting",
                        "Education and certification detection",
                        "Custom organization options",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                        >
                          <div className="mt-1 mr-3 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-[1px]"></div>
                            <CheckCircle2 className="h-5 w-5 text-white relative" />
                          </div>
                          <span className="text-white/80">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  {/* Image column with parallax effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Floating elements around the image */}
                    <motion.div
                      className="absolute top-10 -left-5 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 z-10 shadow-xl"
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Skills</div>
                          <div className="text-xs text-white/60">
                            12 extracted
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-5 -right-5 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 z-10 shadow-xl"
                      animate={{ y: [0, 15, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Experience</div>
                          <div className="text-xs text-white/60">
                            5+ years recognized
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Main image with glass effect */}
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl blur-lg"></div>
                      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.05] p-1">
                        <img
                          src="https://placehold.co/800x600/101730/FFFFFF/png?text=AI+Resume+Parser&font=montserrat"
                          alt="AI Resume Parser"
                          className="rounded-lg w-full"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* How It Works - Cinematic version */}
          <section className="py-28 md:py-36 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top and bottom gradient lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>

              {/* Animated background elements */}
              <div className="absolute right-0 top-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] animate-float-slow"></div>
              <div className="absolute left-0 bottom-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] animate-float-slow animation-delay-200"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
              {/* Section header with text reveal animation */}
              <div className="text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full py-1.5 px-4 backdrop-blur-lg border border-purple-500/20 mb-6"
                >
                  <div className="flex items-center">
                    <span className="flex h-2 w-2 relative mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-xs font-medium text-purple-300">
                      Simple Process
                    </span>
                  </div>
                </motion.div>

                <div className="overflow-hidden mb-6">
                  <motion.h2
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold"
                  >
                    How{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                      HuntShot
                    </span>{" "}
                    Works
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-white/70 max-w-2xl mx-auto"
                >
                  Simple journey from resume to successful application
                </motion.p>
              </div>

              {/* Process steps with cinematic animations - Enhanced with more detailed flow */}
              <div className="relative">
                {/* Connecting line with arrows */}
                <motion.div
                  className="absolute top-28 left-[12%] right-[12%] h-0.5 hidden md:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 relative">
                    {/* Arrow markers */}
                    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-4 h-4 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-[50%] -translate-y-1/2 w-4 h-4 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-[75%] -translate-y-1/2 w-4 h-4 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                  {[
                    {
                      step: "01",
                      title: "Upload Resume",
                      description:
                        "Simply upload your existing resume or CV in any format – PDF, DOC, or DOCX.",
                      icon: (
                        <div className="p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                      ),
                    },
                    {
                      step: "02",
                      title: "AI Processing",
                      description:
                        "Our advanced AI extracts and organizes your professional information beautifully.",
                      icon: (
                        <div className="p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                            <path d="M16.5 19a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path>
                            <path d="M3 9a3 3 0 0 1 6 0m0 0a3 3 0 1 0 6 0m0 0a3 3 0 1 0 6 0"></path>
                          </svg>
                        </div>
                      ),
                    },
                    {
                      step: "03",
                      title: "Create Profile",
                      description:
                        "Review, customize your professional profile that highlights your skills and experience.",
                      icon: (
                        <div className="p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      ),
                    },
                    {
                      step: "04",
                      title: "Email & Share",
                      description:
                        "Generate personalized emails and share your profile with potential employers.",
                      icon: (
                        <div className="p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                      ),
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3 + i * 0.15,
                        type: "spring",
                        stiffness: 50,
                      }}
                      className="relative"
                    >
                      {/* Numbered step circle with glow */}
                      <motion.div
                        className="w-16 h-16 md:w-18 md:h-18 mx-auto mb-5 relative z-10"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-70"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                        <div className="absolute inset-[2px] bg-black rounded-full"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                          {item.step}
                        </div>

                        {/* Animated ping effect */}
                        <div className="absolute inset-0 rounded-full">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 to-blue-500/50 animate-ping opacity-20"></div>
                        </div>
                      </motion.div>

                      {/* Step content with 3D-like card */}
                      <motion.div
                        className="relative bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center h-full"
                        whileHover={{
                          translateY: -8,
                          boxShadow:
                            "0 20px 80px -20px rgba(120, 87, 255, 0.2)",
                        }}
                      >
                        {/* Icon with glowing background */}
                        <div className="w-12 h-12 mx-auto mb-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-md"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            {item.icon}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                          {item.title}
                        </h3>
                        <p className="text-white/70">{item.description}</p>

                        {/* Decorative bottom border */}
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional action button */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={handleGetStarted}
                  className="group relative inline-flex items-center justify-center px-8 py-4 md:py-5 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white font-medium shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-purple-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 w-full h-full translate-x-full -translate-y-full transform bg-white/30 opacity-0 transition-all group-hover:translate-x-[-30%] group-hover:translate-y-[-30%] group-hover:rotate-[20deg] group-hover:opacity-20 duration-700"></span>
                  <span className="flex items-center relative z-10">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-full h-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[100px] animate-float-slow"></div>
                <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[100px] animate-float-slow animation-delay-200"></div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-xl opacity-70"></div>

                {/* Content card */}
                <div className="relative bg-gradient-to-b from-white/[0.09] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                  {/* Animated grid background */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03]"></div>

                  {/* Shine effect */}
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine-slow"></div>

                  <div className="relative text-center mb-10 max-w-3xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full py-1 px-3 text-xs font-medium text-blue-300 backdrop-blur-lg border border-blue-500/20 mb-4"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                      Start your journey today
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-3xl md:text-5xl font-bold mb-6"
                    >
                      Ready to elevate your{" "}
                      <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        career?
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-xl text-white/70 max-w-2xl mx-auto"
                    >
                      Join thousands of professionals who have transformed their
                      job search with HuntShot
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                  >
                    <Button
                      size="lg"
                      onClick={handleGetStarted}
                      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 px-8 shadow-xl shadow-blue-900/10 w-full sm:w-auto group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started for Free
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="absolute top-0 left-0 w-2/3 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:animate-shine"></span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

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
