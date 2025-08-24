"use client";

import { useEffect } from "react";
import gsap from "gsap";
import "./pre-loader.css";

type PreloaderProps = {
  onComplete: () => void;
};

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const counter3 = document.querySelector(".counter-3");
    if (counter3) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement("div");
          div.className = "num";
          div.textContent = j.toString();
          counter3.appendChild(div);
        }
      }
      const finalDiv = document.createElement("div");
      finalDiv.className = "num";
      finalDiv.textContent = "0";
      counter3.appendChild(finalDiv);
    }

    const animate = (counter: Element | null, duration: number, delay = 0) => {
      if (!counter) return;
      const numHeight = (counter.querySelector(".num") as HTMLElement)
        ?.clientHeight;
      if (!numHeight) return;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    };

    animate(document.querySelector(".counter-3"), 5);
    animate(document.querySelector(".counter-2"), 5);
    animate(document.querySelector(".counter-1"), 2, 3);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete(); // call parent when done
      },
    });

    // digits
    tl.to(".digit", {
      top: "-150px",
      stagger: { amount: 0.25 },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

    // loader bars filling
    tl.from(".loader-1", { width: 0, duration: 6, ease: "power2.inOut" }, 0);
    tl.from(".loader-2", { width: 0, duration: 2, ease: "power2.inOut" }, 2);
    tl.from(".loader-3", { width: 0, duration: 2, ease: "power2.inOut" }, 2);

    // background fade
    tl.to(".loader", { background: "none", duration: 0.1 }, 6);

    // loader transforms – synced with "<"
    tl.to(".loader-1", { rotate: 90, y: -50, duration: 0.5 }, 6);
    tl.to(".loader-2", { x: -125, y: -50, duration: 0.5 }, "<");
    tl.to(".loader-3", { rotate: 90, x: -155, y: 29, duration: 0.5 }, "<");

    // scale up + move out
    tl.to(".loader", { scale: 20, duration: 1, ease: "power2.inOut" }, 7);
    tl.to(
      ".loader",
      { rotate: 45, x: 500, y: 2000, duration: 1, ease: "power2.inOut" },
      7
    );

    // fade out
    tl.to(
      ".loading-screen",
      { opacity: 0, duration: 0.5, ease: "power1.inOut" },
      7.5
    );

    // reveal header
    tl.to(".h1", { y: -80, ease: "power4.inOut", stagger: { amount: 0.1 } }, 7);
  }, []);

  return (
    <>
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
          <div className="loader-3 bar"></div>
        </div>
        <div className="counter">
          <div className="counter-1 digit">
            <div className="num">0</div>
            <div className="num num1offset1">1</div>
          </div>
          <div className="counter-2 digit">
            <div className="num">0</div>
            <div className="num num2offset2">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3 digit">
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3 digit"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
