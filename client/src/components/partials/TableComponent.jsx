import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GloyButton from "./GloyButtoon";

const TableComponent = ({ studentRespone }) => {
  const [visibleTableIndex, setVisibleTableIndex] = useState(null);

  const toggleVisibleTableIndex = (index) => {
    setVisibleTableIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {studentRespone?.result?.length > 0 && (
        <div className="min-w-[290px] max-w-[350px] sm:min-w-[450px] lg:min-w-[525px] transition-colors duration-500 mx-auto">
          {studentRespone.result?.map((result, index) => (
            <motion.div
              key={result.semester || index}
              className="w-full max-w-lg my-4 md:max-w-2xl lg:max-w-3xl p-4 bg-white dark:bg-gradient-to-r from-gray-800 via-gray-900 to-[#0b0514] rounded-md shadow-md border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 0.4,
                delay: index * 0.15,
              }}
            >
              {/* Semester Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-vibrant relative group cursor-pointer">
                  {result.semester}
                  <span className="absolute left-0 -bottom-1 h-[1px]  bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-900 group-hover:w-full"></span>
                </h3>

                <GloyButton
                  result={`${result.Gpa}`}
                  onClick={() => toggleVisibleTableIndex(index)}
                />
              </div>

              {/* Animated Table */}
              <AnimatePresence>
                {visibleTableIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
                        {/* Table Header */}
                        <thead className="table-header">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold"
                            >
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold"
                            >
                              Cr.Hr
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold"
                            >
                              Marks
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold"
                            >
                              Grade
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold"
                            >
                              Gr.Pt.
                            </th>
                          </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y gap-y-10.5 divide-gray-200 dark:divide-gray-600">
                          {result.subjects.map((subject) => (
                            <tr
                              key={subject.courseCode}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                              <td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-800 dark:text-gray-200 font-medium">
                                {subject.code}
                              </td>
                              <td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-800 dark:text-gray-200 text-center">
                                {subject.ch}
                              </td>
                              <td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-800 dark:text-gray-200 text-center">
                                {subject.marks}
                              </td>
                              <td className=" sm:px-4 sm:py-3 text-gray-800 dark:text-gray-200 text-center">
                                <span
                                  className={` p-2 rounded-lg ${
                                    subject.grade === "F"
                                      ? "text-red-800  bg-red-50 "
                                      : subject.grade === "D"
                                      ? "text-orange-800 bg-yellow-100 "
                                      : subject.grade === "C"
                                      ? "text-gray-800 bg-gray-100 "
                                      : subject.grade === "A"
                                      ? "text-green-800 bg-green-100 "
                                      : "text-blue-800 bg-blue-50 "
                                  } `}
                                >
                                  {subject.grade}
                                </span>
                              </td>
                              <td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-800 dark:text-gray-200 text-center">
                                {Math.round(subject.qp)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default TableComponent;
