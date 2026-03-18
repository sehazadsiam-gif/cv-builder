"use client";

import { useState, RefObject } from "react";
import { Download, FileImage, Loader2 } from "lucide-react";
import { downloadPDF, downloadJPG } from "@/lib/exportUtils";

interface ExportButtonsProps {
  targetRef: RefObject<HTMLDivElement | null>;
  filename: string;
  compact?: boolean;
}

export default function ExportButtons({
  targetRef,
  filename,
  compact = false,
}: ExportButtonsProps) {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingJPG, setLoadingJPG] = useState(false);

  const handlePDF = async () => {
    if (!targetRef.current) { alert("Preview not ready yet. Please fill in your name first."); return; }
    if (loadingPDF) return;
    setLoadingPDF(true);
    try {
      await downloadPDF(targetRef.current, filename);
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleJPG = async () => {
    if (!targetRef.current) { alert("Preview not ready yet. Please fill in your name first."); return; }
    if (loadingJPG) return;
    setLoadingJPG(true);
    try {
      await downloadJPG(targetRef.current, filename);
    } catch (e) {
      console.error("JPG export failed:", e);
    } finally {
      setLoadingJPG(false);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handlePDF}
          disabled={loadingPDF}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 disabled:opacity-60"
          style={{
            background: "#0f0f0f",
            color: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {loadingPDF ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <Download size={11} />
          )}
          PDF
        </button>
        <button
          onClick={handleJPG}
          disabled={loadingJPG}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border border-gray-200 duration-200 disabled:opacity-60 bg-white text-gray-700 hover:bg-gray-50"
        >
          {loadingJPG ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <FileImage size={11} />
          )}
          JPG
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePDF}
        disabled={loadingPDF}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #0f0f0f, #2d2d2d)",
          color: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {loadingPDF ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Download size={14} />
        )}
        {loadingPDF ? "Generating..." : "Download PDF"}
      </button>

      <button
        onClick={handleJPG}
        disabled={loadingJPG}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-60"
      >
        {loadingJPG ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <FileImage size={14} />
        )}
        {loadingJPG ? "Generating..." : "Save as JPG"}
      </button>
    </div>
  );
}
