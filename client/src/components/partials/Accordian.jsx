import React, { useState, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";

/* utility */
const cn = (...classes) => classes.filter(Boolean).join(" ");

const AccordionContext = createContext();

/* Root */
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

/* Item */
const AccordionItem = ({ value, className, children }) => {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div 
      className={cn(
        "accordion-item border rounded-lg overflow-hidden transition-all duration-200",
        isOpen ? "shadow-sm dark:shadow-gray-900/30" : "",
        className
      )}
      data-value={value}
    >
      {children}
    </div>
  );
};

/* Trigger */
const AccordionTrigger = ({ value, className, children }) => {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        "accordion-trigger flex w-full items-center justify-between py-4 text-sm transition-all text-left",
        isOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg",
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="flex-1 text-left font-semibold pr-4">{children}</span>
      <ChevronDown
        className={cn(
          "accordion-icon h-4 w-4 shrink-0 transition-transform duration-300",
          isOpen && "rotate-180 transform"
        )}
      />
    </button>
  );
};

/* Content */
const AccordionContent = ({ value, className, children }) => {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        "accordion-content overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
      aria-hidden={!isOpen}
    >
      <div className={cn("pb-4 pt-0 text-sm leading-relaxed", className)}>
        {children}
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };