import React from "react";
import Logo from "./partials/Logo";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0">
        {/* Decorative elements */}
        <div className="absolute top-10 hidden sm:block w-64 h-64 left-10   bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 md:gap-10 py-2 sm:py-6 md:py-8 lg:py-12 max-w-6xl w-full">
        <div className="mb-2">
          <div className="relative">
            <Logo />
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-xl opacity-20 -z-10"></div>
          </div>
        </div>

        {/* Main heading with gradient text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2 sm:space-y-4"
        >
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-sky-400">
              CGPA Harvester & Calculator
            </span>
            <span className="block text-gray-800 dark:text-gray-200 mt-2 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              University of Agriculture,
              <br className="hidden sm:block" />
              Faisalabad
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-medium text-base sm:text-sm md:text-md lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          Harvest your CGPA effortlessly with our{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            intelligent calculator
          </span>{" "}
          designed specifically for UAF students
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center ">
            <div className="w-5 h-8 border-2 border-cyan-500 dark:border-emerald-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-1 bg-gradient-to-b from-emerald-800 to-cyan-800 rounded-full mt-2"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
