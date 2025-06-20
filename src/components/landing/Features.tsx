import { motion } from "framer-motion";
import { FileText, User, Mail } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
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
            <span className="text-sm text-white/80">Key Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              perfect profile
            </span>
          </motion.h2>
        </motion.div>

        {/* Visual Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Card 1: AI Resume Parsing */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex space-x-2 mb-6">
              <motion.div 
                className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 bg-purple-400 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 bg-pink-400 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Resume Parsing</h3>
            <p className="text-white/60 text-sm">Extract key information automatically</p>
          </div>

          {/* Card 2: Professional Profile */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6">
              <User className="h-8 w-8 text-purple-400" />
            </div>
            <motion.div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-6 h-6 rounded-full bg-white"/>
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Professional Profile</h3>
            <p className="text-white/60 text-sm">Create standout profiles</p>
          </div>

          {/* Card 3: AI Email Templates */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
            <motion.div 
              className="w-16 h-8 rounded-lg bg-green-400 mb-6"
              animate={{
                boxShadow: ["0 0 0px #10b981", "0 0 20px #10b981", "0 0 0px #10b981"],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <h3 className="text-xl font-bold text-white mb-2">AI Email Templates</h3>
            <p className="text-white/60 text-sm">Generate personalized emails</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 