import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { bio, skills, education, experience, projects, name, title } = await req.json();

    const prompt = `You are a professional portfolio writer. Your job is to take raw, informal input from a person and rewrite it into polished, professional portfolio content.

Here is the person's raw input:

Name: ${name}
Title: ${title}
Bio: ${bio}
Skills: ${skills}
Education: ${education}
Experience: ${experience}
Projects: ${projects}

Rewrite each section into professional, compelling content. Follow these rules strictly:
- Bio: Write 2-3 sentences in first person. Make it confident and professional.
- Skills: Return as comma separated list, clean and properly capitalized.
- Education: One entry per line. Format: Degree, Institution, Year
- Experience: One entry per line. Format: Role at Company, Year — one sentence description
- Projects: One entry per line. Format: Project Name — brief description — link (keep original link if provided)
- Do not add any information that was not provided
- Do not use any emojis
- Keep it concise and factual

Return ONLY a valid JSON object with these exact keys: bio, skills, education, experience, projects
No markdown, no explanation, just the JSON object.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "AI rewrite failed" },
        { status: 500 }
      );
    }

    const text = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid format. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
