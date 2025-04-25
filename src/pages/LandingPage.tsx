import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const features = [
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "AI Resume Parser",
      description:
        "Upload your resume and let our AI transform it into a beautifully formatted profile",
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Secure Storage",
      description:
        "Your data is encrypted and securely stored in our cloud database",
    },
    {
      icon: <Zap className="h-6 w-6 text-[#22d3ee]" />,
      title: "Fast Processing",
      description:
        "Get your resume parsed and formatted in seconds with our powerful AI",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="blob w-[600px] h-[600px] -top-64 -left-64 opacity-20"></div>
      <div className="blob w-[700px] h-[700px] -bottom-96 -right-96 opacity-10"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-transparent to-background opacity-70 pointer-events-none"></div>

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-20">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-6 inline-block relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-70"></div>
            <div className="relative glass p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 max-w-4xl"
            variants={itemVariants}
          >
            Transform Your <span className="gradient-text">Resume</span> Into a
            Powerful <span className="gradient-text">Profile</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl"
            variants={itemVariants}
          >
            Upload your resume and let our AI extract all the important details
            to create a stunning profile that stands out.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            variants={itemVariants}
          >
            <Button
              size="lg"
              variant="gradient"
              className="text-lg px-8 py-6 rounded-xl shadow-glow"
              onClick={handleLogin}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-glass group"
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                  },
                }}
              >
                <div className="glass p-3 rounded-full inline-block mb-4 group-hover:shadow-glow transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Hero section wave divider */}
      <div className="relative mt-20 w-full overflow-hidden">
        <div className="wave-divider h-24 md:h-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"></div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} HuntShot. All rights reserved.{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
} 