import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Calculator, 
  ShieldCheck, 
  HelpCircle, 
  Info, 
  Mail, 
  Sparkles,
  TrendingUp,
  Download,
  Lock,
  Users,
  Zap,
  CheckCircle,
  Star
} from "lucide-react";


const AccordionContext = createContext();


const cn = (...classes) => classes.filter(Boolean).join(" ");


const Accordion = ({ type = "single", collapsible = true, children, className }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    setOpenItems((prev) => {
      if (type === "single") {
        if (prev.includes(value)) {
          return collapsible ? [] : prev;
        }
        return [value];
      }
      return prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ value, className, children }) => {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <motion.div
      layout
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm",
        isOpen ? "shadow-lg shadow-emerald-500/5" : "hover:shadow-md hover:shadow-gray-500/5",
        className
      )}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const AccordionTrigger = ({ value, className, children }) => {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <motion.button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between px-5 py-4 text-left transition-all duration-200",
        isOpen ? "bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-900/10 dark:to-cyan-900/10" : "",
        "hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-cyan-50/30 dark:hover:from-emerald-900/5 dark:hover:to-cyan-900/5",
        className
      )}
      whileTap={{ scale: 0.98 }}
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0">
          {React.isValidElement(children[0]) ? children[0] : null}
        </div>
        <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 flex-1 min-w-0">
          {React.isValidElement(children[1]) ? children[1] : children}
        </span>
      </div>
      <ChevronDown
        className={cn(
          "h-5 w-5 flex-shrink-0 transition-transform duration-300 text-gray-500 dark:text-gray-400",
          isOpen && "rotate-180 transform text-emerald-500 dark:text-emerald-400"
        )}
      />
    </motion.button>
  );
};

const AccordionContent = ({ value, className, children }) => {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={cn("px-5 pb-5 pt-0", className)}>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main FAQ Component
const UseAccordian = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      id: "item-1",
      question: "What is CGPA Harvester?",
      answer: "CGPA Harvester is a professional-grade calculator designed specifically for University of Agriculture Faisalabad students to accurately calculate their Cumulative Grade Point Average. It provides detailed academic insights and performance tracking throughout your degree journey.",
      icon: <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      tags: ["Introduction", "Overview"],
      note: "This tool is optimized for UAF's grading system and can adapt to other universities as well.",
      stats: "Used by 5000+ UAF students"
    },
    {
      id: "item-2",
      question: "Is it completely free to use?",
      answer: "Yes! CGPA Harvester is 100% free with no subscriptions, hidden charges, or premium features. We believe in making academic tools accessible to all students. The platform is supported by educational initiatives and community contributions.",
      icon: <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />,
      tags: ["Pricing", "Access"],
      note: "Will always remain free for UAF students.",
      stats: "Zero cost, forever"
    },
    {
      id: "item-3",
      question: "How accurate are the results?",
      answer: "The calculations follow UAF's official grading formulas and policies, ensuring precision and reliability. Our algorithms account for grade replacements, credit hour variations, and university-specific rules. Results match official university calculations with 95% accuracy.",
      icon: <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      tags: ["Accuracy", "Reliability"],
      note: "Always verify critical calculations with official university records.",
      stats: "95% accuracy rate"
    },
    {
      id: "item-4",
      question: "Can I save and export my results?",
      answer: "Yes! Your data automatically saves to your browser's secure local storage. You can also export results as PDF reports or share them securely. All data remains private and is never stored on our servers - it stays on your device.",
      icon: <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      tags: ["Export", "Privacy"],
      note: "Data is encrypted and never leaves your browser without permission.",
      stats: "Local storage only"
    },
    {
      id: "item-5",
      question: "Is my academic data secure?",
      answer: "Absolutely. We use advanced encryption and never store your personal or academic data on our servers. All calculations happen in your browser, and your registration number is securely processed with end-to-end encryption for maximum privacy protection.",
      icon: <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      tags: ["Security", "Privacy"],
      note: "Your data never leaves your device without explicit permission.",
      stats: "End-to-end encrypted"
    },
    {
      id: "item-6",
      question: "Can I use it on mobile devices?",
      answer: "Yes! CGPA Harvester is fully responsive and works perfectly on all devices - smartphones, tablets, and desktops. The mobile interface is optimized for touch interactions, and all features are available on any screen size.",
      icon: <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      tags: ["Mobile", "Responsive"],
      note: "Progressive Web App features available for offline use.",
      stats: "100% mobile responsive"
    }
  ];

  const filteredItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-lg mb-5">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-sky-400 bg-clip-text text-transparent mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know about CGPA Harvester, explained clearly and concisely.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center"
            >
              Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
            </motion.p>
          )}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-lg rounded-2xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-900/20 border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8"
        >
          {filteredItems.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {filteredItems.map((item, index) => (
                <AccordionItem 
                  key={item.id}
                  value={item.id}
                >
                  <AccordionTrigger value={item.id}>
                    {item.icon}
                    <span>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent value={item.id}>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full border border-emerald-100 dark:border-emerald-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Note Card */}
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg border border-emerald-100/50 dark:border-emerald-800/30">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium mb-1">
                              Important Note
                            </p>
                            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
                              {item.note}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No matches found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Try searching with different keywords or browse all questions below
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
            <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Still have questions?
              </p>
              <a
                href="mailto:support@cqpaharvester.com"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-1"
              >
                Contact our support team
                <ChevronDown className="w-4 h-4 rotate-90" />
              </a>
            </div>
          </div>
        </motion.div>

      
      </div>
    </section>
  );
};

// Search icon component
const Search = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default UseAccordian;
