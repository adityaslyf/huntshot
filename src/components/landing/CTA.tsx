import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAProps {
  handleGetStarted: (e: React.MouseEvent) => void;
}

const CTA = ({ handleGetStarted }: CTAProps) => {
  return (
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
          <div className="relative bg-gradient-to-b from-[#0A0F1E]/90 via-[#101730]/90 to-[#0A0F1E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
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
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-lg py-6 px-8 shadow-xl shadow-blue-900/10 w-full sm:w-auto group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute top-0 left-0 w-2/3 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:animate-shine"></span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 