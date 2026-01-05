import React from "react";
import styled from "styled-components";
import {FaSpinner } from "react-icons/fa";

const Button = ({ text, disabled, isLoading, onClick }) => {
  return (
    <StyledWrapper>
      <button
        className={`button type1 ${isLoading ? "loading" : ""}`}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        <span className="button-content">
          {isLoading ? (
            <>
              <FaSpinner className="spinner" />
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>{text}</span>
            </>
          )}
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    height: 42px; /* Reduced from 50px */
    min-width: 120px; /* Reduced from 150px */
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button:hover:not(:disabled) {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .type1::after {
    content: "✓ Done!";
    height: 100%;
    width: 100%;
    background-color: #10b981;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(100%);
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s ease-in-out;
    gap: 8px;
  }

  .type1:hover::after {
    transform: translateY(0);
  }

  .button.loading {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .button {
      height: 38px;
      min-width: 110px;
      font-size: 0.85rem;
      padding: 0 14px;
    }
  }
`;

export default Button;
