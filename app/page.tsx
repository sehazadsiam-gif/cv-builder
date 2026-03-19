"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Zap, Globe, ChevronRight, Lock, CheckCircle } from "lucide-react";
import { CV_TYPES, CV_CATEGORIES, CVType } from "@/lib/cvTypes";

const ATS_BADGE: Record<"High" | "Medium" | "Low", { label: string; color: string; bg: string }> = {
  High: { label: "ATS: High", color: "#166534", bg: "#dcfce7" },
  Medium: { label: "ATS: Medium", color: "#92400e", bg: "#fef3c7" },
  Low: { label: "ATS: Low", color: "#991b1b", bg: "#fee2e2" },
};

export default function HomePage() {
  const [selected, setSelected] = useState<CVType | null>(null);
  const router = useRouter();

  const handleStart = () => {
    if (selected) router.push(`/builder?type=${selected}`);
  };

  const categoryKeys = Object.keys(CV_CATEGORIES) as (keyof typeof CV_CATEGORIES)[];

  return (
    <main className="min-h-screen bg-[#faf9f6] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #c9a84c, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #1a3a5c, transparent)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f0f0f" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-12">

        {/* ── HEADER ── */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-500 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Free · No account · No data stored · 22 CV types
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
            Build Your CV,
            <br />
            <span className="italic" style={{
              background: "linear-gradient(135deg, #c9a84c, #a06828)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              The Right Way.
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            22 international CV types. ATS-optimised.
            Live preview. Download as PDF or JPG — instantly, free.
          </p>
        </div>

        {/* ── PRIVACY NOTICE ── */}
        <div className="animate-fade-up stagger-1 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-10 max-w-2xl mx-auto">
          <Lock size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-800">Your data never leaves your browser</p>
            <p className="text-xs text-emerald-600 mt-0.5">
              We store absolutely nothing. No account. No database. No cookies.
              Your CV data lives only in your browser while you build — gone when you close the tab.
            </p>
          </div>
        </div>

        {/* ── STEP LABEL ── */}
        <p className="animate-fade-up stagger-2 text-center text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium">
          Step 1 — Choose your CV type ({selected ? <span className="text-gray-700">{CV_TYPES[selected].label} selected ✓</span> : "select one below"})
        </p>

        {/* ── CV TYPE GROUPS ── */}
        <div className="space-y-8 mb-10">
          {categoryKeys.map((catKey) => {
            const cat = CV_CATEGORIES[catKey];
            return (
              <div key={catKey} className="animate-fade-up stagger-2">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                  <h2 className="text-sm font-bold text-gray-700"
                    style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
                    {cat.label}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <p className="text-xs text-gray-400 hidden sm:block">{cat.description}</p>
                </div>

                {/* CV type cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {cat.types.map((key) => {
                    const type = CV_TYPES[key];
                    const isSelected = selected === key;
                    const badge = ATS_BADGE[type.atsScore];

                    return (
                      <button
                        key={key}
                        onClick={() => setSelected(key)}
                        className="relative text-left rounded-xl border-2 transition-all duration-200 p-3 group"
                        style={{
                          borderColor: isSelected ? type.accent : "#e5e7eb",
                          background: isSelected ? `${type.color}08` : "white",
                          boxShadow: isSelected
                            ? `0 0 0 1px ${type.accent}30, 0 4px 16px ${type.color}10`
                            : "0 1px 3px rgba(0,0,0,0.04)",
                          transform: isSelected ? "translateY(-1px)" : "none",
                        }}
                      >
                        {/* Selected tick */}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle size={14} style={{ color: type.accent }} />
                          </div>
                        )}

                        <div className="text-xl mb-1.5">{type.icon}</div>
                        <p className="text-xs font-bold text-gray-800 leading-tight mb-1"
                          style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
                          {type.label}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-tight mb-2 line-clamp-2">
                          {type.subtitle}
                        </p>

                        {/* ATS badge */}
                        <span className="inline-flex text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ color: badge.color, background: badge.bg }}>
                          {badge.label}
                        </span>

                        {/* Page limit */}
                        <p className="text-[9px] text-gray-400 mt-1">{type.pageLimit}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SELECTED DETAIL ── */}
        {selected && (
          <div className="animate-fade-up mb-8 bg-white border border-gray-200 rounded-2xl p-5 max-w-2xl mx-auto shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{CV_TYPES[selected].icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900"
                  style={{ fontFamily: "'Hammersmith One', sans-serif" }}>
                  {CV_TYPES[selected].label} CV
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-3">{CV_TYPES[selected].description}</p>
                <div className="grid grid-cols-2 gap-1">
                  {CV_TYPES[selected].tips.map((tip, i) => (
                    <p key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span style={{ color: CV_TYPES[selected].accent }} className="font-bold mt-0.5">·</span>
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="animate-fade-up stagger-3 text-center mb-14">
          <button
            onClick={handleStart}
            disabled={!selected}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-semibold text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: selected ? "linear-gradient(135deg, #0f0f0f, #2d2d2d)" : "#e5e7eb",
              color: selected ? "white" : "#9ca3af",
              boxShadow: selected ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
            }}
            onMouseEnter={(e) => { if (selected) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            {selected ? (
              <>Build my {CV_TYPES[selected].label} <ChevronRight size={18} /></>
            ) : (
              "Select a CV type to continue"
            )}
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Font: Times New Roman 12pt · Format: A4 · Export: PDF & JPG
          </p>
        </div>

        {/* ── FEATURES ROW ── */}
        <div className="animate-fade-up stagger-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
          {[
            { icon: <Shield size={15} />, title: "ATS Optimised", desc: "Passes Applicant Tracking Systems used by 99% of MNCs and global employers" },
            { icon: <Zap size={15} />, title: "Live Preview", desc: "See your CV update in real-time" },
            { icon: <Globe size={15} />, title: "22 International Types", desc: "From Chronological to Europass to Federal — every format you'll ever need" },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">{f.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-300 mt-10">
          CVCraft — Free forever · No tracking · No database · Open source
        </p>
      </div>
    </main>
  );
}
