import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiSend, FiMessageSquare, FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppRedirect = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please enter your name and message before sending via WhatsApp");
      return;
    }

    const phoneNumber = "923095330695";
    const encodedMessage = encodeURIComponent(
      `Hello! My name is ${formData.name}. ${formData.message}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailRedirect = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please enter your name and message before sending via Email");
      return;
    }

    const email = "umairim24@gmail.com";
    const subject = encodeURIComponent(
      `Message from ${formData.name} - CGPA Calculator Project`
    );
    const body = encodeURIComponent(
      `Sender Name: ${formData.name}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here if needed
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-16 md:py-20 font-Nunito ">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <FiMessageSquare className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Have questions about the CGPA Calculator? Let's discuss how we can
            improve your academic planning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <CiMail className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Email Contact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Send me a detailed message
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Perfect for longer inquiries or detailed discussions about the
                CGPA Calculator features.
              </p>
              <button
                onClick={handleEmailRedirect}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <MdOutlineEmail className="text-xl group-hover:scale-110 transition-transform" />
                Send via Email
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                  <FaWhatsapp className="text-2xl text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    WhatsApp Chat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Quick responses & real-time chat
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ideal for quick questions, instant feedback, or real-time
                discussions about the project.
              </p>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                Send via WhatsApp
              </button>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Write Your Message
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fill in your details and message, then choose your preferred
                contact method.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-6 text-gray-400">
                  <FiMessageSquare />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your message about the CGPA Calculator project..."
                  rows="6"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 resize-none"
                />
              </div>

              <div className="pt-4">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Ready to Send?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Your message will be sent with: <br />
                    <span className="font-medium">Name:</span>{" "}
                    {formData.name || "______"} <br />
                    <span className="font-medium">Message:</span>{" "}
                    {formData.message
                      ? formData.message.substring(0, 50) +
                        (formData.message.length > 50 ? "..." : "")
                      : "______"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleEmailRedirect}
                      className="flex-1 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <CiMail />
                      Send Email
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="flex-1 py-3 px-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp />
                      Send WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
