import { NextRequest, NextResponse } from "next/server";
// AI Roadmap Generation API Route
// Uses Anthropic Claude to generate personalized career roadmaps

export async function POST(request: NextRequest) {
  try {
    const { targetRole } = await request.json();

    if (!targetRole || typeof targetRole !== "string") {
      return NextResponse.json(
        { error: "Target role is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return mock data if API key is not configured
      return NextResponse.json({ roadmap: getMockRoadmap(targetRole) });
    }

    // Call Anthropic Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: `You are a career guidance AI. Generate a detailed career roadmap for someone who wants to become a "${targetRole}".

Return a JSON object with this exact structure:
{
  "target_role": "${targetRole}",
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase Name",
      "description": "Brief description",
      "duration": "X-Y weeks",
      "order": 1,
      "steps": [
        {
          "id": "step-1-1",
          "title": "Step Title",
          "description": "What to learn/do",
          "resources": [
            { "title": "Resource Name", "url": "https://...", "type": "course|article|video|tool|book" }
          ],
          "completed": false,
          "estimated_hours": 20
        }
      ]
    }
  ]
}

Include 4-5 phases (Foundation → Intermediate → Advanced → Specialization → Industry Ready) with 2-4 steps each. Include real, useful resource links. Make it actionable and specific to the role.

Return ONLY the JSON, no markdown formatting.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    const roadmap = JSON.parse(content);
    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Please try again." },
      { status: 500 }
    );
  }
}

// Mock roadmap fallback


function getMockRoadmap(role: string) {
  return {
    target_role: role,
    phases: [
      {
        id: "phase-1",
        title: "Foundation",
        description: `Build core fundamentals needed for a ${role} career.`,
        duration: "4-6 weeks",
        order: 1,
        steps: [
          {
            id: "step-1-1",
            title: "Core Concepts & Theory",
            description: `Learn the fundamental concepts and theory behind ${role}.`,
            resources: [
              { title: "Getting Started Guide", url: "https://example.com", type: "article" },
            ],
            completed: false,
            estimated_hours: 20,
          },
          {
            id: "step-1-2",
            title: "Essential Tools & Setup",
            description: "Set up your development environment and learn essential tools.",
            resources: [
              { title: "Tool Setup Tutorial", url: "https://example.com", type: "video" },
            ],
            completed: false,
            estimated_hours: 10,
          },
        ],
      },
      {
        id: "phase-2",
        title: "Intermediate",
        description: "Deepen your knowledge and start building real projects.",
        duration: "6-8 weeks",
        order: 2,
        steps: [
          {
            id: "step-2-1",
            title: "Hands-on Projects",
            description: "Build 2-3 real-world projects to solidify your skills.",
            resources: [
              { title: "Project Ideas", url: "https://example.com", type: "article" },
            ],
            completed: false,
            estimated_hours: 40,
          },
        ],
      },
    ],
  };
}
