export type CVType =
  | "chronological"
  | "functional"
  | "combination"
  | "targeted"
  | "academic"
  | "digital"
  | "infographic"
  | "portfolio"
  | "creative"
  | "entry_level"
  | "graduate"
  | "internship"
  | "professional"
  | "executive"
  | "career_change"
  | "europass"
  | "federal"
  | "international"
  | "mini"
  | "technical"
  | "non_traditional"
  | "video";

// ─── FONT CONSTANTS ─────────────────────────────────────────────────────────
export const CV_FONT = "'Times New Roman', Times, serif";
export const CV_FONT_SIZE = "12pt";
export const CV_HEADING_SIZE = "14pt";
export const CV_SMALL_SIZE = "11pt";

// ─── DATA INTERFACES ─────────────────────────────────────────────────────────
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  nationality: string;
  salary: string;
  hoursPerWeek: string;
  videoLink: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
  achievements: string;
  thesis: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string;
  salary: string;
  hoursPerWeek: string;
}

export interface PublicationEntry {
  id: string;
  title: string;
  journal: string;
  year: string;
  coAuthors: string;
  doi: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  tech: string;
  link: string;
  year: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
}

export interface ConferenceEntry {
  id: string;
  title: string;
  event: string;
  year: string;
  location: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  level: string;
}

export interface CVData {
  personal: PersonalInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  publications: PublicationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  awards: AwardEntry[];
  certifications: CertificationEntry[];
  conferences: ConferenceEntry[];
  languages: LanguageEntry[];
  languagesText: string;
  references: string;
  github: string;
  portfolio: string;
  researchInterests: string;
  teachingExperience: string;
  grants: string;
  transferableSkills: string;
  personalBrand: string;
}

export const defaultCVData: CVData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
    nationality: "",
    salary: "",
    hoursPerWeek: "",
    videoLink: "",
  },
  education: [
    {
      id: "edu1",
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      gpa: "",
      achievements: "",
      thesis: "",
    },
  ],
  experience: [
    {
      id: "exp1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: "",
      salary: "",
      hoursPerWeek: "",
    },
  ],
  publications: [],
  projects: [],
  skills: [{ id: "sk1", category: "", skills: "" }],
  awards: [],
  certifications: [],
  conferences: [],
  languages: [{ id: "lang1", language: "", level: "" }],
  languagesText: "",
  references: "",
  github: "",
  portfolio: "",
  researchInterests: "",
  teachingExperience: "",
  grants: "",
  transferableSkills: "",
  personalBrand: "",
};

// ─── CV TYPE DEFINITIONS ─────────────────────────────────────────────────────
export const CV_TYPES: Record<
  CVType,
  {
    label: string;
    subtitle: string;
    icon: string;
    color: string;
    accent: string;
    description: string;
    sections: string[];
    tips: string[];
    atsScore: "High" | "Medium" | "Low";
    pageLimit: string;
    category: "standard" | "specialised" | "creative" | "regional";
  }
