import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  handleGetStarted: (e: React.MouseEvent) => void;
}

const Hero = ({ handleGetStarted }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Simple badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full py-2 px-4 border border-white/10 mb-6"
          >
            <span className="text-sm text-white/80">AI-powered resume parsing</span>
          </motion.div>

          {/* Clean headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Transform your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              resume
            </span>{" "}
            into a winning profile
          </motion.h1>

          {/* Simple description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            HuntShot uses AI to parse your resume, extract key information, and create a standout professional profile that gets noticed by recruiters.
          </motion.p>

          {/* Clean buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-medium h-10 px-6 text-sm w-auto sm:h-12 sm:px-8 sm:text-base"
            >
              Get Started Free
              {/* <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" /> */}
            </Button>
          </motion.div>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Simple border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm"></div>
          
          {/* Video container */}
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden aspect-video">
            {/* Simple grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Video placeholder content */}
            <div className="relative h-full flex items-center justify-center">
              {/* Play button overlay */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 