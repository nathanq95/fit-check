import { NextResponse } from "next/server";

type ProfileData = {
  name: string;
  linkedin: string;
  github: string;
  portfolio: string;
  yoe: string;
  title: string;
  roles: string;
  projects: string;
  resumeName: string;
  resumeType: string;
  resumeData: string;
  resumeText: string;
};

type FitRequest = {
  roleText: string;
  profile: ProfileData;
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY environment variable." },
      { status: 500 }
    );
  }

  let payload: FitRequest;
  try {
    payload = (await request.json()) as FitRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload.roleText?.trim()) {
    return NextResponse.json({ error: "Role text is required." }, { status: 400 });
  }

  // const prompt = [
  //   "You are a recruiting assistant.",
  //   "Compare the candidate profile to the role description and return JSON only.",
  //   "Return keys: match (boolean), score (0-100 number), summary (string), strengths (string[]), gaps (string[]), recommendations (string[]).",
  //   "",
  //   "Role description:",
  //   payload.roleText,
  //   "",
  //   "Candidate profile (Core Identity + Experience Highlights):",
  //   JSON.stringify(payload.profile, null, 2),
  //   "",
  //   "Resume text (extracted from PDF):",
  //   payload.profile.resumeText || "(no resume text provided)",
  // ].join("\n");
  const prompt = [
  "You are a senior technical recruiter and hiring manager.",
  "",
  "Your task is to evaluate how well the candidate matches the role with strict, real-world hiring standards.",
  "",
  "Rules:",
  "- Base the evaluation ONLY on evidence found in the candidate profile and resume.",
  "- Do NOT assume or infer skills that are not explicitly demonstrated.",
  "- Be honest and direct. Do not soften gaps or inflate strengths.",
  "- Evaluate readiness to perform independently within the first 90 days.",
  "",
  "Evaluation priorities:",
  "- Core requirements matter more than nice-to-haves.",
  "- Hands-on, production experience > academic, side projects, or exposure.",
  "- Recent experience (last 3–5 years) weighs more heavily.",
  "- Adjacent experience should only count if the skill transfer is realistic.",
  "",
  "Scoring rubric:",
  "- 90–100: Strong hire, low risk",
  "- 75–89: Hireable with minor gaps",
  "- 60–74: Borderline, noticeable ramp-up required",
  "- 40–59: Weak fit, major gaps",
  "- <40: Not a fit",
  "",
  "Return JSON ONLY using EXACTLY the following keys:",
  "{",
  '  "match": boolean,',
  '  "score": number,',
  '  "summary": string,',
  '  "strengths": string[],',
  '  "gaps": string[],',
  '  "recommendations": string[]',
  "}",
  "",
  "Guidance for output:",
  "- match should be true only if the candidate is realistically hireable for this role.",
  "- score must align with the rubric.",
  "- summary should be a concise hiring-manager-style assessment.",
  "- strengths should list concrete, role-relevant capabilities.",
  "- gaps should list missing or weak requirements that affect hireability.",
  "- recommendations should be actionable steps to improve fit for this role or similar roles.",
  "",
  "Role description:",
  payload.roleText,
  "",
  "Candidate profile (Core Identity + Experience Highlights):",
  JSON.stringify(payload.profile, null, 2),
  "",
  "Resume text (extracted from PDF):",
  payload.profile.resumeText || "(no resume text provided)",
].join("\n");

  console.log("payload", payload);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "developer",
          content:
            "You evaluate candidate fit based on the provided profile and role. Return JSON only.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "OpenAI request failed.", details: errorText },
      { status: response.status }
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data?.choices?.[0]?.message?.content || "";
  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ raw: content });
  }
}
