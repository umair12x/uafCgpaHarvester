import { useEffect, useState, useRef } from "react";

export function NumberTicker({ value, decimalPlaces = 3, className = "" }) {
  const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(
    safeValue.toFixed(decimalPlaces)
  );
  const animationRef = useRef(null);

  useEffect(() => {
    // Prevent animation if value is not valid
    if (typeof value !== "number" || isNaN(value)) {
      setDisplayValue("0.000"); // Fallback display
      return;
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const startValue = parseFloat(displayValue);
    const endValue = value;
    const duration = 2500;
    const startTime = performance.now();

    function animate(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(currentValue.toFixed(decimalPlaces));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value, decimalPlaces]);

  return (
    <span className={className}>
      {isNaN(displayValue) ? "0.000" : displayValue}
    </span>
  );
}
