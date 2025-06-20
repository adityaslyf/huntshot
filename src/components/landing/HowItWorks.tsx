import { motion } from "framer-motion";
import { ArrowRight, Upload, Brain, User, Mail, Sparkles } from "lucide-react";

interface HowItWorksProps {
  handleGetStarted: (e: React.MouseEvent) => void;
}

const HowItWorks = ({ handleGetStarted }: HowItWorksProps) => {
  const steps = [
    {
      step: "01",
      title: "Upload Resume",
      description: "Simply upload your existing resume or CV in any format – PDF, DOC, or DOCX.",
      icon: <Upload className="h-6 w-6 text-blue-400" />,
      duration: "2 minutes",
    },
    {
      step: "02",
      title: "AI Processing",
      description: "Our AI extracts and organizes your professional information with 99.2% accuracy.",
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      duration: "30 seconds",
    },
    {
      step: "03",
      title: "Create Profile",
      description: "Review and customize your professional profile that highlights your skills and experience.",
      icon: <User className="h-6 w-6 text-green-400" />,
      duration: "5 minutes",
    },
    {
      step: "04",
      title: "Generate Emails",
      description: "Create personalized email templates tailored to specific roles and companies.",
      icon: <Mail className="h-6 w-6 text-orange-400" />,
      duration: "1 minute",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full py-2 px-4 border border-white/10 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm text-white/80">Simple Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
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

        {/* Process steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-8 left-[12%] right-[12%] h-px hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="h-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="group relative text-center"
              >
                {/* Step card */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-white/10 transition-colors">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Duration */}
                  <div className="text-sm text-white/50">
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to transform your career?
            </h3>
            <p className="text-white/70 mb-6">
              Join thousands of professionals who have already boosted their job applications with HuntShot
            </p>
            <motion.button
              onClick={handleGetStarted}
              className="bg-white text-black hover:bg-white/90 font-medium px-8 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 