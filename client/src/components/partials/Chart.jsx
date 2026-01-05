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

  // Better x-axis positioning for any number of semesters
  const getXPosition = (index, total) => {
    if (total <= 1) return 50;
    return (index / (total - 1)) * 100;
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

  return (
    <motion.div
      className="mb-6 p-3 sm:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-[#0b0514] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with student name */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GPA Trend Analysis
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {studentName ? `${studentName}'s ` : ""}Semester-wise performance
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
              CGPA: <span className="font-bold">{overallCGPA.toFixed(2)}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
              Max: <span className="font-bold">{highestGPA.toFixed(2)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="relative h-40 sm:h-48 w-full mt-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 flex flex-col justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
          {[4.0, 3.0, 2.0, 1.0, 0.0].map((value) => (
            <div key={value} className="text-right pr-1">
              {value.toFixed(1)}
            </div>
          ))}
        </div>

        {/* Graph area */}
        <div className="absolute left-8 sm:left-10 right-0 top-0 bottom-0">
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
              className="absolute left-0 right-0 border-t-2 border-dashed border-green-400/60 dark:border-green-500/60 z-10"
              style={{ bottom: `${getHeight(overallCGPA)}%` }}
            >
              <div className="absolute -top-5 right-2 text-xs text-green-600 dark:text-green-400 font-medium bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded shadow-sm">
                CGPA {overallCGPA.toFixed(2)}
              </div>
            </div>
          )}

          {/* Data points and line */}
          {totalSemesters > 0 && (
            <div className="relative h-full flex items-end">
              <div className="absolute inset-0 flex items-end">
                {/* Connecting line */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartData
                      .map(
                        (data, index) =>
                          `${getXPosition(index, totalSemesters)},${
                            100 - getHeight(data.gpa)
                          }`
                      )
                      .join(" ")}
                  />
                </svg>

                {/* Data points */}
                {chartData.map((data, index) => {
                  const xPosition = getXPosition(index, totalSemesters);
                  const height = getHeight(data.gpa);
                  const isHigh = data.gpa === highestGPA;
                  const isLow = data.gpa === lowestGPA;

                  return (
                    <div
                      key={index}
                      className="absolute bottom-0 flex flex-col items-center z-20"
                      style={{
                        left: `${xPosition}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Bar */}
                      <div
                        className="w-3 sm:w-4 rounded-t-md transition-all duration-300 hover:w-4 sm:hover:w-5"
                        style={{
                          height: `${height}%`,
                          background: isHigh
                            ? "linear-gradient(to top, #10b981, #34d399)"
                            : isLow
                            ? "linear-gradient(to top, #f97316, #fb923c)"
                            : "linear-gradient(to top, #3b82f6, #60a5fa)",
                        }}
                      />

                      {/* Data point */}
                      <div className="absolute -top-7 flex flex-col items-center">
                        <div className="text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 px-1.5 py-0.5 rounded shadow-sm">
                          {data.gpa.toFixed(2)}
                        </div>
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white dark:border-gray-900 shadow ${
                            isHigh
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : isLow
                              ? "bg-gradient-to-r from-orange-500 to-amber-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-500"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* X-axis */}
        {totalSemesters > 0 && (
          <div className="absolute -bottom-6 left-8 sm:left-10 right-0 flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
            {chartData.map((_, index) => (
              <div key={index} className="text-center flex-1 min-w-0">
                <div className="truncate px-1">S{index + 1}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-3 rounded-xl">
          <div className="flex items-center gap-1 mb-1">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Semesters
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">
            {totalSemesters}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-3 rounded-xl">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Highest GPA
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-300">
            {highestGPA.toFixed(2)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 p-3 rounded-xl">
          <div className="flex items-center gap-1 mb-1">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              CGPA
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-300">
            {overallCGPA.toFixed(2)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-3 rounded-xl">
          <div className="flex items-center gap-1 mb-1">
            {improving ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
            )}
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Trend
            </span>
          </div>
          <div
            className={`text-lg sm:text-xl font-bold ${
              improving
                ? "text-purple-700 dark:text-purple-300"
                : "text-orange-700 dark:text-orange-300"
            }`}
          >
            {improving ? "Improving" : "Declining"}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5">
            {improvement}% change
          </div>
        </div>
      </div>

      {totalSemesters > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span>Semester GPA</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              <span>Highest GPA</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 border-dashed border-green-400 border"></div>
              <span>Current CGPA Level</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChartComponent;
