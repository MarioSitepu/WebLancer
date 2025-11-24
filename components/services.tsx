"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  Zap,
  DollarSign,
  Cloud,
  Network,
  Headphones,
  Settings,
  Heart,
} from "lucide-react";

function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Joki Website",
      description:
        "Layanan joki pembuatan website mulai dari landing page, company profile, hingga website custom dengan harga terjangkau.",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Joki Aplikasi",
      description:
        "Joki pembuatan aplikasi web dan mobile dengan teknologi terbaru. Fast delivery, hasil berkualitas.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Harga Terjangkau",
      description:
        "Harga joki web murah mulai dari 100rb. Cocok untuk tugas kuliah, proyek UMKM, hingga website profesional.",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "Garansi Revisi",
      description: "Garansi revisi gratis hingga sesuai dengan kebutuhanmu. Kami pastikan hasil memuaskan.",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      title: "Joki Tugas Kuliah",
      description: "Khusus untuk tugas kuliah, tubes, dan skripsi. Kami bantu selesaikan dengan cepat dan tepat waktu.",
      icon: <Network className="w-6 h-6" />,
    },
    {
      title: "Support 24/7",
      description:
        "Tim support siap membantu kapan saja. Konsultasi gratis sebelum order, diskusi selama pengerjaan.",
      icon: <Headphones className="w-6 h-6" />,
    },
    {
      title: "Pengerjaan Cepat",
      description:
        "Deadline ketat? Kami bisa selesaikan dengan cepat tanpa mengorbankan kualitas hasil.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Berbagai Teknologi",
      description: "Mendukung berbagai teknologi: React, Next.js, Laravel, Flutter, dan masih banyak lagi.",
      icon: <Heart className="w-6 h-6" />,
    },
  ];
  return (
    <section id="services" className="w-full py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Layanan Kami</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Joki Web Murah & Berkualitas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Solusi joki website dan aplikasi dengan harga terjangkau untuk berbagai kebutuhan proyekmu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default function Services() {
  return <FeaturesSectionWithHoverEffects />;
}
