import React, { useEffect, useState } from "react";

// Alert types configuration
const ALERT_TYPES = {
  success: {
    className: "alert alert-success",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ariaLabel: "Success message"
  },
  warning: {
    className: "alert alert-warning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    ariaLabel: "Warning message"
  },
  error: {
    className: "alert alert-error",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ariaLabel: "Error message"
  },
  info: {
    className: "alert alert-info",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    ariaLabel: "Information message"
  }
};

export const Alert = ({ 
  alertMessage, 
  autoDismiss = 5000,
  onDismiss,
  dismissible = true
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const type = alertMessage?.type || "info";
  const message = alertMessage?.message || "";
  const alertConfig = ALERT_TYPES[type] || ALERT_TYPES.info;

  // Handle auto dismiss with progress bar
  useEffect(() => {
    if (!autoDismiss || !message) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / autoDismiss) * 100);
      setProgress(remaining);
    }, 50);

    const timer = setTimeout(() => {
      handleDismiss();
    }, autoDismiss);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [autoDismiss, message]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  if (!message) return null;

  return (
    <div
      role="alert"
      className={`${alertConfig.className} w-full max-w-md mx-auto ${
        isExiting 
          ? 'animate-slideOutRight' 
          : 'animate-slideInRight'
      }`}
      aria-live="polite"
      aria-atomic="true"
      aria-label={alertConfig.ariaLabel}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0 pt-0.5">
          {alertConfig.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <span className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
            {message}
          </span>
        </div>
        
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="btn btn-ghost btn-xs sm:btn-sm btn-circle flex-shrink-0 -mt-1 -mr-2"
            aria-label="Dismiss alert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {autoDismiss > 0 && (
        <div className="mt-2 h-1 w-full bg-base-200/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-current opacity-25 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

// Enhanced Alert Container Component
export const AlertContainer = ({ alertMessage, setAlertMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide animation based on alertMessage
  useEffect(() => {
    if (alertMessage?.message) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  if (!alertMessage?.message && !isVisible) return null;

  const handleClose = () => {
    setAlertMessage({ type: "", message: "" });
  };

  return (
    <div 
      className={`
        fixed z-50
        top-4 right-4
        sm:top-6 sm:right-6
        md:top-8 md:right-8
        lg:top-10 lg:right-10
        xl:top-12 xl:right-12
        w-[calc(100vw-2rem)]
        sm:w-96
        max-w-full
        transition-all duration-300
        ${!alertMessage?.message ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
      `}
      role="region"
      aria-label="Notification area"
    >
      <div 
        className="relative group"
        onClick={handleClose}
      >
        <Alert 
          alertMessage={alertMessage}
          autoDismiss={5000}
          onDismiss={handleClose}
          dismissible={true}
        />
        
        {/* Click hint for mobile */}
        <div className="
          absolute -bottom-2 left-1/2 transform -translate-x-1/2
          text-xs text-gray-500 dark:text-gray-400
          opacity-0 group-hover:opacity-100 transition-opacity
          pointer-events-none
          sm:hidden
        ">
          Tap to dismiss
        </div>
      </div>
    </div>
  );
};

// Add these animations to your global CSS or Tailwind config:
/*
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slideInRight {
  animation: slideInRight 0.3s ease-out forwards;
}

.animate-slideOutRight {
  animation: slideOutRight 0.3s ease-in forwards;
}
*/