> = {
  chronological: {
    label: "Chronological",
    subtitle: "Most common · ATS-friendly · Career progression",
    icon: "📅",
    color: "#1a2e44",
    accent: "#2563eb",
    description:
      "Presents work history in reverse chronological order (latest first). The most universally accepted format, preferred by ATS systems and hiring managers worldwide.",
    sections: ["personal", "summary", "experience", "education", "skills", "certifications"],
    tips: ["Latest job always first", "Action Verb + Task + Result formula", "3–5 bullet points per role", "Dates: Month + Year format"],
    atsScore: "High",
    pageLimit: "1–2 pages",
    category: "standard",
  },
  functional: {
    label: "Functional (Skills-Based)",
    subtitle: "Freshers · Career changers · Employment gaps",
    icon: "🧩",
    color: "#064e3b",
    accent: "#10b981",
    description:
      "Focuses on what you can do rather than where you worked. Groups skills by category. Ideal for freshers, career changers, or those with employment gaps.",
    sections: ["personal", "summary", "skills", "projects", "experience", "education"],
    tips: ["Group skills: Technical, Leadership, Communication", "Lead with strongest skill category", "Keep work history brief", "Add projects to show real application"],
    atsScore: "Medium",
    pageLimit: "1–2 pages",
    category: "standard",
  },
  combination: {
    label: "Combination (Hybrid)",
    subtitle: "Skills + Experience · Best of both · Tech roles",
    icon: "🔀",
    color: "#3b0764",
    accent: "#a855f7",
    description:
      "Combines a detailed skills section with a chronological work history. Best for people who have both strong skills and relevant experience to show.",
    sections: ["personal", "summary", "skills", "experience", "projects", "education", "certifications"],
    tips: ["Skills section comes before experience", "Avoid repeating same info in both sections", "Keep to 2 pages maximum", "Ideal for CSE / tech graduates"],
    atsScore: "High",
    pageLimit: "2 pages",
    category: "standard",
  },
  targeted: {
    label: "Targeted",
    subtitle: "One job · Keyword-matched · Competitive roles",
    icon: "🎯",
    color: "#7c2d12",
    accent: "#f97316",
    description:
      "Fully customised for one specific job. Every section, keyword and bullet point is tailored to match the job description for maximum ATS scoring.",
    sections: ["personal", "summary", "skills", "experience", "education", "certifications", "awards"],
    tips: ["Copy keywords directly from the job post", "Rewrite summary for every application", "Remove any irrelevant experience", "Mirror the employer's exact language"],
    atsScore: "High",
    pageLimit: "1–2 pages",
    category: "standard",
  },
  academic: {
    label: "Academic",
    subtitle: "Masters · PhD · Research · Scholarships · Fellowships",
    icon: "🎓",
    color: "#1e3a5f",
    accent: "#c9a84c",
    description:
      "Detailed record of academic career. No strict page limit — can be 5–10+ pages. Prioritises research, publications, and intellectual contributions.",
    sections: ["personal", "researchInterests", "education", "publications", "conferences", "teaching", "awards", "grants", "skills", "languages", "references"],
    tips: ["No page limit — include everything relevant", "List thesis/dissertation title prominently", "Publications in APA or MLA format", "Include all conferences attended"],
    atsScore: "Medium",
    pageLimit: "5–10+ pages",
    category: "specialised",
  },
  digital: {
    label: "Digital / Online CV",
    subtitle: "LinkedIn · Personal website · Portfolio site · SEO",
    icon: "🌐",
    color: "#0c4a6e",
    accent: "#0ea5e9",
    description:
      "A CV hosted online with clickable links, GitHub, portfolio and multimedia. Optimised for SEO visibility and sharing via URL.",
    sections: ["personal", "summary", "skills", "experience", "projects", "education"],
    tips: ["Portfolio & GitHub links are essential", "Custom LinkedIn URL is important", "Keep language SEO-friendly", "Add all relevant links in header"],
    atsScore: "Medium",
    pageLimit: "1–2 pages",
    category: "creative",
  },
  infographic: {
    label: "Infographic CV",
    subtitle: "Visual · Charts · Icons · Not ATS-safe",
    icon: "📊",
    color: "#4a044e",
    accent: "#d946ef",
    description:
      "Visual representation using charts, icons, graphs and colour-coded sections. Eye-catching but NOT ATS-friendly — only use when submitting directly to a human recruiter.",
    sections: ["personal", "summary", "skills", "experience", "education", "awards"],
    tips: ["⚠️ Not ATS-friendly — human submission only", "Keep text minimal, visuals do the talking", "Use consistent colour coding", "Always have a plain text backup"],
    atsScore: "Low",
    pageLimit: "1 page",
    category: "creative",
  },
  portfolio: {
    label: "Portfolio CV",
    subtitle: "Developers · Designers · Real work samples",
    icon: "🗂️",
    color: "#1c1917",
    accent: "#f59e0b",
    description:
      "Showcases real work samples, projects, case studies and GitHub/Behance links. The CV itself acts as proof of skill.",
    sections: ["personal", "summary", "projects", "skills", "experience", "education"],
    tips: ["Every project needs a live link", "Include brief case study for best work", "GitHub profile is mandatory", "Show process, not just the final output"],
    atsScore: "Medium",
    pageLimit: "1–2 pages",
    category: "creative",
  },
  creative: {
    label: "Creative",
    subtitle: "Design · Media · Marketing · Advertising",
    icon: "🎨",
    color: "#2d1b4e",
    accent: "#e91e8c",
    description:
      "Unique design-based CV with custom layout and non-traditional format. Balances visual appeal with ATS compatibility for creative industry roles.",
    sections: ["personal", "summary", "experience", "skills", "projects", "education", "awards"],
    tips: ["Portfolio link is the most important element", "Name every design tool explicitly", "Describe campaign reach and impact", "No tables or text boxes — ATS safety"],
    atsScore: "Low",
    pageLimit: "1–2 pages",
    category: "creative",
  },
  entry_level: {
    label: "Entry-Level",
    subtitle: "No experience · Fresh graduate · First job",
    icon: "🌱",
    color: "#14532d",
    accent: "#22c55e",
    description:
      "For candidates with no or little work experience. Focuses on education, academic projects, skills and extracurricular achievements.",
    sections: ["personal", "summary", "education", "skills", "projects", "awards", "certifications"],
    tips: ["Education goes before experience", "Include coursework projects as experience", "Volunteering and clubs count", "GPA is important — include if above 3.0"],
    atsScore: "High",
    pageLimit: "1 page",
    category: "standard",
  },
  graduate: {
    label: "Graduate CV",
    subtitle: "Recent grad · Internships · Academic achievements",
    icon: "🏫",
    color: "#1e3a5f",
    accent: "#3b82f6",
    description:
      "For recent university graduates. Bridges the gap between student and professional. Includes degree, internships, dissertations and academic achievements.",
    sections: ["personal", "summary", "education", "experience", "skills", "projects", "awards", "certifications"],
    tips: ["Lead with your degree and university", "Internships count as real experience", "Include dissertation topic if relevant", "Graduation year prominently displayed"],
    atsScore: "High",
    pageLimit: "1–2 pages",
    category: "standard",
  },
  internship: {
    label: "Internship CV",
    subtitle: "Students · Learning focus · Mini projects · Coursework",
    icon: "📋",
    color: "#0f4c75",
    accent: "#1b9aaa",
    description:
      "For students seeking internships. Focused on demonstrating learning ability and potential. Includes coursework, mini projects and academic background.",
    sections: ["personal", "summary", "education", "skills", "projects", "awards"],
    tips: ["Emphasise willingness to learn", "Coursework projects are very relevant", "Mention relevant modules/subjects", "Keep to 1 page strictly"],
    atsScore: "High",
    pageLimit: "1 page",
    category: "standard",
  },
  professional: {
    label: "Professional",
    subtitle: "Mid-career · Achievement-focused · Formal tone",
    icon: "💼",
    color: "#1c2b3a",
    accent: "#64748b",
    description:
      "For experienced professionals with a strong work history. Achievement-focused bullet points, formal tone, and clear career progression narrative.",
    sections: ["personal", "summary", "experience", "skills", "education", "certifications", "awards"],
    tips: ["Every bullet: Action Verb + Task + Result", "Quantify everything: %, $, team size, time", "Formal tone — no slang or casual language", "2 pages max for under 10 years exp"],
    atsScore: "High",
    pageLimit: "2 pages",
    category: "standard",
  },
  executive: {
    label: "Executive CV",
    subtitle: "C-Suite · Director · VP · Senior Leadership",
    icon: "👔",
    color: "#0f172a",
    accent: "#c9a84c",
    description:
      "For senior executives and C-suite roles. Focuses on leadership, strategy and business impact. Includes revenue growth, team size and P&L responsibility.",
    sections: ["personal", "summary", "experience", "skills", "education", "awards", "certifications"],
    tips: ["Lead with revenue / business impact numbers", "Show P&L and budget responsibility", "Board positions and committees matter", "2–3 pages acceptable at this level"],
    atsScore: "High",
    pageLimit: "2–3 pages",
    category: "standard",
  },
  career_change: {
    label: "Career Change CV",
    subtitle: "Industry pivot · Transferable skills · New direction",
    icon: "🔄",
    color: "#422006",
    accent: "#d97706",
    description:
      "For professionals switching industries or roles. Reframes past experience using transferable skills and bridges the gap between old and new career paths.",
    sections: ["personal", "summary", "skills", "transferableSkills", "experience", "education", "certifications"],
    tips: ["Transferable skills section is critical", "Reframe job titles to match new industry", "Summary must explain the pivot clearly", "Highlight any new courses or certifications"],
    atsScore: "Medium",
    pageLimit: "1–2 pages",
    category: "standard",
  },
  europass: {
    label: "Europass CV",
    subtitle: "EU jobs · Standard format · CEFR language scale",
    icon: "🇪🇺",
    color: "#003399",
    accent: "#ffcc00",
    description:
      "The official EU standard CV format. Fixed structure recognised across all European countries. Includes CEFR language proficiency scale (A1–C2).",
    sections: ["personal", "summary", "experience", "education", "skills", "languages", "certifications"],
    tips: ["Language levels: A1/A2, B1/B2, C1/C2 (CEFR)", "Include nationality and date of birth", "Fixed structure — do not reorder sections", "Available at europass.eu"],
    atsScore: "High",
    pageLimit: "2–4 pages",
    category: "regional",
  },
  federal: {
    label: "Federal CV (USA)",
    subtitle: "US Government · USAJOBS · Salary history · Detailed",
    icon: "🦅",
    color: "#1e3a5f",
    accent: "#dc2626",
    description:
      "Required for US federal government jobs via USAJOBS.gov. Very detailed — 4–6 pages is normal. Includes salary history, hours per week and supervisor details.",
    sections: ["personal", "summary", "experience", "education", "skills", "certifications", "awards"],
    tips: ["Include salary and hours for EVERY job", "Spell out every acronym in full", "4–6 pages is normal and expected", "Match the exact language in the vacancy announcement"],
    atsScore: "High",
    pageLimit: "4–6 pages",
    category: "regional",
  },
  international: {
    label: "International CV",
    subtitle: "Global applications · Multilingual · Cross-cultural",
    icon: "🌍",
    color: "#164e63",
    accent: "#06b6d4",
    description:
      "Adapted for international job applications. Includes languages, cultural adaptability and is adjusted per country norms. Avoids region-specific jargon.",
    sections: ["personal", "summary", "experience", "education", "skills", "languages", "certifications", "awards"],
    tips: ["Include nationality and work permit status", "List all languages with CEFR proficiency level", "Remove region-specific abbreviations", "Research target country's CV norms"],
    atsScore: "High",
    pageLimit: "1–2 pages",
    category: "regional",
  },
  mini: {
    label: "Mini CV",
    subtitle: "Business card style · Networking · Key highlights only",
    icon: "📌",
    color: "#374151",
    accent: "#6b7280",
    description:
      "Very short CV in business card style. Only the most critical highlights. Used for networking events, LinkedIn summaries or as a one-page leave-behind.",
    sections: ["personal", "summary", "skills", "experience", "education"],
    tips: ["Maximum 1 page — strictly enforced", "Only top 3–4 achievements total", "Prose style preferred over bullet points", "Perfect for networking and conferences"],
    atsScore: "Medium",
    pageLimit: "1 page (strict)",
    category: "specialised",
  },
  technical: {
    label: "Technical CV",
    subtitle: "Engineering · Programming · DevOps · Data Science",
    icon: "⚙️",
    color: "#0f2027",
    accent: "#00bcd4",
    description:
      "Focused on programming languages, tools, frameworks and technical projects. Includes GitHub, tech stack, open-source contributions and problem-solving examples.",
    sections: ["personal", "summary", "skills", "experience", "projects", "education", "certifications"],
    tips: ["Tech stack in a dedicated skills section", "GitHub is mandatory — link prominently", "Show LeetCode/HackerRank if strong", "Include open-source contributions"],
    atsScore: "High",
    pageLimit: "1–2 pages",
    category: "specialised",
  },
  non_traditional: {
    label: "Non-Traditional CV",
    subtitle: "Storytelling · Personal brand · Narrative format",
    icon: "✨",
    color: "#1a0533",
    accent: "#8b5cf6",
    description:
      "Breaks conventional CV rules. Uses storytelling, personal branding and narrative format instead of bullet points. Best for entrepreneurship and creative leadership.",
    sections: ["personal", "personalBrand", "experience", "skills", "projects", "education"],
    tips: ["Your story should flow like a narrative", "Personal mission statement replaces summary", "⚠️ Risky for traditional corporate roles", "Best for startups, agencies, creative firms"],
    atsScore: "Low",
    pageLimit: "1–2 pages",
    category: "creative",
  },
  video: {
    label: "Video CV",
    subtitle: "1–2 min video · Personality · Communication skills",
    icon: "🎬",
    color: "#1c0e0e",
    accent: "#ef4444",
    description:
      "A short 1–2 minute video introducing yourself. Shows communication skills, confidence and personality. Always supplements — never replaces — a written CV.",
    sections: ["personal", "summary", "skills", "experience", "education"],
    tips: ["Always pair with a written CV", "Duration: strictly 1–2 minutes", "Professional background and lighting essential", "Script it but deliver naturally"],
    atsScore: "Low",
    pageLimit: "Supplement only",
    category: "specialised",
  },
};

// ─── CATEGORY GROUPINGS FOR LANDING PAGE ─────────────────────────────────────
export const CV_CATEGORIES = {
  standard: {
    label: "Standard Formats",
    description: "Universally accepted, ATS-friendly — suitable for most job applications",
    color: "#1a2e44",
    types: ["chronological", "functional", "combination", "targeted", "professional", "executive", "entry_level", "graduate", "internship", "career_change"] as CVType[],
  },
  specialised: {
    label: "Specialised Formats",
    description: "Purpose-built for specific industries, roles or career stages",
    color: "#1e3a5f",
    types: ["academic", "technical", "mini", "video"] as CVType[],
  },
  creative: {
    label: "Creative & Visual",
    description: "Design-forward formats — verify ATS compatibility before submitting",
    color: "#2d1b4e",
    types: ["creative", "infographic", "portfolio", "digital", "non_traditional"] as CVType[],
  },
  regional: {
    label: "Regional & International",
    description: "Country-specific or cross-border formats with regional conventions",
    color: "#003399",
    types: ["europass", "federal", "international"] as CVType[],
  },
};
