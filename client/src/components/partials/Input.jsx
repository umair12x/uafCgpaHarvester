import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaRegCopy, FaCheck } from "react-icons/fa6";

const Input = ({ value, setregNo, disabled, onFocus, onBlur }) => {
  const [theme, setTheme] = useState("light");
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");
    };

    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleInput = (e) => {
    const input = e.target.value;
    let raw = input.replace(/[^0-9a-z-]/gi, "");
    
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
      let numbersOnly = raw.replace(/[^0-9]/g, "");
      let year = numbersOnly.slice(0, 4);
      let rest = numbersOnly.slice(4, 10);
      
      let formatted = year;
      if (year.length === 4 && rest.length > 0) {
        formatted += "-ag-" + rest;
      } else if (year.length === 4) {
        formatted += "-ag-";
      }
      
      setregNo(formatted);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    const cursorPos = e.target.selectionStart;
    const key = e.key;
    
    if (cursorPos >= 0 && cursorPos <= 3) {
      if (!/^\d$/.test(key) && 
          !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key) &&
          !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    } else if (cursorPos >= 8 && cursorPos <= 13) {
      if (!/^\d$/.test(key) && 
          !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key) &&
          !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    } else if (cursorPos >= 4 && cursorPos <= 7) {
      if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key) &&
          !e.ctrlKey && !e.metaKey) {
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

  const isValidFormat = /^\d{4}-ag-\d{1,6}$/.test(value);
  const hasValue = !!value;

  return (
    <StyledWrapper 
      $theme={theme} 
      $isFocused={isFocused} 
      $isValid={isValidFormat} 
      $hasValue={hasValue}
    >
      <div className="input-container">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="2024-ag-000000"
            autoComplete="off"
            required
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field"
            name="registerNo"
            value={value}
            maxLength={14}
            disabled={disabled}
          />
          
          <div className="format-overlay">
            <span className={`segment year ${value.slice(0,4) ? 'filled' : ''}`}>
              {value.slice(0,4) || 'YYYY'}
            </span>
            <span className="separator">-</span>
            <span className="segment ag">ag</span>
            <span className="separator">-</span>
            <span className={`segment number ${value.slice(8) ? 'filled' : ''}`}>
              {value.slice(8) || 'NNNNNN'}
            </span>
          </div>
          
          {value && (
            <button 
              type="button" 
              className="copy-button"
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy registration number"}
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaRegCopy />}
            </button>
          )}
        </div>
        
        <div className="input-indicators">
          <div className={`status-dot ${isValidFormat ? 'valid' : value ? 'invalid' : 'empty'}`}></div>
          <span className="status-text">
            {!value ? 'Enter registration number' : 
             isValidFormat ? 'Valid format' : 
             'Invalid format - use YYYY-ag-NNNNNN'}
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    width: 100%;
  }

  .input-wrapper {
    position: relative;
    background: ${({ $theme }) => $theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    border-radius: 16px;
    padding: 4px;
    backdrop-filter: blur(10px);
    border: 1px solid ${({ $theme, $isFocused }) => 
      $isFocused 
        ? ($theme === 'dark' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.4)')
        : ($theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
    box-shadow: ${({ $theme, $isFocused }) => 
      $isFocused 
        ? ($theme === 'dark' 
            ? '0 0 0 1px rgba(16, 185, 129, 0.3), 0 8px 32px rgba(16, 185, 129, 0.1)' 
            : '0 0 0 1px rgba(16, 185, 129, 0.2), 0 8px 32px rgba(16, 185, 129, 0.08)')
        : ($theme === 'dark' 
            ? '0 4px 24px rgba(0, 0, 0, 0.2)' 
            : '0 4px 24px rgba(0, 0, 0, 0.06)')};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-field {
    width: 100%;
    padding: 22px 52px 8px 20px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 500;
    color: ${({ $theme }) => $theme === 'dark' ? '#f1f5f9' : '#1e293b'};
    font-family: 'JetBrains Mono', 'SF Mono', Monaco, Consolas, monospace;
    letter-spacing: 1px;
    caret-color: #10b981;
    
    &::placeholder {
      color: transparent;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .format-overlay {
    position: absolute;
    top: 8px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 2px;
    pointer-events: none;
    font-family: 'JetBrains Mono', 'SF Mono', Monaco, Consolas, monospace;
    font-size: 13px;
    letter-spacing: 1px;
  }

  .segment {
    padding: 2px 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &.year {
      color: ${({ $theme, $hasValue }) => 
        $hasValue 
          ? ($theme === 'dark' ? '#34d399' : '#059669') 
          : ($theme === 'dark' ? '#64748b' : '#94a3b8')};
      font-weight: ${({ $hasValue }) => $hasValue ? '600' : '400'};
      background: ${({ $theme, $hasValue }) => 
        $hasValue 
          ? ($theme === 'dark' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(5, 150, 105, 0.05)')
          : 'transparent'};
    }
    
    &.ag {
      color: ${({ $theme }) => $theme === 'dark' ? '#22d3ee' : '#0891b2'};
      font-weight: 500;
      background: ${({ $theme }) => 
        $theme === 'dark' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(8, 145, 178, 0.05)'};
    }
    
    &.number {
      color: ${({ $theme, $hasValue }) => 
        $hasValue 
          ? ($theme === 'dark' ? '#60a5fa' : '#2563eb') 
          : ($theme === 'dark' ? '#64748b' : '#94a3b8')};
      font-weight: ${({ $hasValue }) => $hasValue ? '600' : '400'};
      background: ${({ $theme, $hasValue }) => 
        $hasValue 
          ? ($theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.05)')
          : 'transparent'};
    }
    
    &.filled {
      transform: translateY(-1px);
    }
  }

  .separator {
    color: ${({ $theme }) => $theme === 'dark' ? '#94a3b8' : '#cbd5e1'};
  }

  .copy-button {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ $theme }) => $theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    border: 1px solid ${({ $theme }) => $theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 10px;
    padding: 8px;
    color: ${({ $theme }) => $theme === 'dark' ? '#94a3b8' : '#64748b'};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${({ $theme }) => $theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'};
      color: ${({ $theme }) => $theme === 'dark' ? '#34d399' : '#10b981'};
      border-color: ${({ $theme }) => $theme === 'dark' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'};
      transform: translateY(-50%) scale(1.05);
    }
    
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  }

  .input-indicators {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding: 0 4px;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &.empty {
      background: ${({ $theme }) => $theme === 'dark' ? '#64748b' : '#cbd5e1'};
    }
    
    &.valid {
      background: #10b981;
      box-shadow: 0 0 0 2px ${({ $theme }) => 
        $theme === 'dark' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'};
    }
    
    &.invalid {
      background: #ef4444;
      animation: pulse 2s ease-in-out infinite;
    }
  }

  .status-text {
    font-size: 12px;
    color: ${({ $theme }) => $theme === 'dark' ? '#94a3b8' : '#64748b'};
    font-weight: 500;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .input-field {
      padding: 20px 48px 6px 16px;
      font-size: 16px;
    }
    
    .format-overlay {
      font-size: 12px;
      left: 16px;
    }
    
    .copy-button {
      right: 12px;
      padding: 6px;
    }
  }

  @media (max-width: 480px) {
    .input-field {
      padding: 18px 44px 4px 12px;
      font-size: 15px;
    }
    
    .format-overlay {
      font-size: 11px;
      left: 12px;
    }
    
    .status-text {
      font-size: 11px;
    }
  }
`;

export default Input;