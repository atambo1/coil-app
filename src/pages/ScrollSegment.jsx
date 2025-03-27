import React, { useRef, useState, useEffect } from "react";

export default function ScrollSegment({ children }) {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.6 }
      );
  
      const el = ref.current;
      if (el) observer.observe(el);
      return () => el && observer.unobserve(el);
    }, []);
  
    return (
      <div
        ref={ref}
        style={{
          height: "100vh",
          scrollSnapAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          padding: "2rem",
          fontSize: "2rem",
          lineHeight: "1.6",
          textAlign: "center",
          color: "white",
        }}
      >
        {children}
      </div>
    );
  }
  