import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./partials/Accordian";
import { HelpCircle, Calculator, ShieldCheck } from "lucide-react";

const UseAccordian = () => {
  const faqItems = [
    {
      id: "item-1",
      question: "What is CGPA Harvester?",
      answer: "CGPA Harvester is a professional grade calculator designed specifically for UAF students to accurately calculate their Cumulative Grade Point Average (CGPA) and track academic performance throughout their degree program.",
      icon: <Calculator className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
    },
    {
      id: "item-2",
      question: "Is it completely free to use?",
      answer: "Yes, CGPA Harvester is 100% free with no hidden costs, subscription fees, or premium features. We believe in supporting academic success without financial barriers.",
      icon: <ShieldCheck className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
    },
    {
      id: "item-3",
      question: "How accurate are the calculations?",
      answer: "The calculator uses UAF's official grading system and follows standard CGPA calculation formulas to ensure 100% accuracy. Results match official university calculations.",
      icon: <HelpCircle className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
    },
    {
      id: "item-4",
      question: "Can I save my calculations?",
      answer: "Yes, all calculations are automatically saved in your browser's local storage. Your data remains private and accessible only from your device.",
      icon: <ShieldCheck className="w-4 h-4 mr-3 text-orange-600 dark:text-orange-400" />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Everything you need to know about CGPA Harvester
        </p>
      </div>

      {/* Accordion Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 md:p-6">
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border-gray-200 dark:border-gray-700 px-3"
            >
              <AccordionTrigger value={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex items-center">
                  {item.icon}
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {item.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent value={item.id}>
                <div className="pl-7 pr-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                  {item.id === "item-1" && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <span className="font-semibold">Note:</span> This tool is specifically optimized for UAF's grading system but can be adapted for other universities.
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Additional Help Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Need more help?{" "}
          <a 
            href="mailto:support@cqpaharvester.com" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default UseAccordian;