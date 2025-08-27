"use client";
import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollThumb, setScrollThumb] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  const thumbHeight = 40; // fixed thumb size (px)

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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateTrackHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trackHeight]);

  return (
    <div
      id="scroll-indicator"
      className="fixed right-4 top-1/2 -translate-y-1/2 w-[6px] sm:w-[8px] rounded-full"
      style={{
        height: `${trackHeight}px`,
        backgroundColor: "rgba(65, 63, 63, 0.4)", // semi-transparent track
      }}
    >
      <div
        id="scroll-indicator-bar"
        className="w-full rounded-full transition-transform duration-100"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${scrollThumb}px)`,
          backgroundColor: "rgba(0,0,0,0.8)", // black with opacity
        }}
      ></div>
    </div>
  );
};

export default ScrollIndicator;
