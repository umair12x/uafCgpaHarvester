import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaHeart } from "react-icons/fa";
import { HiOutlineCode } from "react-icons/hi";
import ShakeButton from "./partials/ShakeButton";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="my-footer w-full flex flex-col items-center py-8 shadow-lg primary-boxes border-t dark:border-gray-700 transition-all duration-300">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6 items-center">
        {/* About Section */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <HiOutlineCode className="text-custom dark:text-custom text-lg" />
            <h3 className="text-vibrant lg:text-xl md:text-lg text-base font-bold">
              Built By Muhammad Umair
            </h3>
          </div>
          <p className="secondary-text text-sm mt-1 opacity-80">
            Student of UAF, BSCS Session 22 to 26
          </p>
          <p className="text-xs opacity-60 flex items-center gap-1">
            <FaHeart className="text-red-500 animate-pulse" />
            Made with passion & dedication
          </p>
        </div>

        {/* Divider with enhanced styling */}
        <div className="hidden md:flex justify-center">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-500 to-transparent opacity-50"></div>
        </div>

        {/* Social Icons Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-5">
            <ShakeButton
              icon={
                <FaGithub className="text-gray-900 dark:text-gray-100 text-xl hover:scale-110 transition-transform" />
              }
              link="https://github.com/umair12x"
              tooltip="GitHub Profile"
            />
            <ShakeButton
              icon={
                <FaLinkedin className="text-gray-900 dark:text-gray-100 text-xl hover:scale-110 transition-transform" />
              }
              link="https://linkedin.com/in/umair12x"
              tooltip="LinkedIn Profile"
            />
            <ShakeButton
              icon={
                <FaFacebook className="text-gray-900 dark:text-gray-100 text-xl hover:scale-110 transition-transform" />
              }
              link="https://facebook.com/umair12x"
              tooltip="Facebook Profile"
            />
          </div>
          <p className="flex items-center gap-2 secondary-text text-sm">
            <span className="">👉</span>
            <a
              href="https://umair12x.github.io/profiles/"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-text   font-medium transition-all "
            >
              View My Social Card
            </a>
          </p>
        </div>
      </div>

      {/* Enhanced Separator */}
      <div className="w-full max-w-4xl my-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50"></div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium">
          © {currentYear} All Rights Reserved
        </p>
        <p className="text-xs opacity-60 secondary-text">
          v1.0 • Made with React , Node.js & PlayWright
        </p>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default MyFooter;
