# Board with AI Agent

강의를 참고하며 직접 작성한 Next.js 헬스케어 대시보드 UI를 기반으로, 상담 리포트와 케어 플랜 생성 흐름을 AI Agent 활용 방식으로 확장하는 포트폴리오 프로젝트입니다.

## Live Demo

- Firebase Hosting: https://board-with-ai-agent.web.app

## Overview

이 프로젝트의 기본 대시보드 코드는 Next.js, React, TypeScript 학습 과정에서 직접 구현했습니다. 사용자 정보, 상담 코멘트, 설문 결과, 목표 달성률, 피로도 그래프, 건강 리포트 편집 화면을 컴포넌트 단위로 구성했습니다.

현재 레포는 이 기본 구현을 바탕으로 멘탈 웰니스 서비스에서 필요한 상담 운영 화면, 리포트 요약, 추천 케어 플랜 흐름을 제품 관점에서 확장하기 위한 작업 공간입니다.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- Firebase Hosting

## Implemented Features

- 사용자 기본 정보 대시보드
- 상담 코멘트 목록, 작성, 수정, 삭제 UI
- 설문 결과 시각화
- 목표 달성률 비교 그래프
- 피로도 추이 그래프
- 건강 리포트 조회, 수정, 삭제 UI
- Firebase Hosting 배포 설정

## Current Status

- 기본 대시보드 화면 로컬 확인 완료
- 기존 서비스명과 식별 가능한 더미 개인정보 제거
- Firebase 프로젝트 `board-with-ai-agent` 배포 완료
- AI Agent 기반 리포트 생성 흐름은 점진적으로 추가 예정
- PostgreSQL/Supabase 확장을 가정한 데이터 구조 초안 작성

## AI Agent Extension

기본 UI 구현 위에 AI Agent를 활용한 상담 운영 흐름을 확장합니다.

- 심리/건강 설문 결과를 리포트 입력 데이터로 구조화
- AI 요약, 해석, 추천, 케어 플랜 응답 형식 설계
- Next.js API route 기반 mock 리포트 생성 흐름 추가
- 상담사가 확인할 수 있는 리포트 요약 UI 개선
- PostgreSQL/Supabase를 가정한 데이터 구조 문서화

AI Agent는 기존 코드 분석, 기능 요구사항 정리, API 응답 구조 설계, 구현 초안 작성, README 문서화 보조에 활용합니다. 기본 대시보드 UI 구현과 최종 코드 검토는 직접 수행합니다.

## Project Context

멘탈 웰니스 서비스의 상담 운영 화면을 가정하고, 상담사가 사용자의 상태 변화를 빠르게 파악한 뒤 AI가 생성한 요약과 케어 플랜을 검토할 수 있는 제품 흐름을 실험합니다.

이 프로젝트는 프론트엔드 화면 구현 경험을 기반으로, AI Agent가 생성한 정보를 실제 사용자가 이해할 수 있는 화면과 API 흐름으로 연결하는 방법을 보여주기 위한 포트폴리오입니다.

## Data Schema

- [Data Schema Draft](./docs/schema.md)

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

## Repository

```bash
git clone https://github.com/42kitrun/board-with-ai-agent.git
```
