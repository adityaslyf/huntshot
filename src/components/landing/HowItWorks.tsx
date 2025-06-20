import { motion } from "framer-motion";
import { Upload, Brain, User, Mail } from "lucide-react";
import { useRef } from "react";

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const steps = [
    {
      step: "01",
      title: "Upload Resume",
      icon: <Upload className="h-8 w-8 text-blue-400" />,
      color: "blue",
      visual: "📄",
    },
    {
      step: "02",
      title: "AI Processing",
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      color: "purple",
      visual: "⚡",
    },
    {
      step: "03",
      title: "Create Profile",
      icon: <User className="h-8 w-8 text-green-400" />,
      color: "green",
      visual: "👤",
    },
    {
      step: "04",
      title: "Generate Emails",
      icon: <Mail className="h-8 w-8 text-orange-400" />,
      color: "orange",
      visual: "✉️",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full py-2 px-4 border border-white/10 mb-6"
          >
            <span className="text-sm text-white/80">Simple Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              HuntShot
            </span>{" "}
            Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Simple journey from resume to successful application in just a few minutes
          </motion.p>
        </motion.div>

        {/* Visual Process Flow */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                ref={i === 0 ? step1Ref : i === 1 ? step2Ref : i === 2 ? step3Ref : step4Ref}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>

                  {/* Visual Emoji */}
                  <div className="text-4xl mb-4 text-center">{step.visual}</div>

                  {/* Animated Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white text-center mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Progress Indicator */}
                  <div className="mt-4 flex justify-center">
                    <motion.div
                      className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r from-${step.color}-400 to-${step.color}-600`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Beams connecting the steps */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <defs>
              <linearGradient id="processBeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            {/* Beam 1: Step 1 to Step 2 */}
            <motion.path
              d="M 25% 50% Q 37.5% 30% 50% 50%"
              stroke="url(#processBeamGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="20 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            
            {/* Beam 2: Step 2 to Step 3 */}
            <motion.path
              d="M 50% 50% Q 62.5% 30% 75% 50%"
              stroke="url(#processBeamGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="20 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.0 }}
            />
            
            {/* Beam 3: Step 3 to Step 4 */}
            <motion.path
              d="M 75% 50% Q 87.5% 30% 100% 50%"
              stroke="url(#processBeamGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="20 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.2 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 