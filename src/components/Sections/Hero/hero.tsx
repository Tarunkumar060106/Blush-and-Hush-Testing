import React, { useEffect } from "react";
import "./styles.css";
import { splitTextIntoWords } from "@/lib/utils";
import gsap from "gsap";

const Hero = () => {
  useEffect(() => {
    // Correct selector - target .line inside .hero-title
    splitTextIntoWords(".hero-title .line");

    // Animate words
    const lines = document.querySelectorAll(".hero-title .line");
    const baseDelay = 1;
    // Animate each line sequentially
    lines.forEach((line, i) => {
      gsap.fromTo(
        line.querySelectorAll(".word"),
        { y: "100%", rotate: 4, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1, // words cascade within line
          delay: baseDelay + i * 0.3, // delay each line
        }
      );
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start justify-center px-4 sm:px-6 pt-24"
    >
      <div className="home-hero overflow-hidden">
        <h1 className="hero-title leading-tight">
          <div className="line">We design spaces that inspire</div>
          <div className="line">and build environments that</div>
          <div className="line">reflect your vision</div>
        </h1>
        <div className="hero-visual-container"></div>
        <div className="home-hero-scroll-container">
          <div className="home-hero-scroll-track">
            <div className="cross">✕</div>
            <div className="cross">✕</div>
            <div className="home-hero-scroll">Scroll to Explore</div>
            <div className="cross">✕</div>
            <div className="cross">✕</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
