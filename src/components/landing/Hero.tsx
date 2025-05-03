import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  handleGetStarted: (e: React.MouseEvent) => void;
}

const Hero = ({ handleGetStarted }: HeroProps) => {
  return (
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
                      initial={{ scaleX: 0 }}
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
                      initial={{ scaleX: 0 }}
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
              <p className="text-sm md:text-xl text-white/70 max-w-xl">
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
                    src="https://placehold.co/1200x800/101730/FFFFFF/png?text=Professional+Profile+Builder&font=montserrat"
                    alt="HuntShot Profile Builder Preview"
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
                        Resume completion: 92%
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
                          U
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          Ayush Tiwari
                        </div>
                        <div className="text-sm text-white/70">
                          Flutter Developer
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
                      <span>Profile strength: 95%</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 