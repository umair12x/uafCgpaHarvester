import React, { useState } from "react";
import { FaIdCardClip, FaCalculator } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./partials/Input";
import Loader from "./partials/Loader";
import Button from "./partials/Button";
import { RiGraduationCapFill } from "react-icons/ri";

const StudentResultSearch = ({ setStudentResponse, setAlertMessage }) => {
  const [regNo, setregNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!regNo.trim()) {
      setAlertMessage({
        type: "error",
        message: "Please enter a valid registration number",
      });
      return;
    }

    if (!/^\d{4}-ag-\d{1,6}$/.test(regNo.trim())) {
      setAlertMessage({
        type: "error",
        message: "Please use format: YYYY-ag-NNNNNN",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = { regNo: regNo.trim() };
      console.log("Fetching data for:", userData);
      console.log("Using backend URL:", import.meta.env.VITE_BACKEND_URL);
    //  ${import.meta.env.VITE_BACKEND_URL}/Cgpa/result
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Cgpa/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      setStudentResponse(data);
      setAlertMessage({
        type: data.type || "success",
        message: data.message || "Result fetched successfully",
      });
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-900/20 border border-white/20 dark:border-gray-700/30 p-6 sm:p-8 md:p-10">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-sky-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
          <div className="relative">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-md">
              <RiGraduationCapFill className="text-xl sm:text-2xl text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-sky-400 bg-clip-text text-transparent">
              Student Result Portal
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">
              Enter your registration number to calculate CGPA
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <FaIdCardClip className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="font-semibold">Registration Number</span>
            </div>

            <div className="relative group">
              <Input
                value={regNo}
                setregNo={setregNo}
                disabled={loading}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              {/* Focus indicator */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                  boxShadow: isFocused
                    ? "0 0 0 3px rgba(16, 185, 129, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)"
                    : "0 0 0 0px rgba(16, 185, 129, 0)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Format Helper */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Format: 2024-ag-123456</span>
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                {regNo.length}/14 characters
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            className="pt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={loading || !regNo.trim()}
              isLoading={loading}
              text={
                <span className="flex items-center gap-2">
                  <FaCalculator className="text-lg" />
                  Calculate CGPA
                </span>
              }
              onClick={handleSubmit}
            />
          </motion.div>
        </motion.form>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10"
            >
              <div className="relative">
                <Loader />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StudentResultSearch;
