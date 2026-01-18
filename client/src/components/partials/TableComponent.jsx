import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Target,
  BarChart,
  Award,
  GraduationCap,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";
import ChartComponent from "./Chart";

const TableComponent = ({ studentRespone }) => {
  const [visibleTableIndex, setVisibleTableIndex] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  useEffect(() => {
    if (studentRespone?.result?.length > 0) {
      const data = studentRespone.result.map((result, index) => ({
        semester: result.semester,
        shortSem: `Sem ${index + 1}`,
        gpa: parseFloat(result.Gpa),
        creditHours: result.subjects.reduce((sum, sub) => sum + sub.ch, 0),
        subjectCount: result.subjects.length
      }));
      setChartData(data);
    }
  }, [studentRespone]);

  const toggleVisibleTableIndex = (index) => {
    setVisibleTableIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getGradeColor = (grade) => {
    const colors = {
      A: {
        bg: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800/50",
        shadow: "shadow-emerald-500/20"
      },
      B: {
        bg: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800/50",
        shadow: "shadow-blue-500/20"
      },
      C: {
        bg: "bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40",
        text: "text-gray-700 dark:text-gray-300",
        border: "border-gray-200 dark:border-gray-800/50",
        shadow: "shadow-gray-500/20"
      },
      D: {
        bg: "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800/50",
        shadow: "shadow-amber-500/20"
      },
      F: {
        bg: "bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-200 dark:border-red-800/50",
        shadow: "shadow-red-500/20"
      },
    };
    return colors[grade] || {
      bg: "bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800/50",
      shadow: "shadow-purple-500/20"
    };
  };

  const getOverallCGPA = () => {
    return studentRespone?.Cgpa ? parseFloat(studentRespone.Cgpa) : 0;
  };

  const getHighestGPA = () => {
    if (!chartData.length) return 0;
    return Math.max(...chartData.map((d) => d.gpa));
  };

  const getLowestGPA = () => {
    if (!chartData.length) return 0;
    return Math.min(...chartData.map((d) => d.gpa));
  };

  const GradeBadge = ({ grade }) => {
    const color = getGradeColor(grade);
    return (
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full ${color.bg} ${color.text} border ${color.border} shadow-sm ${color.shadow}`}
      >
        {grade}
      </motion.span>
    );
  };

  const getGradeImpact = (grade) => {
    switch(grade) {
      case 'A': return { impact: 'Excellent', icon: <Star className="w-3 h-3" />, color: 'text-emerald-500' };
      case 'B': return { impact: 'Good', icon: <CheckCircle className="w-3 h-3" />, color: 'text-blue-500' };
      case 'C': return { impact: 'Average', icon: <Target className="w-3 h-3" />, color: 'text-gray-500' };
      case 'D': return { impact: 'Needs Work', icon: <AlertCircle className="w-3 h-3" />, color: 'text-amber-500' };
      case 'F': return { impact: 'Critical', icon: <AlertCircle className="w-3 h-3" />, color: 'text-red-500' };
      default: return { impact: 'Not Graded', icon: <Clock className="w-3 h-3" />, color: 'text-gray-500' };
    }
  };

  const getSemesterPerformance = (gpa) => {
    if (gpa >= 3.5) return {
      level: "Excellent",
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      icon: <Star className="w-4 h-4" />
    };
    if (gpa >= 3.0) return {
      level: "Very Good",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      icon: <TrendingUp className="w-4 h-4" />
    };
    if (gpa >= 2.5) return {
      level: "Good",
      color: "from-amber-500 to-yellow-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      icon: <CheckCircle className="w-4 h-4" />
    };
    return {
      level: "Needs Focus",
      color: "from-red-500 to-pink-500",
      bg: "bg-red-50 dark:bg-red-900/20",
      icon: <AlertCircle className="w-4 h-4" />
    };
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto">
      {/* Academic Overview Card */}
      {studentRespone?.result?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <div className="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden">
            <div className="p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200">
                    Academic Overview
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete semester-wise performance analysis
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Semesters</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {studentRespone.result.length}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Overall CGPA</span>
                  </div>
                  <div className={`text-2xl font-bold ${
                    getOverallCGPA() >= 3.5 ? "text-emerald-600 dark:text-emerald-400" :
                    getOverallCGPA() >= 3.0 ? "text-blue-600 dark:text-blue-400" :
                    "text-amber-600 dark:text-amber-400"
                  }`}>
                    {getOverallCGPA().toFixed(2)}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100/50 dark:border-purple-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Subjects</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {studentRespone.result.reduce((sum, sem) => sum + sem.subjects.length, 0)}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-100/50 dark:border-amber-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Average GPA</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {(
                      studentRespone.result.reduce((sum, sem) => sum + parseFloat(sem.Gpa), 0) / 
                      studentRespone.result.length
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chart Component */}
      {chartData.length > 0 && (
        <div className="mb-6 lg:mb-8">
          <ChartComponent 
            chartData={chartData} 
            getLowestGPA={getLowestGPA} 
            overallCGPA={getOverallCGPA()} 
            getHighestGPA={getHighestGPA}
          />
        </div>
      )}

      {/* Semester Tables - Enhanced for Laptop */}
      {studentRespone?.result?.length > 0 && (
        <div className="space-y-4 lg:space-y-6">
          {studentRespone.result?.map((result, index) => {
            const performance = getSemesterPerformance(parseFloat(result.Gpa));
            const totalCredits = result.subjects.reduce((sum, sub) => sum + sub.ch, 0);
            const totalMarks = result.subjects.reduce((sum, sub) => sum + parseInt(sub.marks), 0);
            
            return (
              <motion.div
                key={result.semester || index}
                className="w-full bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Semester Header - Enhanced */}
                <button
                  onClick={() => toggleVisibleTableIndex(index)}
                  className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
                    <div className="relative">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${performance.color} text-white font-bold text-lg lg:text-xl shadow-lg`}>
                        {index + 1}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br ${performance.color} rounded-xl blur-lg opacity-30 -z-10"></div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base lg:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
                          {result.semester}
                        </h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${performance.bg} ${performance.color} dark:text-gray-200 text-xs font-medium`}>
                          {performance.icon}
                          <span>{performance.level}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs lg:text-sm">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Users className="w-3 h-3" />
                          <span>{result.subjects.length} subjects</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <BookOpen className="w-3 h-3" />
                          <span>{totalCredits} credit hours</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Target className="w-3 h-3" />
                          <span>{totalMarks} total marks</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Semester GPA</div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xl lg:text-2xl font-bold ${
                          parseFloat(result.Gpa) >= 3.5 ? "text-emerald-600 dark:text-emerald-400" :
                          parseFloat(result.Gpa) >= 3.0 ? "text-blue-600 dark:text-blue-400" :
                          "text-amber-600 dark:text-amber-400"
                        }`}>
                          {parseFloat(result.Gpa).toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">/4.0</span>
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      {visibleTableIndex === index ? (
                        <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Animated Table Content */}
                <AnimatePresence>
                  {visibleTableIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 lg:p-6 border-t border-gray-100 dark:border-gray-700/50">
                        {/* Desktop Table - Enhanced */}
                        <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                              <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Subject Details
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Credit Hours
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Marks Obtained
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Grade
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Quality Points
                                  </th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Impact
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {result.subjects.map((subject, subIndex) => {
                                  const impact = getGradeImpact(subject.grade);
                                  const color = getGradeColor(subject.grade);
                                  return (
                                    <motion.tr
                                      key={subject.code}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.02 }}
                                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                                      onMouseEnter={() => setHoveredSubject(subject.code)}
                                      onMouseLeave={() => setHoveredSubject(null)}
                                    >
                                      <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                          <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                              {subject.code}
                                            </span>
                                            {hoveredSubject === subject.code && (
                                              <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`px-2 py-1 rounded-full text-xs ${color.bg} ${color.text}`}
                                              >
                                                {subject.grade} Grade
                                              </motion.div>
                                            )}
                                          </div>
                                          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {subject.name || "Course"}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${color.bg} ${color.text} border ${color.border} font-bold shadow-sm`}>
                                          {subject.ch}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="flex flex-col items-center">
                                          <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                                            {subject.marks}
                                          </span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            obtained
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <GradeBadge grade={subject.grade} />
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className={`inline-flex items-center justify-center px-3 py-2 rounded-lg ${color.bg} ${color.text} border ${color.border} font-bold text-sm shadow-sm`}>
                                          {Math.round(subject.qp)}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="flex flex-col items-center">
                                          <div className={`flex items-center gap-1 ${impact.color} text-xs font-medium`}>
                                            {impact.icon}
                                            <span>{impact.impact}</span>
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {subject.grade === 'A' ? 'Excellent' : 
                                             subject.grade === 'B' ? 'Good' : 
                                             subject.grade === 'C' ? 'Average' : 
                                             subject.grade === 'D' ? 'Low' : 'Failed'}
                                          </div>
                                        </div>
                                      </td>
                                    </motion.tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Mobile View */}
                        <div className="lg:hidden space-y-3">
                          {result.subjects.map((subject, subIndex) => {
                            const impact = getGradeImpact(subject.grade);
                            const color = getGradeColor(subject.grade);
                            return (
                              <motion.div
                                key={subject.code}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: subIndex * 0.03 }}
                                className="p-4 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                      {subject.code}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                      {subject.name || "Course"}
                                    </div>
                                  </div>
                                  <GradeBadge grade={subject.grade} />
                                </div>
                                
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">CH</div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100 text-base">{subject.ch}</div>
                                  </div>
                                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Marks</div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100 text-base">{subject.marks}</div>
                                  </div>
                                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">QP</div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100 text-base">{Math.round(subject.qp)}</div>
                                  </div>
                                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Impact</div>
                                    <div className={`font-medium ${impact.color} flex items-center justify-center gap-1`}>
                                      {impact.icon}
                                      <span className="text-xs">{impact.impact}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Semester Summary - Enhanced */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 lg:mt-6 p-4 lg:p-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30"
                        >
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <div className="text-center">
                              <div className="text-sm lg:text-base font-medium text-blue-700 dark:text-blue-300 mb-1">
                                Total Marks
                              </div>
                              <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {totalMarks}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm lg:text-base font-medium text-blue-700 dark:text-blue-300 mb-1">
                                Credit Hours
                              </div>
                              <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {totalCredits}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm lg:text-base font-medium text-blue-700 dark:text-blue-300 mb-1">
                                Total QPs
                              </div>
                              <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {Math.round(result.subjects.reduce((sum, sub) => sum + sub.qp, 0))}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm lg:text-base font-medium text-green-700 dark:text-green-300 mb-1">
                                Semester GPA
                              </div>
                              <div className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                                {parseFloat(result.Gpa).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TableComponent;