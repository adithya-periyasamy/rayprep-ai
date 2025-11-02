"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RayLanding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/check");
      const json = await res.json();

      if (json?.authenticated) {
        // user has an active session -> go to protected home
        await router.push("/home");
      } else {
        // no active session -> go to sign-in
        await router.push("/sign-in");
      }
    } catch (err) {
      // On error, fallback to sign-in
      await router.push("/sign-in");
    } finally {
    }
  }

  return (
    <div className="root-layout">
      <nav>
        <div className="flex items-center gap-2">
          <Image
            src="/favicon-dark.png"
            alt="MockMate Logo"
            width={38}
            height={32}
          />
          <h2 className="text-primary-200">Ray</h2>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 pt-30">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="text-white">
              An AI powered SAAS platform for Placement Training
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get real-time AI-powered feedback on your interview performance.
            Practice with realistic voice interviews and receive detailed
            analysis to land your dream job.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleStart}
            disabled={loading}
            className="px-8 py-4 bg-primary-200 text-dark-100 rounded-full hover:bg-primary-200/90 transition-all font-bold text-lg hover:shadow-2xl hover:shadow-primary-200/30 hover:scale-105 transform cursor-pointer disabled:opacity-60"
          >
            {loading ? "Checking..." : "Start Practicing Now"}
          </button>
        </div>
      </main>
    </div>
  );
}
