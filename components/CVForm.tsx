"use client";

import { CVData, CVType, CV_TYPES } from "@/lib/cvTypes";
import { Plus, Trash2 } from "lucide-react";

interface CVFormProps {
  type: CVType;
  data: CVData;
  onChange: (data: CVData) => void;
  accentColor: string;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="form-label">{children}</label>;
}

function SectionTitle({ title, accentColor, onAdd, addLabel }: {
  title: string; accentColor: string; onAdd?: () => void; addLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3 mt-6 first:mt-0">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-l-2 pl-2" style={{ borderColor: accentColor }}>{title}</h3>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md"
          style={{ color: accentColor, background: `${accentColor}15` }}>
          <Plus size={11} />{addLabel || "Add"}
        </button>
      )}
    </div>
  );
}

function Card({ children, onRemove, canRemove }: { children: React.ReactNode; onRemove?: () => void; canRemove?: boolean }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white relative mb-3">
      {canRemove && onRemove && (
        <button onClick={onRemove} className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors">
          <Trash2 size={13} />
        </button>
      )}
      {children}
    </div>
  );
}

function EmptyAdd({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-sm text-gray-400 hover:border-gray-300 transition-colors">
      + {label}
    </button>
  );
}

export default function CVForm({ type, data, onChange, accentColor }: CVFormProps) {
  const sections = CV_TYPES[type].sections;

  const update = (path: string, value: unknown) => {
    const keys = path.split(".");
    const newData = JSON.parse(JSON.stringify(data)) as CVData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const addItem = (section: keyof CVData, template: Record<string, unknown>) => {
    const newData = JSON.parse(JSON.stringify(data)) as CVData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newData[section] as any[]).push({ ...template, id: Date.now().toString() });
    onChange(newData);
  };

  const removeItem = (section: keyof CVData, id: string) => {
    const newData = JSON.parse(JSON.stringify(data)) as CVData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newData as any)[section] = (newData[section] as any[]).filter((i: { id: string }) => i.id !== id);
    onChange(newData);
  };

  const inp = (label: string, path: string, placeholder: string, textarea = false, rows = 3) => (
    <div>
      <Label>{label}</Label>
      {textarea ? (
        <textarea className="form-input resize-none" rows={rows} placeholder={placeholder}
          value={String((path.split(".").reduce((o: unknown, k) => (o as Record<string, unknown>)?.[k], data)) ?? "")}
          onChange={(e) => update(path, e.target.value)} />
      ) : (
        <input className="form-input" placeholder={placeholder}
          value={String((path.split(".").reduce((o: unknown, k) => (o as Record<string, unknown>)?.[k], data)) ?? "")}
          onChange={(e) => update(path, e.target.value)} />
      )}
    </div>
  );

  const showSummary = sections.includes("summary") || ["mnc", "tech", "creative", "chronological", "combination", "targeted", "professional", "executive", "career_change", "europass", "federal", "international", "mini", "technical", "non_traditional", "video", "graduate", "portfolio", "digital", "infographic"].includes(type);

  return (
    <div className="p-5 space-y-1">

      {/* ── PERSONAL ── */}
      <SectionTitle title="Personal Information" accentColor={accentColor} />
      <div className="space-y-3">
        {inp("Full Name *", "personal.fullName", "e.g. Sehazad Siam")}
        <div className="grid grid-cols-2 gap-3">
          {inp("Email *", "personal.email", "you@email.com")}
          {inp("Phone", "personal.phone", "+880 1XXX XXXXXX")}
        </div>
        {inp("Location / City", "personal.location", "Dhaka, Bangladesh")}
        <div className="grid grid-cols-2 gap-3">
          {inp("LinkedIn URL", "personal.linkedin", "linkedin.com/in/you")}
          {inp("Website / Portfolio", "personal.website", "yoursite.com")}
        </div>

        {/* Federal + Europass + International: nationality */}
        {["federal", "europass", "international"].includes(type) && (
          <div className="grid grid-cols-2 gap-3">
            {inp("Nationality", "personal.nationality", "e.g. Bangladeshi")}
            {type === "federal" && inp("Expected Salary", "personal.salary", "e.g. $80,000/year")}
          </div>
        )}

        {/* Video CV: video link */}
        {type === "video" && (
          inp("Video CV Link (YouTube / Drive)", "personal.videoLink", "https://youtube.com/your-video")
        )}

        {/* Summary */}
        {showSummary && (
          inp(
            type === "academic" ? "Research Profile" : type === "executive" ? "Executive Profile" : "Professional Summary",
            "personal.summary",
            type === "academic" ? "Briefly describe your research focus and academic goals..." :
              type === "executive" ? "3–4 lines on your leadership philosophy, impact and strategic vision." :
                "2–3 sentences: your role, top skills, and what you bring.",
            true, 3
          )
        )}
      </div>

      {/* ── NON-TRADITIONAL: Personal Brand ── */}
      {type === "non_traditional" && (
        <>
          <SectionTitle title="Personal Mission Statement" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={4}
            placeholder="Tell your story. What drives you? What problem do you solve? Write in first person — this replaces the traditional summary."
            value={data.personalBrand}
            onChange={(e) => update("personalBrand", e.target.value)} />
        </>
      )}

      {/* ── ACADEMIC: Research Interests ── */}
      {type === "academic" && (
        <>
          <SectionTitle title="Research Interests" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={2}
            placeholder="Machine Learning, Natural Language Processing, Climate Modelling..."
            value={data.researchInterests}
            onChange={(e) => update("researchInterests", e.target.value)} />
        </>
      )}

      {/* ── CAREER CHANGE: Transferable Skills ── */}
      {type === "career_change" && (
        <>
          <SectionTitle title="Transferable Skills" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={3}
            placeholder={"List skills that apply to your new industry:\nProject Management, Data Analysis, Client Communication, Team Leadership..."}
            value={data.transferableSkills}
            onChange={(e) => update("transferableSkills", e.target.value)} />
        </>
      )}

      {/* ── EDUCATION ── */}
      {sections.includes("education") && (
        <>
          <SectionTitle title="Education" accentColor={accentColor}
            onAdd={() => addItem("education", { institution: "", degree: "", field: "", startYear: "", endYear: "", gpa: "", achievements: "", thesis: "" })}
            addLabel="Add" />
          {data.education.map((edu, idx) => (
            <Card key={edu.id} onRemove={() => removeItem("education", edu.id)} canRemove={data.education.length > 1}>
              <div className="space-y-2">
                {inp("Institution", `education.${idx}.institution`, "University of Dhaka")}
                <div className="grid grid-cols-2 gap-2">
                  {inp("Degree", `education.${idx}.degree`, "BSc / MSc / PhD")}
                  {inp("Field of Study", `education.${idx}.field`, "Computer Science")}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {inp("Start Year", `education.${idx}.startYear`, "2020")}
                  {inp("End Year", `education.${idx}.endYear`, "2024")}
                  {inp("GPA / CGPA", `education.${idx}.gpa`, "3.8 / 4.0")}
                </div>
                {type === "academic" && inp("Thesis / Dissertation Title", `education.${idx}.thesis`, "Deep Learning for Climate Prediction")}
                {inp("Achievements (optional)", `education.${idx}.achievements`, "Dean's List, Class Rank 1...")}
              </div>
            </Card>
          ))}
        </>
      )}

      {/* ── EXPERIENCE ── */}
      {sections.includes("experience") && (
        <>
          <SectionTitle title={type === "functional" ? "Work History (brief)" : "Work Experience"} accentColor={accentColor}
            onAdd={() => addItem("experience", { company: "", position: "", startDate: "", endDate: "", current: false, description: "", achievements: "", salary: "", hoursPerWeek: "" })}
            addLabel="Add" />
          {data.experience.map((exp, idx) => (
            <Card key={exp.id} onRemove={() => removeItem("experience", exp.id)} canRemove={data.experience.length > 1}>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {inp("Company", `experience.${idx}.company`, "Grameenphone Ltd.")}
                  {inp("Position / Title", `experience.${idx}.position`, "Senior Manager")}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {inp("Start Date", `experience.${idx}.startDate`, "Jan 2022")}
                  <div>
                    <Label>End Date</Label>
                    <input className="form-input" placeholder="Present" disabled={exp.current}
                      value={exp.endDate}
                      onChange={(e) => update(`experience.${idx}.endDate`, e.target.value)} />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" className="rounded" checked={exp.current}
                    onChange={(e) => {
                      update(`experience.${idx}.current`, e.target.checked);
                      if (e.target.checked) update(`experience.${idx}.endDate`, "Present");
                    }} />
                  Currently working here
                </label>
                {/* Federal: salary + hours */}
                {type === "federal" && (
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Salary at This Job", `experience.${idx}.salary`, "e.g. $75,000/year")}
                    {inp("Hours Per Week", `experience.${idx}.hoursPerWeek`, "e.g. 40")}
                  </div>
                )}
                {type !== "functional" && inp("Role Description", `experience.${idx}.description`, "Brief description of responsibilities.", true, 2)}
                {inp(
                  type === "executive" ? "Key Achievements & Business Impact (one per line)" : "Key Achievements (one per line — use Action Verb + Task + Result)",
                  `experience.${idx}.achievements`,
                  type === "executive"
                    ? "Led restructuring of operations, reducing costs by $2M annually\nGrew revenue by 45% YoY to reach $50M"
                    : "Developed POS system that reduced billing time by 30%\nLed team of 8 to deliver project 2 weeks early",
                  true, 3
                )}
              </div>
            </Card>
          ))}
        </>
      )}

      {/* ── SKILLS ── */}
      {sections.includes("skills") && (
        <>
          <SectionTitle title="Skills" accentColor={accentColor}
            onAdd={() => addItem("skills", { category: "", skills: "" })}
            addLabel="Add Group" />
          {data.skills.map((sg, idx) => (
            <div key={sg.id} className="flex gap-2 items-center mb-2">
              <input className="form-input w-36 flex-shrink-0" placeholder="Category"
                value={sg.category} onChange={(e) => update(`skills.${idx}.category`, e.target.value)} />
              <input className="form-input flex-1" placeholder="Python, SQL, React, Leadership..."
                value={sg.skills} onChange={(e) => update(`skills.${idx}.skills`, e.target.value)} />
              {data.skills.length > 1 && (
                <button onClick={() => removeItem("skills", sg.id)} className="text-gray-300 hover:text-red-400">
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── PROJECTS ── */}
      {sections.includes("projects") && (
        <>
          <SectionTitle title="Projects" accentColor={accentColor}
            onAdd={() => addItem("projects", { name: "", description: "", tech: "", link: "", year: "" })}
            addLabel="Add" />
          {data.projects.length === 0
            ? <EmptyAdd label="Add a project" onClick={() => addItem("projects", { name: "", description: "", tech: "", link: "", year: "" })} />
            : data.projects.map((proj, idx) => (
              <Card key={proj.id} onRemove={() => removeItem("projects", proj.id)} canRemove={true}>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Project Name", `projects.${idx}.name`, "E-commerce Platform")}
                    {inp("Year", `projects.${idx}.year`, "2024")}
                  </div>
                  {inp("Description", `projects.${idx}.description`, "What it does and your role in building it.", true, 2)}
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Tech Stack", `projects.${idx}.tech`, "React, Node.js, PostgreSQL")}
                    {inp("Link (GitHub / Live)", `projects.${idx}.link`, "github.com/you/project")}
                  </div>
                </div>
              </Card>
            ))
          }
        </>
      )}

      {/* ── PUBLICATIONS ── */}
      {sections.includes("publications") && (
        <>
          <SectionTitle title="Publications & Research" accentColor={accentColor}
            onAdd={() => addItem("publications", { title: "", journal: "", year: "", coAuthors: "", doi: "" })}
            addLabel="Add" />
          {data.publications.length === 0
            ? <EmptyAdd label="Add a publication" onClick={() => addItem("publications", { title: "", journal: "", year: "", coAuthors: "", doi: "" })} />
            : data.publications.map((pub, idx) => (
              <Card key={pub.id} onRemove={() => removeItem("publications", pub.id)} canRemove={true}>
                <div className="space-y-2">
                  {inp("Publication Title", `publications.${idx}.title`, "Deep Learning for Climate Prediction")}
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Journal / Conference", `publications.${idx}.journal`, "Nature, NeurIPS...")}
                    {inp("Year", `publications.${idx}.year`, "2024")}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Co-Authors", `publications.${idx}.coAuthors`, "J. Smith, A. Rahman")}
                    {inp("DOI (optional)", `publications.${idx}.doi`, "10.1234/example")}
                  </div>
                </div>
              </Card>
            ))
          }
        </>
      )}

      {/* ── CONFERENCES (academic) ── */}
      {sections.includes("conferences") && (
        <>
          <SectionTitle title="Conferences & Presentations" accentColor={accentColor}
            onAdd={() => addItem("conferences", { title: "", event: "", year: "", location: "" })}
            addLabel="Add" />
          {data.conferences.length === 0
            ? <EmptyAdd label="Add a conference" onClick={() => addItem("conferences", { title: "", event: "", year: "", location: "" })} />
            : data.conferences.map((conf, idx) => (
              <Card key={conf.id} onRemove={() => removeItem("conferences", conf.id)} canRemove={true}>
                <div className="space-y-2">
                  {inp("Paper / Talk Title", `conferences.${idx}.title`, "Advances in Neural Networks")}
                  {inp("Conference / Event", `conferences.${idx}.event`, "NeurIPS 2024")}
                  <div className="grid grid-cols-2 gap-2">
                    {inp("Location", `conferences.${idx}.location`, "Vancouver, Canada")}
                    {inp("Year", `conferences.${idx}.year`, "2024")}
                  </div>
                </div>
              </Card>
            ))
          }
        </>
      )}

      {/* ── TEACHING (academic) ── */}
      {type === "academic" && (
        <>
          <SectionTitle title="Teaching Experience" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={3}
            placeholder={"Teaching Assistant — Introduction to AI, University of Dhaka (2022–2024)\nGuest Lecturer — Machine Learning, BUET (2023)"}
            value={data.teachingExperience}
            onChange={(e) => update("teachingExperience", e.target.value)} />
        </>
      )}

      {/* ── GRANTS (academic) ── */}
      {type === "academic" && (
        <>
          <SectionTitle title="Grants & Funding" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={2}
            placeholder="NSF Graduate Research Fellowship — $34,000 (2023)"
            value={data.grants}
            onChange={(e) => update("grants", e.target.value)} />
        </>
      )}

      {/* ── AWARDS ── */}
      {sections.includes("awards") && (
        <>
          <SectionTitle title="Awards & Honours" accentColor={accentColor}
            onAdd={() => addItem("awards", { title: "", issuer: "", year: "", description: "" })}
            addLabel="Add" />
          {data.awards.length === 0
            ? <EmptyAdd label="Add an award" onClick={() => addItem("awards", { title: "", issuer: "", year: "", description: "" })} />
            : data.awards.map((award, idx) => (
              <Card key={award.id} onRemove={() => removeItem("awards", award.id)} canRemove={true}>
                <div className="grid grid-cols-2 gap-2">
                  {inp("Award Title", `awards.${idx}.title`, "Dean's List Award")}
                  {inp("Issuer", `awards.${idx}.issuer`, "University of Dhaka")}
                  {inp("Year", `awards.${idx}.year`, "2023")}
                  {inp("Description", `awards.${idx}.description`, "Top 5% of class")}
                </div>
              </Card>
            ))
          }
        </>
      )}

      {/* ── CERTIFICATIONS ── */}
      {sections.includes("certifications") && (
        <>
          <SectionTitle title="Certifications" accentColor={accentColor}
            onAdd={() => addItem("certifications", { name: "", issuer: "", year: "", credentialId: "" })}
            addLabel="Add" />
          {data.certifications.length === 0
            ? <EmptyAdd label="Add a certification" onClick={() => addItem("certifications", { name: "", issuer: "", year: "", credentialId: "" })} />
            : data.certifications.map((cert, idx) => (
              <Card key={cert.id} onRemove={() => removeItem("certifications", cert.id)} canRemove={true}>
                <div className="grid grid-cols-2 gap-2">
                  {inp("Certification Name", `certifications.${idx}.name`, "AWS Solutions Architect")}
                  {inp("Issuing Body", `certifications.${idx}.issuer`, "Amazon Web Services")}
                  {inp("Year", `certifications.${idx}.year`, "2024")}
                  {inp("Credential ID", `certifications.${idx}.credentialId`, "ABC-12345 (optional)")}
                </div>
              </Card>
            ))
          }
        </>
      )}

      {/* ── LANGUAGES — structured (europass, international, academic) ── */}
      {["europass", "international", "academic"].includes(type) && sections.includes("languages") && (
        <>
          <SectionTitle title="Languages (CEFR Scale)" accentColor={accentColor}
            onAdd={() => addItem("languages", { language: "", level: "" })}
            addLabel="Add" />
          <p className="text-xs text-gray-400 mb-2">Levels: A1 / A2 (Basic) · B1 / B2 (Independent) · C1 / C2 (Proficient) · Native</p>
          {data.languages.map((lang, idx) => (
            <div key={lang.id} className="flex gap-2 items-center mb-2">
              <input className="form-input flex-1" placeholder="Language (e.g. English)"
                value={lang.language} onChange={(e) => update(`languages.${idx}.language`, e.target.value)} />
              <select className="form-input w-36 flex-shrink-0"
                value={lang.level} onChange={(e) => update(`languages.${idx}.level`, e.target.value)}>
                <option value="">Level</option>
                <option>Native</option>
                <option>C2 – Mastery</option>
                <option>C1 – Advanced</option>
                <option>B2 – Upper Intermediate</option>
                <option>B1 – Intermediate</option>
                <option>A2 – Elementary</option>
                <option>A1 – Beginner</option>
              </select>
              {data.languages.length > 1 && (
                <button onClick={() => removeItem("languages", lang.id)} className="text-gray-300 hover:text-red-400">
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── LANGUAGES — text (other types) ── */}
      {!["europass", "international", "academic"].includes(type) && sections.includes("languages") && (
        <>
          <SectionTitle title="Languages" accentColor={accentColor} />
          <input className="form-input" placeholder="English (Fluent), Bengali (Native), Arabic (Basic)"
            value={data.languagesText}
            onChange={(e) => update("languagesText", e.target.value)} />
        </>
      )}

      {/* ── GITHUB (technical, digital, portfolio) ── */}
      {(type === "technical" || type === "digital" || type === "portfolio") && (
        <>
          <SectionTitle title="GitHub / Open Source" accentColor={accentColor} />
          <input className="form-input" placeholder="github.com/yourusername"
            value={data.github} onChange={(e) => update("github", e.target.value)} />
        </>
      )}

      {/* ── PORTFOLIO (creative, infographic, portfolio, digital) ── */}
      {["creative", "portfolio", "digital", "infographic"].includes(type) && (
        <>
          <SectionTitle title="Portfolio Link" accentColor={accentColor} />
          <input className="form-input" placeholder="behance.net/you or dribbble.com/you"
            value={data.portfolio} onChange={(e) => update("portfolio", e.target.value)} />
        </>
      )}

      {/* ── REFERENCES ── */}
      {sections.includes("references") && (
        <>
          <SectionTitle title="References" accentColor={accentColor} />
          <textarea className="form-input resize-none" rows={3}
            placeholder={'Prof. Dr. Rahman\nUniversity of Dhaka · email@du.ac.bd\n\n(Or write "Available upon request")'}
            value={data.references}
            onChange={(e) => update("references", e.target.value)} />
        </>
      )}

      <div className="h-8" />
    </div>
  );
}
