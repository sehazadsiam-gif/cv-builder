"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CVType, defaultCVData, CVData, CV_TYPES } from "@/lib/cvTypes";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import ExportButtons from "@/components/ExportButtons";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = (searchParams.get("type") || "mnc") as CVType;
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [showPreview, setShowPreview] = useState(false); // mobile toggle
  const previewRef = useRef<HTMLDivElement | null>(null);

  const typeConfig = CV_TYPES[type] || CV_TYPES.mnc;

  const handleDataChange = useCallback((data: CVData) => {
    setCvData(data);
  }, []);

  const filename = cvData.personal.fullName
    ? `${cvData.personal.fullName.replace(/\s+/g, "_")}_CV`
    : "My_CV";

  return (
    <div className="h-screen flex flex-col bg-[#faf9f6] overflow-hidden">
      {/* Top bar */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-lg">{typeConfig.icon}</span>
            <div>
              <span
                className="text-sm font-semibold text-gray-800"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {typeConfig.label} CV
              </span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">
                — Live Preview
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600"
          >
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? "Edit" : "Preview"}
          </button>

          <ExportButtons targetRef={previewRef} filename={filename} compact />
        </div>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form panel */}
        <div
          className={`${
            showPreview ? "hidden" : "flex"
          } lg:flex flex-col w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 border-r border-gray-200 overflow-y-auto bg-[#faf9f6]`}
        >
          <CVForm
            type={type}
            data={cvData}
            onChange={handleDataChange}
            accentColor={typeConfig.accent}
          />
        </div>

        {/* Preview panel */}
        <div
          className={`${
            showPreview ? "flex" : "hidden"
          } lg:flex flex-1 overflow-y-auto bg-gray-100 flex-col items-center py-6 px-4`}
        >
          <div className="w-full max-w-[680px]">
            {/* Preview label */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Live Preview — A4
              </p>
              <ExportButtons
                targetRef={previewRef}
                filename={filename}
                compact={false}
              />
            </div>

            {/* CV preview shadow card */}
            <div
              className="bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(0,0,0,0.15)",
              }}
            >
              <CVPreview ref={previewRef} type={type} data={cvData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-400">Loading builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
