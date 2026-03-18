import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, cvType, skills, experience } = await req.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Write a 3-sentence professional CV summary for a ${cvType} CV.
Name: ${name}
Skills: ${skills}
Experience: ${experience}
Rules:
- ATS-friendly, active voice
- No fluff or clichés
- Start with the person's role/identity
- End with their value proposition
- Return ONLY the summary text, nothing else`,
        },
      ],
    }),
  });

  const data = await response.json();
  const summary = data.content?.[0]?.text || "";
  return NextResponse.json({ summary });
}
