"use client";

import Preloader from "@/components/pre-loader";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <main className="h-screen w-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center">
            Welcome to Our Space
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 text-center max-w-2xl">
            Designing experiences that blend architecture, creativity, and
            technology.
          </p>
          <button className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
            Explore More
          </button>
        </main>
      )}
    </>
  );
}
