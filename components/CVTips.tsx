"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const TIPS = [
  {
    number: 1,
    title: "Tailored to the role",
    subtitle: "Recruiters want a clear match",
    points: [
      "Align your skills and experience with the job description",
      "Use relevant keywords to pass initial screening",
    ],
  },
  {
    number: 2,
    title: "Clear and professional format",
    subtitle: "First impressions matter",
    points: [
      "Keep contact details easy to find",
      "Use clean formatting and simple language",
      "Avoid clutter and unnecessary design",
    ],
  },
  {
    number: 3,
    title: "Focus on impact",
    subtitle: "It's not just what you did, it's what you achieved",
    points: [
      "Use numbers to show results (e.g., increased sales by 20%)",
      "Keep statements concise and outcome-driven",
    ],
  },
  {
    number: 4,
    title: "Show your career journey",
    subtitle: "Clarity builds credibility",
    points: [
      "Mention duration of each role",
      "Highlight promotions, growth, or key milestones",
    ],
  },
  {
    number: 5,
    title: "Showcase your skills",
    subtitle: "Make your strengths visible",
    points: [
      "List tools, software, and languages (e.g., Excel, Python)",
      "Focus on skills relevant to the job",
    ],
  },
];

export default function CVTips() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="p-4 border-t border-gray-200">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
        💡 CV Writing Tips
      </p>
      <div className="space-y-2">
        {TIPS.map((tip, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#c9a84c20", color: "#c9a84c" }}
                >
                  {tip.number}
                </span>
                <span className="text-xs font-semibold text-gray-700">
                  {tip.title}
                </span>
              </div>
              {openIndex === i ? (
                <ChevronUp size={13} className="text-gray-400" />
              ) : (
                <ChevronDown size={13} className="text-gray-400" />
              )}
            </button>

            {openIndex === i && (
              <div className="px-4 pb-3">
                <p className="text-xs text-gray-500 italic mb-2">
                  {tip.subtitle}
                </p>
                <ul className="space-y-1">
                  {tip.points.map((point, j) => (
                    <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-[#c9a84c] font-bold mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
