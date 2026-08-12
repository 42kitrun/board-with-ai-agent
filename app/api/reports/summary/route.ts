import { NextResponse } from "next/server";

const OPENAI_RESPONSES_API_URL = "https://api.openai.com/v1/responses";

interface AiSummaryRequest {
  content?: string;
}

interface AiSummary {
  summary: string;
  interpretation: string;
  recommendations: string[];
  reviewNote: string;
}

interface OpenAIResponse {
  status?: string;
  output_text?: string;
  output?: {
    content?: {
      text?: string;
      type?: string;
    }[];
  }[];
  error?: {
    message?: string;
  };
  incomplete_details?: {
    reason?: string;
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as AiSummaryRequest;

  if (!body.content) {
    return NextResponse.json(
      { message: "content is required" },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { message: "OPENAI_API_KEY is required" },
      { status: 500 }
    );
  }

  try {
    const summary = await createAiSummary(body.content);
    return NextResponse.json(summary);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate AI summary";

    return NextResponse.json({ message }, { status: 502 });
  }
}

const createAiSummary = async (content: string): Promise<AiSummary> => {
  const response = await fetch(OPENAI_RESPONSES_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        {
          role: "system",
          content:
            "You summarize healthcare reports for a product prototype. Return concise Korean text. Do not diagnose, prescribe, or present the output as medical advice.",
        },
        {
          role: "user",
          content: `다음 Health Report를 요약해 주세요.\n\n${content}`,
        },
      ],
      max_output_tokens: 3000,
      reasoning: {
        effort: "minimal",
      },
      text: {
        format: {
          type: "json_schema",
          name: "health_report_summary",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "summary",
              "interpretation",
              "recommendations",
              "reviewNote",
            ],
            properties: {
              summary: {
                type: "string",
                description:
                  "리포트의 핵심 내용을 신체, 영양, 마음, 수면 카테고리별로 줄바꿈해 요약합니다. 형식은 '신체: ...\\n영양: ...\\n마음: ...\\n수면: ...'를 따릅니다.",
              },
              interpretation: {
                type: "string",
                description:
                  "신체, 영양, 마음, 수면 등 항목 간 상태 흐름을 간단히 해석합니다.",
              },
              recommendations: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: {
                  type: "string",
                },
                description:
                  "사용자가 실천할 수 있는 관리 제안을 3개 작성합니다.",
              },
              reviewNote: {
                type: "string",
                description:
                  "AI 요약을 리포트에 반영하기 전 확인할 주의점을 작성합니다.",
              },
            },
          },
        },
      },
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI API request failed");
  }

  if (data.status === "incomplete") {
    throw new Error(
      `OpenAI API response was incomplete: ${
        data.incomplete_details?.reason || "unknown reason"
      }`
    );
  }

  const outputText = extractOutputText(data);

  if (!outputText) {
    throw new Error("OpenAI API response did not include output text");
  }

  return JSON.parse(outputText) as AiSummary;
};

const extractOutputText = (response: OpenAIResponse) => {
  if (response.output_text) {
    return response.output_text;
  }

  return response.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === "output_text" && content.text)?.text;
};
