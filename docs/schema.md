# Data Schema Draft

이 문서는 헬스케어 대시보드를 멘탈 웰니스 상담 운영 흐름으로 확장할 때 사용할 수 있는 PostgreSQL/Supabase 기준 데이터 구조 초안입니다.

현재 앱은 더미 데이터와 mock API로 동작하지만, 실제 제품에서는 `user -> survey response -> AI report -> counselor review -> care plan` 흐름으로 저장될 수 있습니다.

## Core Flow

```text
users
  -> survey_responses
  -> ai_reports
  -> counselor_comments
  -> care_plan_tasks
```

## Tables

### users

상담 대상 사용자 기본 정보를 저장합니다.

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  gender text,
  birth_year integer,
  phone_number text,
  registered_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### survey_responses

신체, 영양, 마음, 수면 등 설문 결과를 저장합니다.

```sql
create table survey_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  answered_at timestamptz not null,
  physical_score integer,
  nutrition_score integer,
  mind_score integer,
  sleep_score integer,
  raw_answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

### health_reports

상담사가 편집하는 리포트 본문을 저장합니다.

```sql
create table health_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  report_date date not null,
  content text not null,
  last_modified_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
```

### ai_reports

AI Agent가 생성한 요약, 해석, 추천 케어 플랜 초안을 저장합니다.

```sql
create table ai_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  health_report_id uuid references health_reports(id) on delete set null,
  source_content text not null,
  summary text not null,
  interpretation text not null,
  care_plan jsonb not null default '[]'::jsonb,
  counselor_note text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  applied_at timestamptz
);
```

### counselor_comments

상담사가 사용자 상태 변화나 상담 메모를 남기는 테이블입니다.

```sql
create table counselor_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  writer_name text not null,
  message text not null,
  written_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### care_plan_tasks

AI 리포트 또는 상담사가 제안한 케어 플랜을 실행 가능한 task 단위로 관리합니다.

```sql
create table care_plan_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  ai_report_id uuid references ai_reports(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'todo',
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
```

### subscriptions

B2C 구독 제품으로 확장할 때 결제/구독 상태를 저장합니다.

```sql
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  plan_name text not null,
  status text not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  created_at timestamptz not null default now()
);
```

## API Mapping

현재 mock API는 아래 흐름을 가정합니다.

```text
POST /api/reports/summary
```

Request:

```json
{
  "content": "health report content"
}
```

Response:

```json
{
  "summary": "핵심 요약",
  "interpretation": "상태 해석",
  "carePlan": ["추천 케어 플랜"],
  "counselorNote": "상담사 확인 메모"
}
```

실제 DB 연동 시에는 `health_reports.content`를 입력으로 사용하고, 생성 결과를 `ai_reports`에 draft 상태로 저장한 뒤 상담사가 검토하여 `health_reports.content`에 반영하는 흐름으로 확장할 수 있습니다.
