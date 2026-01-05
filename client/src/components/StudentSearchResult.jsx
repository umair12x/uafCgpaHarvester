import React, { useState } from "react";
import { FaIdCardClip } from "react-icons/fa6";
import Input from "./partials/Input";
import { motion } from "framer-motion";
import Loader from "./partials/Loader";
import Button from "./partials/Button";
import { FaCalculator } from "react-icons/fa";

const StudentResultSearch = ({ setStudentResponse, setAlertMessage }) => {
  const [regNo, setregNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!regNo.trim()) {
      setAlertMessage({
        type: "error",
        message: "Please enter a valid register number.",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = { regNo: regNo.trim() };
      console.log("Data:", userData);

      const response = await fetch("http://localhost:5000/Cgpa/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      // console.log("Response:", data);
      setStudentResponse(data);
      setAlertMessage({
        type: data.type,
        message: data.message,
      });
    } catch (error) {
      setAlertMessage({
        type: data.type,
        message: data.message,
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto rounded-lg p-3"
      initial={{ y: 25 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      <h2 className="text-center text-2xl font-semibold drop-shadow-lg text-vibrant mb-4">
        Student Result Search
      </h2>
      <hr className="border-gray-300 my-5 dark:border-gray-600" />

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="register"
          className="flex secondary-text flex-col gap-1 font-medium mb-3"
        >
          <p className="flex items-center gap-1">
            <FaIdCardClip /> Register:
          </p>
        </label>

        <div className="mb-4 gap-0.5 md:gap-2 min-h-[40px] flex items-center justify-center">
          <Input value={regNo} setregNo={setregNo} disabled={loading} />

          {loading ? (
            <div className="min-h-[40px] min-w-[40px] max-h-[50px] flex items-center justify-center">
              &nbsp;
            </div>
          ) : (
            <Button
              disabled={loading}
              text={<FaCalculator className="icon" />}
            />
          )}
        </div>
        <div className="mt-1 text-[11px] text-center text-gray-500 dark:text-slate-400">
          Format: 4-digit year - ag - digit number
        </div>
        {loading && (
          <div className="flex m-5 p-10 items-center justify-center">
            <Loader />
          </div>
        )}

      </form>
    </motion.div>
  );
};

export default StudentResultSearch;
