import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaGraduationCap,
  FaCalculator,
  FaChartBar,
  FaHeadset,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { MdTouchApp } from "react-icons/md";

const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      id: 1,
      name: "One-Click Input",
      icon: <FaUser />,
      description:
        "Simply enter your registration number - our system automatically fetches and processes your academic records.",
      color: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-100 dark:border-emerald-800/30",
      longDescription:
        "No manual data entry required. Our intelligent system connects with university records to provide instant results.",
      stats: "Zero manual entry",
    },
    {
      id: 2,
      name: "Manual Input",
      icon: <MdTouchApp />,
      description:
        "Prefer to enter your grades yourself? Our manual calculator lets you input your subjects and grades with ease.",
      color: "from-red-500 to-pink-500",
      iconColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-100 dark:border-red-800/30",
      longDescription:
        "Full control over your data entry with our user-friendly manual calculator.",
      stats: "Everything manual",
    },
    {
      id: 3,
      name: "Analytics",
      icon: <FaGraduationCap />,
      description:
        "Get detailed semester breakdowns, subject-wise performance, and visual progress tracking.",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-100 dark:border-blue-800/30",
      longDescription:
        "View complete academic history including grades, credit hours, and improvement opportunities.",
      stats: "360° analysis",
    },
    {
      id: 4,
      name: "Calculations",
      icon: <FaCalculator />,
      description:
        "Advanced algorithms handle grade replacements, credit hour variations, and university rule changes.",
      color: "from-purple-500 to-violet-500",
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-100 dark:border-purple-800/30",
      longDescription:
        "Smart calculations that adapt to different credit systems and automatically apply university policies.",
      stats: "90%+ accuracy",
    },
    {
      id: 5,
      name: "Real-time Insights",
      icon: <FaChartBar />,
      description:
        "Interactive charts and performance trends to help you understand your academic progress.",
      color: "from-amber-500 to-yellow-500",
      iconColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-100 dark:border-amber-800/30",
      longDescription:
        "Visualize your academic journey with interactive graphs and semester comparisons.",
      stats: "updates",
    },
    {
      id: 6,
      name: "24/7 Support System",
      icon: <FaHeadset />,
      description:
        "Dedicated help system with FAQ, tutorials, and community support for all students.",
      color: "from-red-500 to-pink-500",
      iconColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-100 dark:border-red-800/30",
      longDescription:
        "Comprehensive support including detailed guides, troubleshooting, and student community.",
      stats: "availability",
    },
 
  ];

  const testimonials = [
    { text: "Saved me time of manual calculation!", user: "Wahab Sadiq" },
    { text: "Most accurate calculator for UAF students", user: "Haseeb Mirza" },
    { text: "Game changer for academic planning", user: "M. Hanan" },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full border border-emerald-200/50 dark:border-emerald-800/30 mb-4">
            <HiOutlineSparkles className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Why Choose Our Platform
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-sky-400 bg-clip-text text-transparent">
              Revolutionizing Academic
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">
              Calculations for UAF
            </span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Calculating CGPA manually is complex and error-prone. You have to
              track credit hours, grades, and quality points across multiple
              semesters—it's confusing and time-consuming.
            </p>
            <p className=" text-gray-600 dark:text-gray-300 leading-relaxed text-sm font-light">
              That's why I built this intelligent platform specifically for
              University of Agriculture students. It's designed to eliminate the
              guesswork and provide accurate, comprehensive academic insights.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className={`relative h-full ${feature.bgColor} ${
                  feature.borderColor
                } border rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                  activeCard === feature.id
                    ? "ring-2 ring-emerald-500/50 scale-[1.02]"
                    : ""
                }`}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() =>
                  setActiveCard(activeCard === feature.id ? null : feature.id)
                }
              >
                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative flex items-center gap-3 mb-4 sm:mb-6">
                  {/* Icon */}
                  <div
                    className={`relative flex items-center justify-center 
    w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  >
                    <div className="text-lg sm:text-2xl text-white">
                      {feature.icon}
                    </div>

                    {/* Glow */}
                    <div
                      className={`absolute -inset-2 bg-gradient-to-br ${feature.color} 
      rounded-2xl blur-xl opacity-30 -z-10`}
                    ></div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                      {feature.name}
                    </h3>

                    <span
                      className={`text-xs  font-light px-2.5 py-1
      rounded-full ${feature.iconColor} ${feature.bgColor} border ${feature.borderColor}`}
                    >
                      {feature.stats}
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                  {feature.description}
                </p>

                {/* Expand Button for Mobile */}
                <div className="sm:hidden">
                  <button
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(
                        activeCard === feature.id ? null : feature.id
                      );
                    }}
                  >
                    {activeCard === feature.id ? "Show Less" : "Learn More"}
                    <FaChevronRight
                      className={`transform transition-transform ${
                        activeCard === feature.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {activeCard === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50 mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {feature.longDescription}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonials */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaStar className="text-amber-500" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Student Feedback
                </h3>
              </div>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-800/30 rounded-xl border border-gray-100/50 dark:border-gray-700/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {testimonial.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base italic">
                        "{testimonial.text}"
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        - {testimonial.user}, UAF Student
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
