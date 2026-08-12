# Board with AI Agent

강의를 참고하며 직접 작성한 Next.js 헬스케어 대시보드 UI를 기반으로, 건강 리포트 요약 흐름을 AI Agent 활용 방식으로 확장한 포트폴리오 프로젝트입니다.

## Live Demo

- Firebase Hosting: https://board-with-ai-agent.web.app

## Overview

이 프로젝트의 기본 대시보드 코드는 Next.js, React, TypeScript 학습 과정에서 직접 구현했습니다. 사용자 정보, 코멘트, 설문 결과, 목표 달성률, 피로도 그래프, 건강 리포트 편집 화면을 컴포넌트 단위로 구성했습니다.

현재 레포는 이 기본 구현을 바탕으로, 기존 건강 리포트 본문을 API에 전달하고 AI가 생성한 요약을 모달에서 확인한 뒤 리포트 하단에 반영하는 흐름을 확장한 작업 공간입니다.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- Firebase Hosting

## Implemented Features

- 사용자 기본 정보 대시보드
- 코멘트 목록, 작성, 수정, 삭제 UI
- 설문 결과 시각화
- 목표 달성률 비교 그래프
- 피로도 추이 그래프
- 건강 리포트 조회, 수정, 삭제 UI
- AI 요약 생성 버튼
- OpenAI Responses API 기반 AI 요약 생성 API
- AI 요약 결과 모달
- 신체, 영양, 마음, 수면 카테고리별 핵심 요약 표시
- 검토한 AI 요약 초안을 리포트 본문에 반영하는 흐름
- Firebase Hosting 배포 설정

## Current Status

- 기본 대시보드 화면 로컬 확인 완료
- 기존 서비스명과 식별 가능한 더미 개인정보 제거
- Firebase 프로젝트 `board-with-ai-agent` 배포 완료
- Next.js API route 기반 OpenAI API 요약 흐름 구현
- AI 요약 모달과 리포트 반영 액션 구현
- 선택한 건강 리포트 본문을 AI 요약 입력값으로 전달하는 흐름 구현
- PostgreSQL/Supabase 확장을 가정한 데이터 구조 초안 작성

## Project Highlights

- 기존 Next.js 헬스케어 대시보드에 OpenAI API 기반 요약 기능을 추가했습니다.
- 선택한 Health Report 본문을 서버 API route로 전달하고, structured output으로 요약 결과를 안정적으로 파싱했습니다.
- AI가 생성한 핵심 요약, 상태 해석, 관리 제안을 모달에서 검토한 뒤 기존 리포트 본문에 반영하는 사용자 흐름을 구현했습니다.
- 핵심 요약은 신체, 영양, 마음, 수면 카테고리별로 줄바꿈해 가독성을 개선했습니다.

## What I Focused On

이 프로젝트에서는 단순히 LLM API를 호출하는 것보다, AI가 생성한 텍스트를 실제 사용자가 검토하고 제품 화면에 반영하는 흐름을 만드는 데 집중했습니다. 기존 UI 구조를 유지하면서 서버 API, 응답 스키마, 모달 UI, 리포트 반영 액션을 연결해 작은 기능 단위의 end-to-end 흐름을 완성했습니다.

## AI Agent Extension

기본 UI 구현 위에 AI Agent를 활용한 건강 리포트 요약 흐름을 확장했습니다.

- 건강 리포트 본문을 AI 요약 입력 데이터로 구조화
- OpenAI structured output 기반 AI 요약, 상태 해석, 관리 제안 응답 형식 설계
- Next.js API route 기반 리포트 요약 흐름
- 사용자가 확인할 수 있는 리포트 요약 모달
- AI 요약 초안을 기존 리포트에 반영하는 검토 흐름
- PostgreSQL/Supabase를 가정한 데이터 구조 문서화

AI Agent는 기존 코드 분석, 기능 요구사항 정리, API 응답 구조 설계, 구현 초안 작성, README 문서화 보조에 활용합니다. 기본 대시보드 UI 구현과 최종 코드 검토는 직접 수행합니다.

## Project Context

헬스케어 대시보드에서 사용자의 상태 변화를 빠르게 파악할 수 있도록, 기존 건강 리포트에 AI 요약과 관리 제안을 추가하는 제품 흐름을 실험합니다.

이 프로젝트는 프론트엔드 화면 구현 경험을 기반으로, AI Agent가 생성한 정보를 실제 사용자가 이해할 수 있는 화면과 API 흐름으로 연결하는 방법을 보여주기 위한 포트폴리오입니다.

## Data Schema

- [Data Schema Draft](./docs/schema.md)

## API

```text
POST /api/reports/summary
```

선택된 Health Report 본문을 입력으로 받아 OpenAI Responses API로 AI 요약, 상태 해석, 관리 제안, 검토 메모를 생성합니다.

응답의 핵심 요약은 아래처럼 카테고리별 줄바꿈 형식으로 생성합니다.

```text
신체: ...
영양: ...
마음: ...
수면: ...
```

OpenAI API key는 클라이언트에 노출하지 않고 서버 런타임 환경에서만 참조합니다.

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

배포 전 OpenAI API key를 서버 런타임 환경에 설정합니다.

## Repository

```bash
git clone https://github.com/42kitrun/board-with-ai-agent.git
```
