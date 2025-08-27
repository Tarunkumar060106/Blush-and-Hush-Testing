"use client";
import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollThumb, setScrollThumb] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [isActive, setIsActive] = useState(true); // visibility state

  const thumbHeight = 40; // fixed thumb size (px)
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    // Function to recalc track height on resize
    const updateTrackHeight = () => {
      setTrackHeight(0.2 * window.innerHeight); // 20vh
    };

    updateTrackHeight(); // run once on mount
    window.addEventListener("resize", updateTrackHeight);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = scrollTop / docHeight; // 0 -> 1
      const maxMove = trackHeight - thumbHeight;

      setScrollThumb(progress * maxMove);

      // show indicator on scroll
      setIsActive(true);

      // clear old timeout & set new one
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsActive(false);
      }, 2000); // 2s delay
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateTrackHeight);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackHeight]);

  return (
    <div
      id="scroll-indicator"
      className={`fixed right-4 top-1/2 -translate-y-1/2 md:w-[4.5px] sm:w-[3px] rounded-full transition-opacity duration-500`}
      style={{
        height: `${trackHeight}px`,
        backgroundColor: "rgba(65, 63, 63, 0.4)",
        opacity: isActive ? 1 : 0, // fade in/out
      }}
    >
      <div
        id="scroll-indicator-bar"
        className="w-full rounded-full transition-transform duration-100"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${scrollThumb}px)`,
          backgroundColor: "#0CAC8A",
        }}
      ></div>
    </div>
  );
};

export default ScrollIndicator;
