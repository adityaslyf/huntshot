import { motion } from "framer-motion";
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
            </Button>
          </motion.div>
        </motion.div>

        {/* Video Container */}
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
            {/* Local compressed video */}
            <video
              className="w-full h-full object-cover rounded-2xl"
              controls
              autoPlay
              muted
              loop
              preload="metadata"
              poster="/path-to-thumbnail.jpg" // Optional: you can add a thumbnail
            >
              <source src="/demo-compressed.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 