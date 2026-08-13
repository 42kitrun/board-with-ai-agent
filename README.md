# Healthcare Report Dashboard

Next.js와 TypeScript로 구현한 헬스케어 리포트 대시보드 포트폴리오입니다.

사용자 정보, 코멘트, 설문 결과, 목표 달성률, 피로도 그래프, 건강 리포트 편집 화면을 컴포넌트 단위로 구성했고, 리포트 본문을 서버 API와 연결해 요약 결과를 검토 후 반영하는 흐름까지 확장했습니다.

## Live Demo

- Firebase Hosting: https://board-with-ai-agent.web.app

## Overview

이 프로젝트는 헬스케어 서비스 운영자가 사용자의 상태 변화와 건강 리포트를 한 화면에서 확인하고 관리하는 상황을 가정해 만든 대시보드입니다.

기본 대시보드 UI는 Next.js, React, TypeScript 학습 과정에서 강의를 참고하되 직접 작성했고, 이후 포트폴리오 프로젝트로 발전시키면서 건강 리포트 요약 API, 요약 결과 모달, 리포트 반영 액션, 데이터 구조 초안을 추가했습니다.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- OpenAI Responses API
- Firebase Hosting

## Implemented Features

- 사용자 기본 정보 대시보드
- 코멘트 목록, 작성, 수정, 삭제 UI
- 설문 결과 시각화
- 목표 달성률 비교 그래프
- 피로도 추이 그래프
- 건강 리포트 조회, 수정, 삭제 UI
- 건강 리포트 요약 생성 API
- 요약 결과 검토 모달
- 신체, 영양, 마음, 수면 카테고리별 핵심 요약 표시
- 검토한 요약 초안을 리포트 본문에 반영하는 흐름
- Firebase Hosting 배포

## Project Highlights

- Next.js와 TypeScript 기반으로 헬스케어 리포트 대시보드 UI를 구현했습니다.
- 사용자 정보, 코멘트, 설문 결과, 목표 달성률, 피로도 그래프, 리포트 편집 화면을 컴포넌트 단위로 분리했습니다.
- 선택한 건강 리포트 본문을 서버 API route로 전달하고, 구조화된 응답 형식으로 요약 결과를 파싱했습니다.
- 생성된 핵심 요약, 상태 해석, 관리 제안을 모달에서 검토한 뒤 기존 리포트 본문에 반영하는 사용자 흐름을 구현했습니다.
- OpenAI API 키는 클라이언트에 노출하지 않고 서버 런타임 환경에서만 참조하도록 구성했습니다.
- PostgreSQL/Supabase 확장을 가정한 데이터 구조 초안을 문서화했습니다.

## Product Flow

```text
사용자 대시보드 확인
  -> 건강 리포트 선택
  -> 리포트 본문 수정
  -> 요약 생성 요청
  -> 요약 결과 검토
  -> 리포트 본문에 반영
```

이 흐름은 단순히 API 응답을 화면에 출력하는 데서 끝나지 않고, 사용자가 생성된 초안을 확인한 뒤 실제 리포트 편집 작업에 반영하는 방식으로 구성했습니다.

## API

```text
POST /api/reports/summary
```

선택된 건강 리포트 본문을 입력으로 받아 OpenAI Responses API로 핵심 요약, 상태 해석, 관리 제안, 검토 메모를 생성합니다.

Request:

```json
{
  "content": "health report content"
}
```

Response:

```json
{
  "summary": "신체: ...\n영양: ...\n마음: ...\n수면: ...",
  "interpretation": "상태 흐름에 대한 간단한 해석",
  "recommendations": ["관리 제안 1", "관리 제안 2", "관리 제안 3"],
  "reviewNote": "리포트 반영 전 확인할 검토 메모"
}
```

## Data Schema

- [Data Schema Draft](./docs/schema.md)

현재 앱은 더미 데이터와 요약 API로 동작하지만, 실제 제품에서는 `users -> survey_responses -> health_reports -> ai_reports -> review_comments -> action_items` 흐름으로 확장할 수 있도록 데이터 구조 초안을 작성했습니다.

## Development Note

기본 대시보드 UI 구현과 최종 코드 검토는 직접 수행했습니다. AI Agent는 기존 코드 분석, 기능 요구사항 정리, API 응답 구조 설계, 구현 초안 작성, README 문서화 보조에 활용했습니다.

## Current Status

- 기본 대시보드 화면 로컬 확인 완료
- 기존 서비스명과 식별 가능한 더미 개인정보 제거
- Next.js API route 기반 리포트 요약 흐름 구현
- 요약 결과 모달과 리포트 반영 액션 구현
- Firebase 프로젝트 `board-with-ai-agent` 배포 완료
- PostgreSQL/Supabase 확장을 가정한 데이터 구조 초안 작성

## Getting Started

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Deployment

Firebase Hosting의 Next.js framework support를 사용합니다.

```bash
firebase experiments:enable webframeworks
firebase deploy --only hosting --project board-with-ai-agent
```

배포 전 OpenAI API 키를 서버 런타임 환경에 설정합니다.

## Repository

```bash
git clone https://github.com/42kitrun/board-with-ai-agent.git
```
