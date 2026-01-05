import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = ({ value, setregNo , disable }) => {
  const [theme, setTheme] = useState("light");

  // Detect theme from parent
  useEffect(() => {
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      if (htmlElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    detectTheme();
    
    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleInput = (e) => {
    const input = e.target.value;
    let raw = input.replace(/[^0-9a-z-]/gi, ""); // Allow numbers, letters, and hyphens
    
    // If user is typing after the format, preserve the format
    if (raw.includes("-ag-")) {
      const parts = raw.split("-ag-");
      if (parts.length === 2) {
        let yearPart = parts[0].replace(/[^0-9]/g, "").slice(0, 4);
        let numberPart = parts[1].replace(/[^0-9]/g, "").slice(0, 6);
        
        if (yearPart.length === 4) {
          setregNo(`${yearPart}-ag-${numberPart}`);
        } else {
          setregNo(yearPart);
        }
      }
    } else {
      // User is typing at the beginning
      let numbersOnly = raw.replace(/[^0-9]/g, "");
      let year = numbersOnly.slice(0, 4);
      let rest = numbersOnly.slice(4, 10); // Max 6 digits after year
      
      let formatted = year;
      if (year.length === 4 && rest.length > 0) {
        formatted += "-ag-" + rest;
      } else if (year.length === 4) {
        formatted += "-ag-";
      }
      
      setregNo(formatted);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent typing letters in the number parts
    const cursorPos = e.target.selectionStart;
    const value = e.target.value;
    
    // If cursor is in year part (positions 0-3) or number part (positions 8-13)
    if (cursorPos >= 0 && cursorPos <= 3) {
      // In year part, only allow numbers
      if (!/^\d$/.test(e.key) && 
          e.key !== 'Backspace' && 
          e.key !== 'Delete' && 
          e.key !== 'Tab' && 
          e.key !== 'ArrowLeft' && 
          e.key !== 'ArrowRight' &&
          !e.ctrlKey && 
          !e.metaKey) {
        e.preventDefault();
      }
    } else if (cursorPos >= 8 && cursorPos <= 13) {
      // In number part, only allow numbers
      if (!/^\d$/.test(e.key) && 
          e.key !== 'Backspace' && 
          e.key !== 'Delete' && 
          e.key !== 'Tab' && 
          e.key !== 'ArrowLeft' && 
          e.key !== 'ArrowRight' &&
          !e.ctrlKey && 
          !e.metaKey) {
        e.preventDefault();
      }
    } else if (cursorPos >= 4 && cursorPos <= 7) {
      // In "-ag-" part, prevent any typing
      if (e.key !== 'Backspace' && 
          e.key !== 'Delete' && 
          e.key !== 'Tab' && 
          e.key !== 'ArrowLeft' && 
          e.key !== 'ArrowRight' &&
          !e.ctrlKey && 
          !e.metaKey) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    const cleaned = pastedText.replace(/[^0-9]/g, "");
    
    if (cleaned.length >= 4) {
      const year = cleaned.slice(0, 4);
      const number = cleaned.slice(4, 10);
      setregNo(`${year}-ag-${number}`);
    } else if (cleaned.length > 0) {
      setregNo(cleaned);
    }
  };

  return (
    <StyledWrapper theme={theme}>
      <div className="input-container">
        <input
          type="password"
          placeholder="2022-ag-00000"
          autoComplete="off"
          required
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="input-field"
          name="registerNo"
          value={value}
          maxLength={14}
          disabled={disable}
        />
        <div className="input-format">
          <span className="format-year">{value.slice(0, 4) || 'YYYY'}</span>
          <span className="format-dash">-</span>
          <span className="format-ag">ag</span>
          <span className="format-dash">-</span>
          <span className="format-number">{value.slice(8) || 'NNNNNN'}</span>
        </div>
     
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    width: 100%;
    max-width: 280px;
  }

  .input-field {
    width: 100%;
    padding: 10px 15px 5px 15px;
    padding-top: 15px; /* Make room for the format overlay */
    border-radius: 8px;
    outline: none;
    font-size: 15px;
    letter-spacing: 0.5px;
    background-color: ${({ theme }) =>
      theme === "dark" ? "#1e293b" : "#ffffff"};
    color: ${({ theme }) =>
      theme === "dark" ? "#ffffff" : "#000000"};
    border: 1px solid
      ${({ theme }) =>
        theme === "dark" ? "#3b82f6" : "#d1b54a"};
    transition: all 0.3s ease;
    font-family: monospace;
    caret-color: ${({ theme }) =>
      theme === "dark" ? "#60a5fa" : "#c9a227"};
  }

  .input-field::placeholder {
    color: transparent;
  }

  .input-field:focus {
    border-color: ${({ theme }) =>
      theme === "dark" ? "#60a5fa" : "#c9a227"};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme === "dark"
          ? "rgba(59, 130, 246, 0.25)"
          : "rgba(201, 162, 39, 0.25)"};
    background-color: ${({ theme }) =>
      theme === "dark" ? "#0f172a" : "#fefce8"};
  }

  .input-field:invalid {
    animation: shake 0.3s forwards;
    border-color: ${({ theme }) =>
      theme === "dark" ? "#ef4444" : "#dc2626"};
  }

  .input-format {
    position: absolute;
    top: 5px;
    left: 16px;
    font-size: 12px;
    pointer-events: none;
    font-family: monospace;
    letter-spacing: 0.5px;
  }

  .format-year {
    color: ${({ theme }) =>
      theme === "dark" ? "#60a5fa" : "#2563eb"};
    font-weight: 600;
  }

  .format-ag {
    color: ${({ theme }) =>
      theme === "dark" ? "#34d399" : "#059669"};
    font-weight: 500;
  }

  .format-number {
    color: ${({ theme }) =>
      theme === "dark" ? "#fbbf24" : "#d97706"};
    font-weight: 600;
  }

  .format-dash {
    color: ${({ theme }) =>
      theme === "dark" ? "#94a3b8" : "#6b7280"};
  }

 

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(4px);
    }
    50% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .input-container {
      max-width: 100%;
    }
    
    .input-field {
      padding: 10px 14px;
      padding-top: 26px;
      font-size: 15px;
    }
    
    .input-format {
      font-size: 10px;
      top: 6px;
      left: 14px;
    }
  }

  /* Focus state improvements */
  .input-field:focus + .input-format .format-year {
    color: ${({ theme }) =>
      theme === "dark" ? "#93c5fd" : "#1d4ed8"};
  }
  
  .input-field:focus + .input-format .format-ag {
    color: ${({ theme }) =>
      theme === "dark" ? "#6ee7b7" : "#047857"};
  }
  
  .input-field:focus + .input-format .format-number {
    color: ${({ theme }) =>
      theme === "dark" ? "#fcd34d" : "#b45309"};
  }
`;

export default Input;