import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  Trophy,
  Zap,
  ChevronUp,
  ChevronDown,
  Target,
  Sparkles,
  LineChart,
  Star
} from "lucide-react";

const ChartComponent = ({ chartData, overallCGPA }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [activeInsight, setActiveInsight] = useState(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized calculations
  const { highestGPA, lowestGPA, totalSemesters, improvement } = useMemo(() => {
    const total = chartData.length;
    const highest = Math.max(...chartData.map(d => d.gpa));
    const lowest = Math.min(...chartData.map(d => d.gpa));
    
    let improvementData = { percentage: 0, isImproving: true, trend: 0 };
    if (total >= 2) {
      const firstGPA = chartData[0].gpa;
      const lastGPA = chartData[total - 1].gpa;
      const change = ((lastGPA - firstGPA) / firstGPA) * 100;
      improvementData = {
        percentage: Math.abs(change).toFixed(1),
        isImproving: lastGPA > firstGPA,
        trend: lastGPA - firstGPA
      };
    }

    return {
      highestGPA: highest,
      lowestGPA: lowest,
      totalSemesters: total,
      improvement: improvementData
    };
  }, [chartData]);

  // Simplified performance insights for small screens
  const performanceInsights = useMemo(() => {
    const insights = [];
    
    if (chartData.length >= 2) {
      if (improvement.trend > 0.3) {
        insights.push({
          icon: <Sparkles className="w-3 h-3" />,
          text: "Growing",
          color: "text-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-900/20"
        });
      }
      
      if (highestGPA >= 3.5) {
        insights.push({
          icon: <Star className="w-3 h-3" />,
          text: "Excellent",
          color: "text-amber-500",
          bg: "bg-amber-50 dark:bg-amber-900/20"
        });
      }
      
      const variance = chartData.reduce((sum, d) => 
        sum + Math.pow(d.gpa - overallCGPA, 2), 0) / chartData.length;
      
      if (variance < 0.1) {
        insights.push({
          icon: <Target className="w-3 h-3" />,
          text: "Stable",
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-900/20"
        });
      }
    }

    return insights.slice(0, isMobile ? 1 : 2);
  }, [chartData, highestGPA, overallCGPA, improvement.trend, isMobile]);

  // Get GPA status and color
  const getGPAInfo = (gpa) => {
    if (gpa >= 3.5) return {
      status: "Excellent",
      color: "bg-gradient-to-r from-emerald-500 to-green-500",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    };
    if (gpa >= 3.0) return {
      status: "Very Good",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    };
    if (gpa >= 2.0) return {
      status: "Good",
      color: "bg-gradient-to-r from-amber-500 to-yellow-500",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    };
    return {
      status: "Needs Focus",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20"
    };
  };

  // Handle semester click for mobile details
  const handleSemesterClick = (index) => {
    if (isMobile) {
      setExpandedView(expandedView === index ? null : index);
    }
  };

  // Get performance trend arrow
  const getTrendArrow = (currentGPA, previousGPA) => {
    if (!previousGPA) return null;
    const difference = currentGPA - previousGPA;
    
    if (Math.abs(difference) < 0.01) return null;
    
    return {
      icon: difference > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />,
      color: difference > 0 ? "text-green-500" : "text-red-500",
      value: Math.abs(difference).toFixed(2)
    };
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-2 sm:px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-sm p-3 sm:p-4 mb-3">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm">
              <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                GPA Performance
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {totalSemesters} semesters • CGPA: <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {overallCGPA.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden sm:flex items-center gap-3">
            {performanceInsights.map((insight, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${insight.bg}`}
              >
                <div className={insight.color}>{insight.icon}</div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Insights */}
        <div className="sm:hidden flex items-center gap-2">
          {performanceInsights.map((insight, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${insight.bg}`}
            >
              <div className={insight.color}>{insight.icon}</div>
              <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                {insight.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Semester Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3">
        {chartData.map((semester, index) => {
          const gpaInfo = getGPAInfo(semester.gpa);
          const isHighest = semester.gpa === highestGPA;
          const isLowest = semester.gpa === lowestGPA;
          const trend = getTrendArrow(semester.gpa, index > 0 ? chartData[index - 1].gpa : null);
          const isExpanded = expandedView === index;

          return (
            <motion.div
              key={index}
              layout
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSemesterClick(index)}
            >
              <div className="p-2 sm:p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center ${gpaInfo.color} text-white font-bold text-sm shadow-sm`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Sem {index + 1}
                      </h4>
                      {!isMobile && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {semester.shortSem || "Semester"}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className={`text-lg sm:text-xl font-bold ${gpaInfo.text}`}>
                        {semester.gpa.toFixed(2)}
                      </span>
                      {trend && (
                        <div className={`flex items-center gap-0.5 ${trend.color}`}>
                          {trend.icon}
                          <span className="text-[10px] font-semibold">{trend.value}</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-[10px] sm:text-xs font-medium ${gpaInfo.text} mt-0.5`}>
                      {gpaInfo.status}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 sm:h-3 bg-gray-100/60 dark:bg-gray-800/60 rounded-full overflow-hidden mb-1">
                  <motion.div
                    className={`h-full rounded-full ${gpaInfo.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(semester.gpa / 4) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>

                {/* Badges & Info */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1">
                    {isHighest && (
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                        <Trophy className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                          Best
                        </span>
                      </div>
                    )}
                    {isLowest && index > 0 && (
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                        <Zap className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300">
                          Focus
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    {((semester.gpa / 4) * 100).toFixed(0)}% of max
                  </div>
                </div>
              </div>

              {/* Mobile Expansion */}
              <AnimatePresence>
                {isMobile && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-gray-100/50 dark:border-gray-700/50"
                  >
                    <div className="p-2 bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500 dark:text-gray-400">GPA Range</div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">
                            0.0 - 4.0
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400">Rank</div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">
                            {index + 1}/{totalSemesters}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-gray-500 dark:text-gray-400">Status</div>
                          <div className={`font-semibold ${gpaInfo.text}`}>
                            {gpaInfo.status} • {semester.gpa.toFixed(2)} GPA
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Metrics */}
      <div className="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-sm p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Total Semesters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100/50 dark:border-blue-800/30"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                Semesters
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
              {totalSemesters}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Completed
            </div>
          </motion.div>

          {/* Highest GPA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-100/50 dark:border-emerald-800/30"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Highest
              </div>
            </div>
            <div className={`text-lg sm:text-2xl font-bold ${
              highestGPA >= 3.5 
                ? "text-emerald-600 dark:text-emerald-400"
                : highestGPA >= 3.0
                ? "text-blue-600 dark:text-blue-400"
                : "text-amber-600 dark:text-amber-400"
            }`}>
              {highestGPA.toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Peak Performance
            </div>
          </motion.div>

          {/* Overall CGPA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-100/50 dark:border-amber-800/30"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                Overall
              </div>
            </div>
            <div className={`text-lg sm:text-2xl font-bold ${
              overallCGPA >= 3.5 
                ? "text-emerald-600 dark:text-emerald-400"
                : overallCGPA >= 3.0
                ? "text-blue-600 dark:text-blue-400"
                : "text-amber-600 dark:text-amber-400"
            }`}>
              {overallCGPA.toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Cumulative
            </div>
          </motion.div>

          {/* Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${
              improvement.isImproving
                ? "from-purple-50/50 to-violet-50/50 dark:from-purple-900/20 dark:to-violet-900/20"
                : "from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20"
            } border ${
              improvement.isImproving
                ? "border-purple-100/50 dark:border-purple-800/30"
                : "border-orange-100/50 dark:border-orange-800/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className={`p-1 sm:p-1.5 rounded-lg ${
                improvement.isImproving
                  ? "bg-purple-100 dark:bg-purple-900/40"
                  : "bg-orange-100 dark:bg-orange-900/40"
              }`}>
                {improvement.isImproving 
                  ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                  : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 dark:text-orange-400" />
                }
              </div>
              <div className={`text-xs sm:text-sm font-medium ${
                improvement.isImproving
                  ? "text-purple-700 dark:text-purple-300"
                  : "text-orange-700 dark:text-orange-300"
              }`}>
                Trend
              </div>
            </div>
            <div className={`text-lg sm:text-2xl font-bold ${
              improvement.isImproving
                ? "text-purple-600 dark:text-purple-400"
                : "text-orange-600 dark:text-orange-400"
            }`}>
              {improvement.isImproving ? "↗ " : "↘ "}{improvement.percentage}%
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Growth Rate
            </div>
          </motion.div>
        </div>

        {/* Legend - Only on larger screens */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                GPA Color Scale
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { color: "from-red-500 to-pink-500", range: "< 2.0", status: "Focus" },
                  { color: "from-amber-500 to-yellow-500", range: "2.0 - 2.9", status: "Good" },
                  { color: "from-blue-500 to-cyan-500", range: "3.0 - 3.4", status: "Very Good" },
                  { color: "from-emerald-500 to-green-500", range: "3.5+", status: "Excellent" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded bg-gradient-to-r ${item.color}`}></div>
                    <span className="text-gray-600 dark:text-gray-400">{item.range}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-[10px]">({item.status})</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChartComponent;