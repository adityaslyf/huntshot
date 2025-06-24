import { motion } from "framer-motion";
import { FileText, User, Mail } from "lucide-react";

const Features = () => {
const features = [
  {
    title: "AI Resume Parsing",
      description: "Our AI accurately extracts key information from your resume, saving you time and effort.",
      icon: <FileText className="h-8 w-8" />,
  },
  {
    title: "Professional Profile",
      description: "A standout professional profile is automatically generated to showcase your skills.",
      icon: <User className="h-8 w-8" />,
  },
  {
    title: "AI Email Templates",
      description: "Generate personalized outreach emails based on your new, polished profile.",
      icon: <Mail className="h-8 w-8" />,
  },
];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need for a perfect profile
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our key features are designed to give you a competitive edge.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-400">
                    {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 