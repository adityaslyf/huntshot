import { motion } from "framer-motion";
import { FileText, User, Mail, ArrowRight } from "lucide-react";

const features = [
  {
    title: "AI Resume Parsing",
    description:
      "Our AI extracts all key information from your resume automatically with industry-leading accuracy.",
    icon: <FileText className="h-7 w-7 text-blue-400" />,
  },
  {
    title: "Professional Profile",
    description:
      "Create a customizable professional profile that highlights your most relevant skills and experience.",
    icon: <User className="h-7 w-7 text-blue-400" />,
  },
  {
    title: "AI Email Templates",
    description:
      "Generate personalized email templates tailored to specific roles and companies to boost your application success.",
    icon: <Mail className="h-7 w-7 text-blue-400" />,
  },
];

const Features = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-[0.02] bg-repeat"></div>

      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Section header with animated highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full py-1.5 px-4 backdrop-blur-xl border border-purple-500/20 mb-6"
          >
            <div className="flex items-center">
              <span className="flex h-2 w-2 relative mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-medium text-purple-300">
                Exclusive Features
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-5"
          >
            Everything you need for a{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                perfect profile
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              ></motion.span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Our intelligent platform combines cutting-edge AI with
            beautiful design to help you stand out
          </motion.p>
        </motion.div>

        {/* 3D Feature Cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: 10, y: 80 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                translateY: -10,
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
              }}
              className="group relative transform-gpu w-full md:w-[30%] flex-grow flex-shrink-0 max-w-md"
            >
              {/* Card glow hover effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>

              {/* Card container */}
              <div className="relative bg-gradient-to-b from-white/[0.15] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full overflow-hidden transform transition-all duration-300 flex flex-col">
                {/* Reflective light effect */}
                <div className="absolute -inset-[300%] bg-gradient-to-t from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-all duration-1000"></div>

                {/* Icon with glow effect */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-blue-600/50 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 rounded-xl inline-block mb-6 group-hover:shadow-lg transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Text with animations */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-br from-white to-white/80 bg-clip-text group-hover:text-transparent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Animated arrow */}
                <div className="mt-6 overflow-hidden h-6">
                  <motion.div
                    className="flex items-center font-medium text-purple-400 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ y: 30 }}
                    whileInView={{ y: 30 }}
                    whileHover={{ y: 0 }}
                  >
                    Learn more{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>

                {/* 3D depth lines */}
                <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 h-1/2 w-px bg-gradient-to-b from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 