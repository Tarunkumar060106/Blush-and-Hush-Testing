"use client";

import Navbar from "@/components/Navbar/navbar";
import Preloader from "@/components/PreLoader/pre-loader";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <main className="bg-[#f0f1fa]">
            <section
              id="home"
              className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
            >
              <h1 className="text-4xl font-bold text-black font-playfair">
                Blush & Hush
              </h1>
            </section>
          </main>
        </>
      )}
    </>
  );
}
