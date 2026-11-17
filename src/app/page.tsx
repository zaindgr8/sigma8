"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ForFounders } from "@/components/marketing/ForFounders";
import { ForInvestors } from "@/components/marketing/ForInvestors";
import { InteractiveDemo } from "@/components/marketing/InteractiveDemo";
import { Philosophy } from "@/components/marketing/Philosophy";
import { MemberPassShowcase } from "@/components/marketing/MemberPassShowcase";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";
import { ApplicationModal } from "@/components/marketing/ApplicationModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<"founder" | "investor">("founder");

  const handleOpenApply = (role: "founder" | "investor") => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col selection:bg-[#C6A15B] selection:text-[#0B0B0D]">
      {/* Top Fixed Header */}
      <Navbar onOpenApply={handleOpenApply} />

      {/* Hero Section */}
      <Hero onOpenApply={handleOpenApply} />

      {/* Trust Strip */}
      <TrustStrip />

      {/* 01 — How It Works */}
      <HowItWorks />

      {/* 02 — For Founders */}
      <ForFounders onOpenApply={() => handleOpenApply("founder")} />

      {/* 03 — For Investors */}
      <ForInvestors onOpenApply={() => handleOpenApply("investor")} />

      {/* 05 — Live Platform Architecture & Simulator */}
      <InteractiveDemo />

      {/* 04 — Philosophy / The Mark */}
      <Philosophy />

      {/* 06 — Member Pass Showcase */}
      <MemberPassShowcase />

      {/* 07 — FAQ */}
      <FAQ />

      {/* 08 — Final Call to Action */}
      <FinalCTA onOpenApply={handleOpenApply} />

      {/* Footer */}
      <Footer />

      {/* Application Admission Flow Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        initialRole={modalRole}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
