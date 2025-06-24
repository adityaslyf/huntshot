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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
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
          className="text-center mb-16 md:mb-20"
          >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            A simple, streamlined journey from resume to successful application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Step Number - More Visible */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg border-2 border-white/20">
                <span className="text-white text-lg font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="flex flex-col items-center">
                {/* Icon Container - No Rotation */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {step.description}
                </p>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 