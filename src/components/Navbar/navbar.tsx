"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./styles.css";
import { splitTextIntoSpans } from "@/lib/utils";

export default function Navbar() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hovered, setHovered] = useState(false);

  const images = [
    "/images/logos/blush-commercial.png",
    "/images/logos/blush-hospital.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menuToggle = document.querySelector(".menu-toggle") as HTMLElement;
    const menu = document.querySelector(".menu") as HTMLElement;
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(".socials p");
    let isAnimating = false;

    // Split text function
    splitTextIntoSpans(".header h1");

    gsap.fromTo(
      [".cta-btn", ".menu-toggle"],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 1,
        delay: 1,
        stagger: 0.1,
      }
    );

    const handleToggle = () => {
      if (isAnimating) return;
      if (!menuToggle) return;

      menuToggle.classList.toggle("active");

      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("closed");
        menuToggle.classList.add("opened");
        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          onStart: () => {
            menu.style.pointerEvents = "all";
            menu.style.zIndex = "1";
          },
          onComplete: () => {
            isAnimating = false;
          },
        });

        gsap.to(links, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(socialLinks, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".video-wrapper", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          delay: 0.5,
        });

        gsap.to(".header h1 span", {
          rotateY: 0,
          stagger: 0.05,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(".header h1 span", {
          y: 0,
          scale: 1,
          stagger: 0.05,
          delay: 0.5,
          duration: 1.5,
          ease: "power4.out",
        });
      } else {
        menuToggle.classList.remove("opened");
        menuToggle.classList.add("closed");
        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "hop",
          duration: 1.5,
          onComplete: () => {
            menu.style.pointerEvents = "none";
            gsap.set(menu, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            });

            gsap.set(links, { y: 30, opacity: 0 });
            gsap.set(socialLinks, { y: 30, opacity: 0 });
            gsap.set(".video-wrapper", {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(".header h1 span", {
              y: 500,
              rotateY: 90,
              scale: 0.75,
            });

            isAnimating = false;
          },
        });
      }
    };

    menuToggle?.addEventListener("click", handleToggle);

    return () => {
      menuToggle?.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <a href="#home">
          <Image
            src={images[currentImage]}
            alt="Blush and Hush Logo"
            width={150}
            height={50}
          />
        </a>
      </div>

      {/* CTA BTN */}
      <div className="cta">
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="cta-btn"
        >
          <a href="mailto:contact@b&h.com"></a>
          {/* Arrow (hidden by default) */}
          <span className={`arrow ${hovered ? "show" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"
              ></path>
            </svg>
          </span>

          {/* Text */}
          <span className={`text ${hovered ? "shift" : ""}`}>Let's Talk</span>

          {/* Dot */}
          <span className={`dot ${hovered ? "hide" : ""}`}>
            <div className="bg-[#0cac8a] rounded-full w-2.5 h-2.5"></div>
          </span>
        </button>
      </div>

      {/* Toggle button */}
      <div className="menu-toggle closed">
        <div className="menu-copy">
          <p>Menu</p>
        </div>
        <div className="menu-toggle-icon">
          <div className="hamburger">
            <div className="menu-bar" data-position="top"></div>
            <div className="menu-bar" data-position="bottom"></div>
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      <div className="menu">
        <div className="col col-1">
          <div className="menu-logo">
            <a href="#home">
              <Image
                src={images[currentImage]}
                alt="Blush and Hush Logo"
                width={150}
                height={50}
              />
            </a>
          </div>
          <div className="links">
            <div className="link">
              <a href="#">Home</a>
            </div>
            <div className="link">
              <a href="#">Residential</a>
            </div>
            <div className="link">
              <a href="#">Healthcare</a>
            </div>
            <div className="link">
              <a href="#">Commercial Spaces</a>
            </div>
            <div className="link">
              <a href="#">About</a>
            </div>
          </div>
          <div className="video-wrapper">
            <video autoPlay muted loop>
              <source src="/video/navbar-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="col col-2">
          <div className="socials">
            <div className="sub-col">
              <p>BH Design House,</p>
              <p>7/1, Leo Muthu Street,</p>
              <p>Ekkatuthangal,</p>
              <p>Chennai 600032</p>
              <br />
              <p>contact@b&h.com</p>
              <p>contact@b&h.com</p>
            </div>
            <div className="sub-col">
              <p>Instagram</p>
              <p>Facebook</p>
              <p>Twitter</p>
              <br />
              <p>01 62 31 82 42</p>
            </div>
          </div>
          <div className="header">
            <h1>BLUSH</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
