"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ForFounders } from "@/components/marketing/ForFounders";
import { ForInvestors } from "@/components/marketing/ForInvestors";
import { PlatformArchitecture } from "@/components/marketing/PlatformArchitecture";
import { Philosophy } from "@/components/marketing/Philosophy";
import { MemberPassShowcase } from "@/components/marketing/MemberPassShowcase";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";
import { ApplicationModal } from "@/components/marketing/ApplicationModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<"founder" | "investor">("founder");

  const openApply = (role: "founder" | "investor") => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F4F1EA] flex flex-col">
      <Navbar onOpenApply={openApply} />
      <Hero onOpenApply={openApply} />
      <TrustStrip />
      <HowItWorks />
      <ForFounders onOpenApply={() => openApply("founder")} />
      <ForInvestors onOpenApply={() => openApply("investor")} />
      <PlatformArchitecture />
      <Philosophy />
      <MemberPassShowcase />
      <FAQ />
      <FinalCTA onOpenApply={openApply} />
      <Footer />

      {/*
        key={modalRole}: the modal's tab state initialises from initialRole
        once, on mount — without the key, opening "Apply as Investor" after
        "Apply as Founder" would reopen on the stale Founder tab. Remounting
        per requested role makes every open land on the tab that was clicked.
      */}
      <ApplicationModal key={modalRole} isOpen={modalOpen} initialRole={modalRole} onClose={() => setModalOpen(false)} />
    </main>
  );
}
