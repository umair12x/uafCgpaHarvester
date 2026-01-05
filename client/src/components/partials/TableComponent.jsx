import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ChartComponent from "./Chart";

const TableComponent = ({ studentRespone }) => {
  const [visibleTableIndex, setVisibleTableIndex] = useState(null);
  const [chartData, setChartData] = useState([]);

   useEffect(() => {
    if (studentRespone?.result?.length > 0) {
      // Map the data correctly from backend response
      const data = studentRespone.result.map((result, index) => ({
        semester: result.semester,
        shortSem: `Sem ${index + 1}`, // Short label for graph
        gpa: parseFloat(result.Gpa),  // Semester GPA from backend
        // No need for cumulative GPA calculation - it's already at root level
      }));
      setChartData(data);
    }
  }, [studentRespone]);

  const toggleVisibleTableIndex = (index) => {
    setVisibleTableIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getGradeColor = (grade) => {
    const colors = {
      A: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800",
      B: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
      C: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-800",
      D: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
      F: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
    };
    return colors[grade] || "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800";
  };

  // Get overall CGPA from backend response
  const getOverallCGPA = () => {
    return studentRespone?.Cgpa ? parseFloat(studentRespone.Cgpa) : 0;
  };

  // Get highest GPA from all semesters
  const getHighestGPA = () => {
    if (!chartData.length) return 0;
    return Math.max(...chartData.map((d) => d.gpa));
  };

  // Get lowest GPA from all semesters
  const getLowestGPA = () => {
    if (!chartData.length) return 0;
    return Math.min(...chartData.map((d) => d.gpa));
  };

  // Mobile-friendly grade badge component
  const GradeBadge = ({ grade }) => (
    <span className={`inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full ${getGradeColor(grade)}`}>
      {grade}
    </span>
  );
  return (
    <div className="w-full px-2 sm:px-3 md:px-4">
      {/* Chart Component */}
      {chartData.length > 0 && <ChartComponent chartData={chartData} overallCGPA={getOverallCGPA()} studentName={studentRespone?.name} />}

      {/* Tables Section - Mobile Optimized */}
      {studentRespone?.result?.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          {studentRespone.result?.map((result, index) => (
            <motion.div
              key={result.semester || index}
              className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* Semester Header - Mobile Optimized */}
              <button
                onClick={() => toggleVisibleTableIndex(index)}
                className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm sm:text-base">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {result.semester}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {result.subjects.length} subjects • {result.subjects.reduce((sum, sub) => sum + sub.ch, 0)} CH
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden xs:flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      GPA:
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {parseFloat(result.Gpa).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700">
                    {visibleTableIndex === index ? (
                      <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Mobile GPA Badge - For extra small screens */}
              <div className="xs:hidden px-3 pb-2">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    Semester GPA:
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {parseFloat(result.Gpa).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Animated Table Content - Mobile Optimized */}
              <AnimatePresence>
                {visibleTableIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 sm:p-3 border-t border-gray-100 dark:border-gray-700">
                      {/* Mobile-friendly condensed table */}
                      <div className="block sm:hidden">
                        {result.subjects.map((subject, subIndex) => (
                          <motion.div
                            key={subject.code}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.03 }}
                            className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                                  {subject.code}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {subject.name || "Course"}
                                </div>
                              </div>
                              <GradeBadge grade={subject.grade} />
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center p-1.5 bg-white dark:bg-gray-800 rounded">
                                <div className="text-gray-500 dark:text-gray-400">CH</div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">{subject.ch}</div>
                              </div>
                              <div className="text-center p-1.5 bg-white dark:bg-gray-800 rounded">
                                <div className="text-gray-500 dark:text-gray-400">Marks</div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">{subject.marks}</div>
                              </div>
                              <div className="text-center p-1.5 bg-white dark:bg-gray-800 rounded">
                                <div className="text-gray-500 dark:text-gray-400">Gr.Pt.</div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">{Math.round(subject.qp)}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Desktop table */}
                      <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full min-w-[400px]">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                CH
                              </th>
                              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Marks
                              </th>
                              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Grade
                              </th>
                              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Gr.Pt.
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {result.subjects.map((subject, subIndex) => (
                              <motion.tr
                                key={subject.code}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: subIndex * 0.02 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                      {subject.code}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {subject.name || "Course"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm">
                                    {subject.ch}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                                    {subject.marks}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <GradeBadge grade={subject.grade} />
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold text-sm">
                                    {Math.round(subject.qp)}
                                  </span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Semester Summary - Mobile Optimized */}
                      <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg">
                        <div className="grid  sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                          <div className="text-center">
                            <div className="text-gray-500 dark:text-gray-400">Total Marks</div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                              {result.subjects.reduce((sum, sub) => sum + parseInt(sub.marks), 0)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500 dark:text-gray-400">Credit Hours</div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                              {result.subjects.reduce((sum, sub) => sum + sub.ch, 0)}
                            </div>
                          </div>
                         
                          <div className="text-center">
                            <div className="text-gray-500 dark:text-gray-400">Semester GPA</div>
                            <div className="font-bold text-green-600 dark:text-green-400">
                              {parseFloat(result.Gpa).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableComponent;