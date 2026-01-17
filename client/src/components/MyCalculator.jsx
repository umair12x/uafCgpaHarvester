import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  School,
  CheckCircle,
  ChevronLeft,
  Plus,
  Minus,
  Hash,
  BarChart3,
  TrendingUp,
  Award,
  X,
  Sparkles,
  RotateCcw,
  HelpCircle,
  Download,
  FileText,
  GraduationCap,
} from "lucide-react";

const MyCalculator = () => {
  const [mode, setMode] = useState("gpa");
  const [numSubjects, setNumSubjects] = useState(6);
  const [numSemesters, setNumSemesters] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [semesterGPAs, setSemesterGPAs] = useState([]);
  const [gpaResult, setGpaResult] = useState(null);
  const [cgpaResult, setCgpaResult] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const containerRef = useRef(null);
  const resultRef = useRef(null);

  // Initialize subjects
  useEffect(() => {
    const initialSubjects = Array.from({ length: numSubjects }, (_, i) => ({
      id: i + 1,
      name: `Subject ${i + 1}`,
      obtainedMarks: "",
      creditHours: 1,
    }));
    setSubjects(initialSubjects);
  }, [numSubjects]);

  // Initialize semester GPAs
  useEffect(() => {
    const initialSemesters = Array.from({ length: numSemesters }, (_, i) => ({
      id: i + 1,
      gpa: "",
    }));
    setSemesterGPAs(initialSemesters);
  }, [numSemesters]);

  // Quality points calculation
  const getQualityPoint = (obtainedMarks, creditHours) => {
    if (!obtainedMarks || creditHours <= 0) return 0;
    const totalMarks = creditHours * 20;
    const percentage = (obtainedMarks / totalMarks) * 100;
    let qpPerCreditHour = 0;

    if (percentage < 40) qpPerCreditHour = 0;
    else if (percentage < 50) qpPerCreditHour = 1.0 + (percentage - 40) * 0.1;
    else if (percentage < 80)
      qpPerCreditHour = 2.0 + (percentage - 50) * (2 / 30);
    else qpPerCreditHour = 4.0;

    return Number((qpPerCreditHour * creditHours).toFixed(2));
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 65) return "B-";
    if (percentage >= 60) return "C+";
    if (percentage >= 55) return "C";
    if (percentage >= 50) return "C-";
    if (percentage >= 40) return "D";
    return "F";
  };

  const calculateGPA = () => {
    const results = [];
    let totalQP = 0;
    let totalCH = 0;

    subjects.forEach((subject) => {
      if (subject.obtainedMarks && subject.creditHours > 0) {
        const totalMarks = subject.creditHours * 20;
        const percentage = (subject.obtainedMarks / totalMarks) * 100;
        const qp = getQualityPoint(subject.obtainedMarks, subject.creditHours);
        const grade = getGrade(percentage);

        totalQP += qp;
        totalCH += subject.creditHours;

        results.push({
          subject: subject.name,
          obtained: parseFloat(subject.obtainedMarks),
          total: totalMarks,
          percent: Number(percentage.toFixed(1)),
          grade,
          qp,
          ch: subject.creditHours,
        });
      }
    });

    const gpa = totalCH > 0 ? totalQP / totalCH : 0;

    setGpaResult({
      results,
      gpa: Number(gpa.toFixed(2)),
      totalQP,
      totalCH,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const calculateCGPA = () => {
    const validGPAs = semesterGPAs.filter(
      (s) => s.gpa && !isNaN(parseFloat(s.gpa))
    );
    if (validGPAs.length === 0) return setCgpaResult(null);

    const total = validGPAs.reduce((sum, s) => sum + parseFloat(s.gpa), 0);
    const cgpa = total / validGPAs.length;

    setCgpaResult({
      semesters: validGPAs.map((s) => ({
        id: s.id,
        gpa: parseFloat(s.gpa),
      })),
      cgpa: Number(cgpa.toFixed(2)),
      total,
      count: validGPAs.length,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const updateSubject = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: field === "name" ? value : Number(value) || "",
            }
          : subject
      )
    );
  };

  const updateSemesterGPA = (id, value) => {
    setSemesterGPAs((prev) =>
      prev.map((semester) =>
        semester.id === id
          ? { ...semester, gpa: value.replace(/[^0-9.]/g, "").slice(0, 4) }
          : semester
      )
    );
  };

  const resetGPA = () => setGpaResult(null);
  const resetCGPA = () => setCgpaResult(null);

  const resetAll = () => {
    if (mode === "gpa") {
      setSubjects(
        Array.from({ length: numSubjects }, (_, i) => ({
          id: i + 1,
          name: `Subject ${i + 1}`,
          obtainedMarks: "",
          creditHours: 1,
        }))
      );
      resetGPA();
    } else {
      setSemesterGPAs(
        Array.from({ length: numSemesters }, (_, i) => ({
          id: i + 1,
          gpa: "",
        }))
      );
      resetCGPA();
    }
  };

  const generatePDF = async () => {
    if (!gpaResult && !cgpaResult) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 20;
      let yPos = margin;
      
      // Colors
      const primaryColor = mode === 'gpa' ? [16, 185, 129] : [8, 145, 178]; // Emerald/Cyan in RGB
      const secondaryColor = mode === 'gpa' ? [5, 150, 105] : [6, 182, 212];
      const grayColor = [100, 100, 100];
      const lightGrayColor = [200, 200, 200];
      const darkGrayColor = [50, 50, 50];
      
      // Header - Matching your new branding
      pdf.setFontSize(24);
      pdf.setTextColor(...primaryColor);
      pdf.setFont("helvetica", "bold");
      pdf.text("Calculator", pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 8;
      pdf.setFontSize(12);
      pdf.setTextColor(...grayColor);
      pdf.setFont("helvetica", "normal");
      pdf.text("CGPA & GPA Calculator", pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 6;
      pdf.setFontSize(10);
      pdf.setTextColor(...lightGrayColor);
      pdf.text("UAF CGPA Harvester", pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 8;
      pdf.setFontSize(9);
      pdf.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 20;
      
      // Draw header line
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos - 5, pageWidth - margin, yPos - 5);
      
      if (mode === "gpa" && gpaResult) {
        // GPA Report Title
        pdf.setFontSize(18);
        pdf.setTextColor(...primaryColor);
        pdf.setFont("helvetica", "bold");
        pdf.text("GPA Report", margin, yPos);
        
        pdf.setFontSize(14);
        pdf.text(`Semester GPA: ${gpaResult.gpa.toFixed(2)} / 4.0`, pageWidth - margin, yPos, { align: 'right' });
        
        yPos += 15;
        
        // Summary Box
        pdf.setFillColor(240, 253, 244);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 25, 'F');
        pdf.setDrawColor(167, 243, 208);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 25);
        
        const summaryWidth = (pageWidth - margin * 2) / 3;
        
        pdf.setFontSize(11);
        pdf.setTextColor(...darkGrayColor);
        pdf.setFont("helvetica", "normal");
        pdf.text("Total Quality Points", margin + 10, yPos + 8);
        pdf.text("Total Credit Hours", margin + summaryWidth + 10, yPos + 8);
        pdf.text("Subjects", margin + summaryWidth * 2 + 10, yPos + 8);
        
        pdf.setFontSize(14);
        pdf.setTextColor(...primaryColor);
        pdf.setFont("helvetica", "bold");
        pdf.text(gpaResult.totalQP.toFixed(2), margin + 10, yPos + 18);
        pdf.text(gpaResult.totalCH.toString(), margin + summaryWidth + 10, yPos + 18);
        pdf.text(gpaResult.results.length.toString(), margin + summaryWidth * 2 + 10, yPos + 18);
        
        yPos += 35;
        
        // Subject Details Title
        pdf.setFontSize(14);
        pdf.setTextColor(...darkGrayColor);
        pdf.setFont("helvetica", "bold");
        pdf.text("Subject Details", margin, yPos);
        
        yPos += 8;
        
        // Table Header
        pdf.setFillColor(...primaryColor);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 8, 'F');
        
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        
        const colWidths = [60, 30, 20, 20, 20, 20];
        let xPos = margin + 2;
        
        ["Subject", "Marks", "Credits", "Grade", "QP", "%"].forEach((header, index) => {
          pdf.text(header, xPos + (index > 0 ? colWidths.slice(0, index).reduce((a, b) => a + b, 0) : 0), yPos + 5);
        });
        
        yPos += 10;
        
        // Table Rows
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        
        gpaResult.results.forEach((result, index) => {
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }
          
          // Alternate row colors
          if (index % 2 === 0) {
            pdf.setFillColor(249, 249, 249);
            pdf.rect(margin, yPos - 2, pageWidth - margin * 2, 8, 'F');
          }
          
          // Draw row border
          pdf.setDrawColor(221, 221, 221);
          pdf.setLineWidth(0.1);
          pdf.line(margin, yPos + 6, pageWidth - margin, yPos + 6);
          
          // Subject
          pdf.setTextColor(...darkGrayColor);
          const subjectText = result.subject.length > 25 ? result.subject.substring(0, 22) + "..." : result.subject;
          pdf.text(subjectText, margin + 2, yPos + 5);
          
          // Marks
          pdf.text(`${result.obtained.toFixed(0)}/${result.total}`, margin + 62, yPos + 5);
          
          // Credits
          pdf.text(result.ch.toString(), margin + 92, yPos + 5);
          
          // Grade (with colored background)
          pdf.setFillColor(...primaryColor);
          pdf.rect(margin + 112, yPos - 1, 15, 6, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.text(result.grade, margin + 114, yPos + 5);
          
          // QP
          pdf.setTextColor(...primaryColor);
          pdf.setFont("helvetica", "bold");
          pdf.text(result.qp.toFixed(1), margin + 132, yPos + 5);
          
          // Percentage
          pdf.setTextColor(...darkGrayColor);
          pdf.setFont("helvetica", "normal");
          pdf.text(`${result.percent}%`, margin + 152, yPos + 5);
          
          yPos += 8;
        });
        
        yPos += 10;
        
        // Formula
        if (yPos > pageHeight - 40) {
          pdf.addPage();
          yPos = margin;
        }
        
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 20, 'F');
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, margin, yPos + 20);
        
        pdf.setFontSize(10);
        pdf.setTextColor(...grayColor);
        pdf.text("Calculation Formula:", margin + 5, yPos + 8);
        
        pdf.setFontSize(9);
        pdf.setFont("courier", "normal");
        pdf.setTextColor(...primaryColor);
        const formulaText = `GPA = ${gpaResult.totalQP.toFixed(2)} QP ÷ ${gpaResult.totalCH} CH = ${gpaResult.gpa.toFixed(2)}`;
        pdf.text(formulaText, margin + 5, yPos + 15);
        
        yPos += 25;
        
      } else if (mode === "cgpa" && cgpaResult) {
        // CGPA Report Title
        pdf.setFontSize(18);
        pdf.setTextColor(...primaryColor);
        pdf.setFont("helvetica", "bold");
        pdf.text("CGPA Report", margin, yPos);
        
        pdf.setFontSize(14);
        pdf.text(`Cumulative GPA: ${cgpaResult.cgpa.toFixed(2)} / 4.0`, pageWidth - margin, yPos, { align: 'right' });
        
        yPos += 15;
        
        // Summary Box
        pdf.setFillColor(236, 254, 255);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 25, 'F');
        pdf.setDrawColor(165, 243, 252);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 25);
        
        const summaryWidth = (pageWidth - margin * 2) / 3;
        
        pdf.setFontSize(11);
        pdf.setTextColor(...darkGrayColor);
        pdf.setFont("helvetica", "normal");
        pdf.text("Total GPA Sum", margin + 10, yPos + 8);
        pdf.text("Semesters", margin + summaryWidth + 10, yPos + 8);
        pdf.text("Average per Semester", margin + summaryWidth * 2 + 10, yPos + 8);
        
        pdf.setFontSize(14);
        pdf.setTextColor(...primaryColor);
        pdf.setFont("helvetica", "bold");
        pdf.text(cgpaResult.total.toFixed(2), margin + 10, yPos + 18);
        pdf.text(cgpaResult.count.toString(), margin + summaryWidth + 10, yPos + 18);
        pdf.text(cgpaResult.cgpa.toFixed(2), margin + summaryWidth * 2 + 10, yPos + 18);
        
        yPos += 35;
        
        // Semester Details Title
        pdf.setFontSize(14);
        pdf.setTextColor(...darkGrayColor);
        pdf.setFont("helvetica", "bold");
        pdf.text("Semester Performance", margin, yPos);
        
        yPos += 8;
        
        // Table Header
        pdf.setFillColor(...primaryColor);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 8, 'F');
        
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        
        const colWidths = [30, 30, 50, 50];
        let xPos = margin + 2;
        
        ["Semester", "GPA", "Status", "Performance"].forEach((header, index) => {
          pdf.text(header, xPos + (index > 0 ? colWidths.slice(0, index).reduce((a, b) => a + b, 0) : 0), yPos + 5);
        });
        
        yPos += 10;
        
        // Table Rows
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        
        cgpaResult.semesters.forEach((semester, index) => {
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }
          
          // Alternate row colors
          if (index % 2 === 0) {
            pdf.setFillColor(249, 249, 249);
            pdf.rect(margin, yPos - 2, pageWidth - margin * 2, 8, 'F');
          }
          
          // Draw row border
          pdf.setDrawColor(221, 221, 221);
          pdf.setLineWidth(0.1);
          pdf.line(margin, yPos + 6, pageWidth - margin, yPos + 6);
          
          // Semester
          pdf.setTextColor(...darkGrayColor);
          pdf.text(`Sem ${semester.id}`, margin + 2, yPos + 5);
          
          // GPA
          pdf.setTextColor(...primaryColor);
          pdf.setFont("helvetica", "bold");
          pdf.text(semester.gpa.toFixed(2), margin + 32, yPos + 5);
          
          // Status
          pdf.setFont("helvetica", "normal");
          const status = semester.gpa >= 3.5 ? 'Excellent' : 
                        semester.gpa >= 3.0 ? 'Good' : 
                        semester.gpa >= 2.5 ? 'Average' : 'Low';
          
          let statusColor;
          if (semester.gpa >= 3.5) statusColor = [5, 150, 105]; // Emerald
          else if (semester.gpa >= 3.0) statusColor = [8, 145, 178]; // Cyan
          else if (semester.gpa >= 2.5) statusColor = [217, 119, 6]; // Amber
          else statusColor = [220, 38, 38]; // Red
          
          pdf.setFillColor(...statusColor);
          pdf.rect(margin + 62, yPos - 1, 20, 6, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.text(status, margin + 64, yPos + 5);
          
          // Performance Bar
          pdf.setTextColor(...darkGrayColor);
          const performance = Math.round((semester.gpa / 4) * 100);
          
          // Draw progress bar background
          pdf.setFillColor(229, 231, 235);
          pdf.rect(margin + 112, yPos - 1, 50, 4, 'F');
          
          // Draw progress bar fill
          pdf.setFillColor(...statusColor);
          const barWidth = (50 * performance) / 100;
          pdf.rect(margin + 112, yPos - 1, barWidth, 4, 'F');
          
          // Performance percentage
          pdf.setTextColor(...primaryColor);
          pdf.setFont("helvetica", "bold");
          pdf.text(`${performance}%`, margin + 165, yPos + 5);
          
          yPos += 8;
        });
        
        yPos += 10;
        
        // Formula
        if (yPos > pageHeight - 40) {
          pdf.addPage();
          yPos = margin;
        }
        
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 20, 'F');
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, margin, yPos + 20);
        
        pdf.setFontSize(10);
        pdf.setTextColor(...grayColor);
        pdf.text("Calculation Formula:", margin + 5, yPos + 8);
        
        pdf.setFontSize(9);
        pdf.setFont("courier", "normal");
        pdf.setTextColor(...primaryColor);
        const formulaText = `CGPA = ${cgpaResult.total.toFixed(2)} ÷ ${cgpaResult.count} semesters = ${cgpaResult.cgpa.toFixed(2)}`;
        pdf.text(formulaText, margin + 5, yPos + 15);
        
        yPos += 25;
      }
      
      // Footer with updated branding
      if (yPos > pageHeight - 30) {
        pdf.addPage();
        yPos = margin;
      }
      
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      
      yPos += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(...grayColor);
      pdf.setFont("helvetica", "normal");
      pdf.text("Generated by UAF CGPA Calculator", pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 5;
      pdf.setFontSize(8);
      pdf.setTextColor(...lightGrayColor);
      pdf.text("CGPA & GPA Calculator - UAF CGPA Harvester", pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 5;
      pdf.text(`© ${new Date().getFullYear()} UAF CGPA Calculator. All calculations are based on UAF grading system.`, pageWidth / 2, yPos, { align: 'center' });
      
      // Save PDF with appropriate filename
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `UAF_${mode === 'gpa' ? 'GPA' : 'CGPA'}_Report_${timestamp}.pdf`;
      
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const tutorialSteps = [
    {
      icon: BookOpen,
      color: "emerald",
      title: "Enter Subject Details",
      description: "Input subject names, marks obtained, and credit hours",
    },
    {
      icon: Hash,
      color: "cyan",
      title: "Set Credit Hours",
      description: "Select from 1-5 credit hours per subject",
    },
    {
      icon: Calculator,
      color: "violet",
      title: "Calculate GPA",
      description: "Get instant GPA on 4.0 scale",
    },
    {
      icon: TrendingUp,
      color: "amber",
      title: "Track Progress",
      description: "Monitor semester-wise performance",
    },
  ];

  const getGradeColor = (grade) => {
    if (grade.includes("A"))
      return "bg-gradient-to-r from-emerald-500 to-emerald-600";
    if (grade.includes("B"))
      return "bg-gradient-to-r from-cyan-500 to-cyan-600";
    if (grade.includes("C"))
      return "bg-gradient-to-r from-amber-500 to-amber-600";
    if (grade === "D") return "bg-gradient-to-r from-orange-500 to-orange-600";
    return "bg-gradient-to-r from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 my-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Tutorial Modal */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3"
              onClick={() => setShowTutorial(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 max-w-sm w-full border border-gray-200/80 dark:border-gray-700/80 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        Quick Start Guide
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Master the calculator in 4 steps
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-3">
                  {tutorialSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-800/30 dark:to-gray-900/30"
                      onClick={() => setActiveStep(index)}
                    >
                      <div
                        className={`p-1.5 rounded-md bg-${step.color}-100 dark:bg-${step.color}-900/20`}
                      >
                        <step.icon
                          className={`w-3.5 h-3.5 text-${step.color}-600 dark:text-${step.color}-400`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          activeStep === index
                            ? `border-${step.color}-500 bg-${step.color}-500`
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTutorial(false)}
                  className="w-full mt-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Start Calculating
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Enhanced Header with updated branding */}
          <div className="relative bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-sm"
                  />
                  <div className="relative p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-lg">
                    <GraduationCap className="text-xl sm:text-2xl text-white" />
                  </div>
                </div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-4xl font-bold"
                  >
                    <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-violet-400 bg-clip-text text-transparent">
                      Calculator
                    </span>
                  </motion.h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 flex items-center gap-1">
                    <span className="inline-flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      CGPA & GPA Manually
                    </span>
                    <span className="mx-2">•</span>
                    <span>UAF CGPA Harvester</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTutorial(true)}
                  className="p-2 sm:p-2.5 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow transition-all flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-xs font-medium">Guide</span>
                </motion.button>
                
                {(gpaResult || cgpaResult) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generatePDF}
                    disabled={isGeneratingPDF}
                    className="p-2 sm:p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg sm:rounded-xl border border-emerald-600 hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="hidden sm:inline text-xs font-medium">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline text-xs font-medium">Download PDF</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-3 sm:p-4 md:p-6 ${isExpanded ? "min-h-[600px]" : ""}`}
          >
            {/* Mode Selector - Unique Toggle */}
            <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-1 mb-4 sm:mb-6 max-w-md mx-auto">
              {/* Animated Background Slider */}
              <motion.div
                className={`absolute top-1 bottom-1 w-1/2 rounded-lg ${
                  mode === "gpa"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 left-1"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600 left-[calc(50%-2px)]"
                }`}
                layoutId="modeToggle"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              <div className="relative flex">
                <button
                  onClick={() => {
                    setMode("gpa");
                    resetGPA();
                  }}
                  className={`flex-1 py-2.5 px-2 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 z-10
                    ${
                      mode === "gpa"
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }
                    `}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className={`text-xs sm:text-sm font-medium`}>
                    GPA Calculator
                  </span>
                </button>
                <button
                  onClick={() => {
                    setMode("cgpa");
                    resetCGPA();
                  }}
                  className={`flex-1 py-2.5 px-2 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 z-10
                    ${
                      mode === "cgpa"
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }
                    `}
                >
                  <School className="w-5 h-5" />
                  <span className={`text-xs sm:text-sm font-medium`}>
                    CGPA Calculator
                  </span>
                </button>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {mode === "gpa" && !gpaResult && (
                <motion.div
                  key="gpa-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                >
                  {/* Subjects Header */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-md">
                        <Hash className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                          Subject Details
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enter marks and credit hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            setNumSubjects((prev) => Math.max(1, prev - 1))
                          }
                          className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          disabled={numSubjects <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="px-2 py-1.5 sm:px-4 flex flex-row items-baseline">
                          <span className="font-mono sm:text-[20px] text-[14px] font-bold text-emerald-700 dark:text-emerald-400">
                            {numSubjects}
                          </span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-0.5">
                            Sub
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setNumSubjects((prev) => Math.min(10, prev + 1))
                          }
                          className="p-1 rounded text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                          disabled={numSubjects >= 10}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetAll}
                        className="p-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow transition-all"
                      >
                        <RotateCcw className="w-[17px] h-[17px]" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subjects Table - Compact for Mobile */}
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto -mx-0">
                      <table className="w-full min-w-[300px]">
                        <thead className="bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 dark:from-emerald-900/20 dark:to-emerald-900/30">
                          <tr className="text-[12px] xs:text-xs font-medium text-emerald-700 dark:text-emerald-300">
                            <th className="py-1.5 px-1 text-left font-semibold">
                              Subject
                            </th>
                            <th className="py-1.5 px-1 text-center font-semibold">
                              Marks
                            </th>
                            <th className="py-1.5 px-1 text-center font-semibold">
                              Credits
                            </th>
                            <th className="py-1.5 px-1 text-center font-semibold">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {subjects.map((subject) => (
                            <tr
                              key={subject.id}
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                            >
                              <td className="py-1 px-1">
                                <input
                                  type="text"
                                  value={subject.name}
                                  onChange={(e) =>
                                    updateSubject(
                                      subject.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-1.5 py-1 text-emerald-500 text-xs bg-transparent border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 truncate"
                                  placeholder="Subject"
                                />
                              </td>
                              <td className="py-1 px-1">
                                <input
                                  type="number"
                                  inputMode="decimal"
                                  value={subject.obtainedMarks}
                                  onChange={(e) =>
                                    updateSubject(
                                      subject.id,
                                      "obtainedMarks",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-1.5 py-1 text-emerald-500 text-xs bg-transparent border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-center font-mono appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                  placeholder="0"
                                  max={subject.creditHours * 20}
                                />
                              </td>
                              <td className="py-1 px-1">
                                <select
                                  value={subject.creditHours}
                                  onChange={(e) =>
                                    updateSubject(
                                      subject.id,
                                      "creditHours",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-1 py-1 text-emerald-500 text-xs bg-transparent border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-center appearance-none"
                                >
                                  {[1, 2, 3, 4, 5].map((ch) => (
                                    <option
                                      key={ch}
                                      value={ch}
                                      className="text-orange-500 bg-white dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-800 active:bg-green-500"
                                    >
                                      {ch}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                  {subject.creditHours * 20}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calculateGPA}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate GPA
                  </motion.button>
                </motion.div>
              )}

              {mode === "gpa" && gpaResult && (
                <motion.div
                  key="gpa-result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                  ref={resultRef}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={resetGPA}
                      className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-medium"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        GPA Results
                      </h3>
                    </div>
                  </div>

                  {/* Results Table - Compact */}
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto -mx-0">
                      <table className="w-full min-w-[320px]">
                        <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                          <tr className="text-[10px] xs:text-xs font-medium">
                            <th className="py-1.5 px-1 text-left">Subject</th>
                            <th className="py-1.5 px-1 text-left">Marks</th>
                            <th className="py-1.5 px-1 text-left">Grade</th>
                            <th className="py-1.5 px-1 text-left">QP</th>
                            <th className="py-1.5 px-1 text-left">%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {gpaResult.results.map((result, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                            >
                              <td className="py-1 px-1 text-xs font-medium text-gray-800 dark:text-gray-200 truncate max-w-[80px]">
                                {result.subject}
                              </td>
                              <td className="py-1 px-1">
                                <span className="font-mono text-xs">
                                  {result.obtained.toFixed(0)}
                                  <span className="text-emerald-500 dark:text-emerald-400 text-[10px] ml-0.5">
                                    /{result.total}
                                  </span>
                                </span>
                              </td>
                              <td className="py-1 px-1">
                                <span
                                  className={`inline-flex items-center justify-center w-7 h-5 text-[10px] font-bold rounded ${getGradeColor(
                                    result.grade
                                  )} text-white`}
                                >
                                  {result.grade}
                                </span>
                              </td>
                              <td className="py-1 px-1">
                                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                  {result.qp.toFixed(1)}
                                </span>
                              </td>
                              <td className="py-1 px-1">
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                                      style={{
                                        width: `${Math.min(
                                          result.percent,
                                          100
                                        )}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-6 text-right">
                                    {result.percent}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* GPA Summary */}
                  <div className="bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-900/30 rounded-xl p-4 border border-emerald-100/50 dark:border-emerald-800/30">
                    <div className="flex flex-col xs:flex-row items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <BarChart3 className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Semester GPA
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-500 dark:text-emerald-500 mt-0.5">
                          {gpaResult.totalQP.toFixed(2)} QP ÷{" "}
                          {gpaResult.totalCH} CH
                        </p>
                        <p className="text-[9px] text-gray-400 mt-1">
                          Calculated on {gpaResult.date} at {gpaResult.time}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                          {gpaResult.gpa.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          /4.0
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {mode === "cgpa" && !cgpaResult && (
                <motion.div
                  key="cgpa-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                >
                  {/* Semesters Header */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-md">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                          Semester GPAs
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enter semester-wise GPAs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-cyan-900/20 dark:to-emerald-900/20 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            setNumSemesters((prev) => Math.max(1, prev - 1))
                          }
                          className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          disabled={numSemesters <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="px-2 py-1.5 sm:px-4 flex flex-row items-baseline">
                          <span className="font-mono sm:text-[20px] text-[14px] font-bold text-cyan-700 dark:text-cyan-400">
                            {numSemesters}
                          </span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-0.5">
                            Sem
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setNumSemesters((prev) => Math.min(10, prev + 1))
                          }
                          className="p-1 rounded text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                          disabled={numSemesters >= 10}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetAll}
                        className="p-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow transition-all"
                      >
                        <RotateCcw className="w-[17px] h-[17px]" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Semester Cards Grid - Responsive */}
                  <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {semesterGPAs.map((semester) => (
                      <div
                        key={semester.id}
                        className="bg-gradient-to-br from-cyan-50/50 to-white dark:from-cyan-900/10 dark:to-gray-900/30 p-3 rounded-lg border border-cyan-100/50 dark:border-cyan-800/30 hover:shadow transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                            Sem {semester.id}
                          </span>
                          <span className="text-[10px] text-cyan-500 dark:text-cyan-500">
                            /4.0
                          </span>
                        </div>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={semester.gpa}
                          onChange={(e) =>
                            updateSemesterGPA(semester.id, e.target.value)
                          }
                          className="w-full text-2xl font-bold text-cyan-700 dark:text-cyan-300 bg-transparent border-0 focus:outline-none focus:ring-0 text-center font-mono placeholder:text-gray-300 dark:placeholder:text-gray-700"
                          placeholder="0.00"
                          maxLength={4}
                        />
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calculateCGPA}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Calculate CGPA
                  </motion.button>
                </motion.div>
              )}

              {mode === "cgpa" && cgpaResult && (
                <motion.div
                  key="cgpa-result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                  ref={resultRef}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={resetCGPA}
                      className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-xs font-medium"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-cyan-500" />
                      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        CGPA Results
                      </h3>
                    </div>
                  </div>

                  {/* Results Table - Compact */}
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto -mx-0">
                      <table className="w-full min-w-[320px]">
                        <thead className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
                          <tr className="text-[10px] xs:text-xs font-medium">
                            <th className="py-1.5 px-1 text-left">Semester</th>
                            <th className="py-1.5 px-1 text-left">GPA</th>
                            <th className="py-1.5 px-1 text-left">Status</th>
                            <th className="py-1.5 px-1 text-left">Progress</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {cgpaResult.semesters.map((semester) => (
                            <tr
                              key={semester.id}
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                            >
                              <td className="py-1 px-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                                Sem {semester.id}
                              </td>
                              <td className="py-1 px-1">
                                <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                                  {semester.gpa.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-1 px-1">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${
                                    semester.gpa >= 3.5
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                      : semester.gpa >= 3.0
                                      ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400"
                                      : semester.gpa >= 2.5
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }`}
                                >
                                  <div
                                    className={`w-1 h-1 rounded-full ${
                                      semester.gpa >= 3.5
                                        ? "bg-emerald-500"
                                        : semester.gpa >= 3.0
                                        ? "bg-cyan-500"
                                        : semester.gpa >= 2.5
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                    }`}
                                  />
                                  {semester.gpa >= 3.5
                                    ? "Excellent"
                                    : semester.gpa >= 3.0
                                    ? "Good"
                                    : semester.gpa >= 2.5
                                    ? "Average"
                                    : "Low"}
                                </span>
                              </td>
                              <td className="py-1 px-1">
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
                                      style={{
                                        width: `${(semester.gpa / 4) * 100}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-6 text-right">
                                    {((semester.gpa / 4) * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* CGPA Summary */}
                  <div className="bg-gradient-to-br from-cyan-50/50 to-white dark:from-cyan-900/10 dark:to-gray-900/30 rounded-xl p-4 border border-cyan-100/50 dark:border-cyan-800/30">
                    <div className="flex flex-col xs:flex-row items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Cumulative GPA
                          </span>
                        </div>
                        <p className="text-[10px] text-cyan-500 dark:text-cyan-500 mt-0.5">
                          {cgpaResult.total.toFixed(2)} ÷ {cgpaResult.count}{" "}
                          semesters
                        </p>
                        <p className="text-[9px] text-gray-400 mt-1">
                          Calculated on {cgpaResult.date} at {cgpaResult.time}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                          {cgpaResult.cgpa.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          /4.0
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalculator;