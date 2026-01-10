import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  BookOpen,
  Award,
  Star,
  Target,
  TrendingDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ChartComponent = ({ chartData, overallCGPA, studentName }) => {
  // Get highest GPA
  const getHighestGPA = () => {
    if (!chartData.length) return 0;
    return Math.max(...chartData.map((d) => d.gpa));
  };

  // Get lowest GPA
  const getLowestGPA = () => {
    if (!chartData.length) return 0;
    return Math.min(...chartData.map((d) => d.gpa));
  };

  // Calculate GPA improvement from first to last semester
  const getGPAImprovement = () => {
    if (chartData.length < 2) return 0;
    const firstGPA = chartData[0].gpa;
    const lastGPA = chartData[chartData.length - 1].gpa;
    const change = ((lastGPA - firstGPA) / firstGPA) * 100;
    return Math.abs(change).toFixed(1);
  };

  // Check if GPA is improving
  const isImproving = () => {
    if (chartData.length < 2) return true;
    const firstGPA = chartData[0].gpa;
    const lastGPA = chartData[chartData.length - 1].gpa;
    return lastGPA > firstGPA;
  };

  // Normalize height for 4.0 scale
  const getHeight = (gpa) => {
    return (Math.min(gpa, 4.0) / 4.0) * 100;
  };

  const totalSemesters = chartData.length;
  const highestGPA = getHighestGPA();
  const lowestGPA = getLowestGPA();
  const improvement = getGPAImprovement();
  const improving = isImproving();

  // Generate gradient colors based on GPA value
  const getBarColor = (gpa, index) => {
    if (gpa >= 3.5) {
      return {
        background: "linear-gradient(to top, #10b981, #34d399, #a7f3d0)",
        hover: "linear-gradient(to top, #059669, #10b981, #34d399)",
        shadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
      };
    } else if (gpa >= 3.0) {
      return {
        background: "linear-gradient(to top, #3b82f6, #60a5fa, #93c5fd)",
        hover: "linear-gradient(to top, #2563eb, #3b82f6, #60a5fa)",
        shadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
      };
    } else if (gpa >= 2.0) {
      return {
        background: "linear-gradient(to top, #f59e0b, #fbbf24, #fcd34d)",
        hover: "linear-gradient(to top, #d97706, #f59e0b, #fbbf24)",
        shadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
      };
    } else {
      return {
        background: "linear-gradient(to top, #ef4444, #f87171, #fca5a5)",
        hover: "linear-gradient(to top, #dc2626, #ef4444, #f87171)",
        shadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
      };
    }
  };

  // Calculate bar width based on number of semesters
  const getBarWidth = () => {
    if (totalSemesters <= 4) return "w-12 sm:w-16";
    if (totalSemesters <= 6) return "w-10 sm:w-14";
    return "w-8 sm:w-12";
  };

  return (
    <motion.div
      className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-[#0b0514] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with student name */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GPA Performance Chart
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                {studentName ? `${studentName}'s ` : ""}Semester-wise academic progress
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Current CGPA</div>
              <div className="text-sm sm:text-base font-bold text-green-700 dark:text-green-300">
                {overallCGPA.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="relative h-52 sm:h-64 w-full">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 flex flex-col justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          {[4.0, 3.0, 2.0, 1.0, 0.0].map((value) => (
            <div key={value} className="text-right pr-2">
              {value.toFixed(1)}
            </div>
          ))}
        </div>

        {/* Graph area */}
        <div className="absolute left-10 sm:left-12 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border-t border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>

          {/* CGPA reference line */}
          {totalSemesters > 0 && overallCGPA > 0 && (
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400/80 dark:border-green-500/80 z-10"
              style={{ bottom: `${getHeight(overallCGPA)}%` }}
            >
              <div className="absolute -top-6 right-2 flex items-center gap-1">
                <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-lg shadow-sm">
                  CGPA {overallCGPA.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Bars container */}
          {totalSemesters > 0 && (
            <div className="relative h-full flex items-end">
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="flex items-end h-full w-full px-2 sm:px-4 gap-2 sm:gap-4">
                  {chartData.map((data, index) => {
                    const height = getHeight(data.gpa);
                    const isHigh = data.gpa === highestGPA;
                    const isLow = data.gpa === lowestGPA;
                    const barColor = getBarColor(data.gpa, index);
                    const barWidth = getBarWidth();

                    return (
                      <motion.div
                        key={index}
                        className={`${barWidth} flex flex-col items-center group`}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {/* Value label above bar */}
                        <div className="relative mb-2">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                            {data.gpa.toFixed(2)}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-700 rotate-45"></div>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                              {data.gpa.toFixed(2)}
                            </span>
                            {index > 0 && (
                              <span
                                className={`text-[10px] font-semibold ${
                                  data.gpa > chartData[index - 1].gpa
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {data.gpa > chartData[index - 1].gpa ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bar */}
                        <div
                          className={`${barWidth} rounded-t-lg relative overflow-hidden transition-all duration-300 group-hover:shadow-lg`}
                          style={{
                            height: `${height}%`,
                            background: barColor.background,
                            boxShadow: isHigh
                              ? "0 8px 25px rgba(16, 185, 129, 0.4)"
                              : barColor.shadow,
                            borderTop: isHigh
                              ? "3px solid #10b981"
                              : isLow
                              ? "3px solid #f97316"
                              : "none",
                          }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Bar pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                          </div>
                        </div>

                        {/* Semester label */}
                        <div className="mt-2 text-center">
                          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Sem {index + 1}
                          </div>
                          {isHigh && (
                            <div className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-0.5 flex items-center justify-center gap-1">
                              <Star className="w-3 h-3" />
                              Best
                            </div>
                          )}
                          {isLow && index > 0 && (
                            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                              Needs Focus
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 sm:mt-12">
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              Total
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300">
            {totalSemesters}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Semesters Completed
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
              Peak
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300">
            {highestGPA.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Highest Semester GPA
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
              Overall
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-300">
            {overallCGPA.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Cumulative GPA
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              {improving ? (
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              ) : (
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              improving 
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
                : "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30"
            }`}>
              {improving ? "Up" : "Down"}
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${
            improving 
              ? "text-purple-700 dark:text-purple-300"
              : "text-orange-700 dark:text-orange-300"
          }`}>
            {improving ? "↗" : "↘"} {improvement}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Performance Trend
          </div>
        </motion.div>
      </div>

      {/* Legend */}
      {totalSemesters > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              GPA Performance Scale
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-b from-red-500 to-pink-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Below 2.0</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-b from-amber-500 to-yellow-500"></div>
                <span className="text-gray-600 dark:text-gray-400">2.0 - 2.9</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                <span className="text-gray-600 dark:text-gray-400">3.0 - 3.4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-b from-emerald-500 to-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">3.5+</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChartComponent;