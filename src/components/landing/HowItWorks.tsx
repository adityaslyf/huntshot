import { motion } from "framer-motion";

import {
  Upload,
  BrainCircuit,
  Award,
  Mails,
} from "lucide-react";


const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Start by uploading your resume in PDF or DOCX format.",
  },
  {
    icon: BrainCircuit,
    title: "AI Processing",
    description: "Our AI carefully extracts key information from your document.",
  },
  {
    icon: Award,
    title: "Create Profile",
    description:
      "A professional profile is automatically generated for you to review.",
  },
  {
    icon: Mails,
    title: "Generate Emails",
    description:
      "Create personalized outreach emails based on your new profile.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent tracking-tight">
            How It Works
          </h2>
          <p className="text-lg md:text-xl font-sans text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            A simple, streamlined journey from resume to successful application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              className="group relative p-8 rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden text-center hover:border-white/20 transition-all duration-500 hover:bg-slate-900/70 hover:scale-105"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-mono font-bold tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300 tracking-wide">
                  {step.title}
                </h3>
                
                <p className="text-white/70 font-sans leading-relaxed group-hover:text-white/80 transition-colors duration-300 font-normal">
                  {step.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-blue-400/30 group-hover:bg-blue-400/60 transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-purple-400/30 group-hover:bg-purple-400/60 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
};

export default HowItWorks; 