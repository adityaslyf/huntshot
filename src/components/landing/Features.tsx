import { motion } from "framer-motion";
import { FileText, User, Mail, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Resume Parsing",
    description:
      "Our AI extracts all key information from your resume automatically with industry-leading accuracy.",
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    color: "blue",
  },
  {
    title: "Professional Profile",
    description:
      "Create a customizable professional profile that highlights your most relevant skills and experience.",
    icon: <User className="h-6 w-6 text-purple-400" />,
    color: "purple",
  },
  {
    title: "AI Email Templates",
    description:
      "Generate personalized email templates tailored to specific roles and companies to boost your application success.",
    icon: <Mail className="h-6 w-6 text-green-400" />,
    color: "green",
  },
];

const Features = () => {
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
            <span className="text-sm text-white/80">Key Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              perfect profile
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Our intelligent platform combines cutting-edge AI with beautiful design to help you stand out
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
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
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="flex items-center text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 