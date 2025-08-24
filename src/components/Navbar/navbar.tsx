"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentImage, setCurrentImage] = useState(0);

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
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 transition-all duration-300 w-[95%] max-w-6xl">
      <a href="#home">
        <Image
          src={images[currentImage]}
          alt="Blush and Hush Logo"
          width={150}
          height={50}
        />
      </a>
    </div>
  );
};

export default Navbar;
