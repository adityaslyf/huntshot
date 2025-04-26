import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HowItWorksProps {
  handleGetStarted: (e: React.MouseEvent) => void;
}

const HowItWorks = ({ handleGetStarted }: HowItWorksProps) => {
  return (
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
                  className="relative bg-gradient-to-b from-white/[0.15] to-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center h-full"
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
            className="group relative inline-flex items-center justify-center px-8 py-4 md:py-5 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white font-medium shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-purple-500/25 mt-12"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-2/3 h-full bg-white/20 skew-x-12 transform -translate-x-full group-hover:animate-shine"></span>
            {/* Slow shine animation like in CTA section */}
            <span className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine-slow"></span>
            <span className="flex items-center relative z-10">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 