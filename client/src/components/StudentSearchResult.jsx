import React, { useState } from "react";
import { FaIdCardClip } from "react-icons/fa6";
import Input from "./partials/Input";
import MagicButton from "./partials/MagicButton";
import { motion } from "framer-motion";
import Loader from "./partials/Loader";

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
      console.log("Response:", data);
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
    className="flex secondary-text items-center gap-1 font-medium mb-3"
  >
    <FaIdCardClip />
    Register:
  </label>

  <div className="mb-4 gap-0.5 md:gap-2 flex items-center">
    {/* Disable input when loading */}
    <Input value={regNo} setregNo={setregNo} disabled={loading} />

    {/* MagicButton directly handles button logic */}
    {loading ? (
      <div className="min-h-[40px] min-w-[40px] max-h-[50px] flex items-center justify-center">
        &nbsp;
      </div>
    ) : (
      <MagicButton disabled={loading} text="Calc..." />
    )}
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
