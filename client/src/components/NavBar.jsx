import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Calculator,
  Info,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { FaGraduationCap } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle theme change
  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Handle scroll effect and update active nav based on hash
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active nav based on scroll position
      const sections = [
        "home",
        "calculator",
        "gradulator",
        "results",
        "about",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active nav when location changes
  useEffect(() => {
    const hash = location.hash.replace("#", "") || "home";
    setActiveNav(hash);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items - FIXED: Removed "/#" prefix
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      path: "/",
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: <Calculator className="w-4 h-4" />,
      path: "/#calculator",
    },
    {
      id: "gradulator",
      label: "Gradulator",
      icon: <FaGraduationCap className="w-4 h-4" />,
      path: "/#gradulator",
    },
    {
      id: "about",
      label: "About",
      icon: <Info className="w-4 h-4" />,
      path: "/#about",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <MessageSquare className="w-4 h-4" />,
      path: "/#contact",
    },
  ];

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id, path) => {
    setActiveNav(id);
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100/30 dark:border-gray-800/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo & Brand */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/"
                onClick={() => setActiveNav("home")}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="relative h-10 w-10 1/1">
                  <img src="../logo_icon.png" alt="_logo" className="" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-20 -z-10"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    CGPA Harvester
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    Academic Excellence Simplified
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - FIXED: Simplified onClick */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveNav(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeNav === item.id
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {activeNav === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      layoutId="activeNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  theme ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <AnimatePresence mode="wait">
                  {theme ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - FIXED: Simplified onClick */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-900">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => {
                        setActiveNav(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        activeNav === item.id
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          activeNav === item.id
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                      {activeNav === item.id && (
                        <ChevronDown className="w-4 h-4 ml-auto transform rotate-90 text-emerald-500" />
                      )}
                    </Link>
                  ))}

                  {/* Mobile CTA Button */}
                  <Link
                    to="/#calculator"
                    onClick={() => {
                      setActiveNav("calculator");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Start Calculating</span>
                  </Link>
                </div>

                {/* Mobile Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    <p>UAF CGPA Calculator v4.0</p>
                    <p className="mt-1">
                      Official tool for University of Agriculture students
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default NavBar;