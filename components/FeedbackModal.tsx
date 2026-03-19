"use client";

import { useState } from "react";
import { X, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;
    const nameEntry = process.env.NEXT_PUBLIC_GOOGLE_ENTRY_NAME;
    const feedbackEntry = process.env.NEXT_PUBLIC_GOOGLE_ENTRY_FEEDBACK;

    if (!formUrl || !nameEntry || !feedbackEntry) {
      console.error("Missing Google Form environment variables");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append(nameEntry, name);
    formData.append(feedbackEntry, feedback);

    try {
      // Google Forms don't return CORS headers, so we use no-cors.
      // We won't be able to read the response, but the data will be sent.
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setFeedback("");
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold" style={{ backgroundColor: "#c9a84c20", color: "#c9a84c" }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Hammersmith One', sans-serif" }}>Give Feedback</h2>
              <p className="text-xs text-gray-500">Help us make CVCraft better</p>
            </div>
          </div>

          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Thank You!</h3>
              <p className="text-sm text-gray-500 mt-1">Your feedback has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                  style={{ borderColor: "#e5e7eb" }}
                />
              </div>

              <div>
                <label htmlFor="feedback" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                  Feedback Details
                </label>
                <textarea
                  id="feedback"
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What's on your mind? Suggestions, bugs, or things you love..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm resize-none"
                  style={{ borderColor: "#e5e7eb" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Feedback
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-gray-400 mt-4">
                Powered by Google Forms · Anonymous unless you provide your name
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
