import { NextRequest, NextResponse } from "next/server";

// AI Suggestions API Route
// Generates daily learning suggestions via Claude

export async function POST(request: NextRequest) {
  try {
    const { targetRole, currentPhase, completedSkills } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ suggestions: getMockSuggestions() });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `Generate 6 daily learning suggestions for someone pursuing a "${targetRole || "Software Developer"}" career.
They are currently in the "${currentPhase || "Intermediate"}" phase.
Skills completed: ${JSON.stringify(completedSkills || [])}.

Return a JSON array of suggestions:
[
  {
    "id": "s1",
    "title": "Task Title",
    "description": "Brief description",
    "type": "course|practice|reading|networking|project",
    "estimated_time": "30 min",
    "difficulty": "beginner|intermediate|advanced",
    "url": "optional url",
    "completed": false,
    "tags": ["tag1", "tag2"]
  }
]

Return ONLY the JSON array.`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("AI API error");

    const data = await response.json();
    const suggestions = JSON.parse(data.content[0].text);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Suggestions error:", error);
    return NextResponse.json({ suggestions: getMockSuggestions() });
  }
}

function getMockSuggestions() {
  return [
    {
      id: "s1",
      title: "Build a REST API with Express.js",
      description: "Create a complete CRUD API with authentication.",
      type: "project",
      estimated_time: "2-3 hours",
      difficulty: "intermediate",
      completed: false,
      tags: ["Node.js", "Express"],
    },
  ];
}
