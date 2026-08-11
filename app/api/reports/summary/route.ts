import { NextResponse } from "next/server";

interface AiSummaryRequest {
  content?: string;
}

interface AiSummary {
  summary: string;
  interpretation: string;
  carePlan: string[];
  counselorNote: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as AiSummaryRequest;

  if (!body.content) {
    return NextResponse.json(
      { message: "content is required" },
      { status: 400 }
    );
  }

  return NextResponse.json(createMockAiSummary(body.content));
}

const createMockAiSummary = (content: string): AiSummary => {
  const hasMind = content.includes("마음") || content.includes("스트레스");
  const hasSleep = content.includes("수면");
  const hasNutrition = content.includes("영양");

  return {
    summary:
      "최근 리포트는 신체 활동, 생활 습관, 정서 관리 항목을 함께 다루고 있습니다. 상담사는 사용자의 실천 가능성과 부담 수준을 함께 확인할 필요가 있습니다.",
    interpretation: hasMind
      ? "정서 관리 항목이 포함되어 있어 스트레스 반응과 자기 돌봄 루틴을 함께 점검하는 흐름이 적절합니다."
      : "생활 관리 중심의 리포트로 보이며, 다음 상담에서는 사용자의 주관적 어려움을 추가로 확인하는 것이 좋습니다.",
    carePlan: [
      hasSleep
        ? "수면 루틴을 한 가지 행동 단위로 줄여 1주일간 실천 여부를 확인합니다."
        : "매일 반복 가능한 회복 루틴을 하나 정하고 수행 여부를 기록합니다.",
      hasNutrition
        ? "식단 조정은 제한보다 대체 가능한 선택지를 중심으로 안내합니다."
        : "현재 생활 패턴에서 가장 부담이 적은 건강 행동을 먼저 선택합니다.",
      "다음 상담에서 사용자가 직접 느낀 변화와 방해 요인을 함께 기록합니다.",
    ],
    counselorNote:
      "AI 요약은 상담사의 판단을 보조하기 위한 초안입니다. 실제 상담 전 사용자의 현재 상태와 표현을 다시 확인하세요.",
  };
};
