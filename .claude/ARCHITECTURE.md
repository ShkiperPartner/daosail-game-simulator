# ARCHITECTURE — DAOsail Simulator

*System Architecture and Technical Design*
*Last Updated: 2025-12-28*

---

## System Overview

**DAOsail Simulator** — браузерная обучающая игра для изучения правил расхождения яхт (COLREGs/RRS).

**Architecture Pattern:** Client-side MVC with planned backend API
**Current Stage:** Client-only MVP → Hybrid (client + backend) → Full-stack

---

## Tech Stack

### Current (MVP - Этап 1)

**Frontend:**
- **Engine:** Phaser.js 3.80.1 (2D game framework)
- **Language:** Vanilla JavaScript (ES6+)
- **Rendering:** HTML5 Canvas API
- **Hosting:** Static hosting (Vercel/GitHub Pages)

**Development:**
- Build: None (CDN-based для MVP)
- Version Control: Git + GitHub
- Deployment: Manual push to Vercel

### Planned (Этап 3+)

**Backend:**
- **Runtime:** Node.js (LTS)
- **Framework:** Express.js
- **API:** RESTful endpoints
- **LLM:** OpenAI GPT API (gpt-4-turbo)

**Infrastructure:**
- **Hosting:** Vercel (frontend + serverless functions)
- **Caching:** In-memory / Redis (для GPT responses)
- **CI/CD:** GitHub Actions

---

## Frontend Architecture

### Scene Management (Phaser)

```
┌─────────────────────────────────────┐
│         Phaser Game Instance        │
│         (800x600 Canvas)            │
└─────────────────────────────────────┘
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
┌──────────┐ ┌─────────┐ ┌──────────────┐
│BootScene │→│MenuScene│→│ScenarioScene │
│(Loading) │ │(Start)  │ │(Gameplay)    │
└──────────┘ └─────────┘ └──────────────┘
```

**BootScene:**
- Minimal initialization
- Transition to Menu

**MenuScene:**
- Scenario selection
- Navigation to gameplay

**ScenarioScene:**
- Render boats, wind, UI
- Handle user input (action selection)
- Evaluate answer against rules
- Display feedback (verdict + explanation)

### Data Flow (Current)

```
User Action
    ↓
ScenarioScene (event handler)
    ↓
evaluateScenario(scenario, action)
    ↓
Check answer against scenario.answer
    ↓
Display result (correct/incorrect + explanation)
```

### Scenario Data Structure

```json
{
  "id": "s001",
  "title": "Встречный курс парусников",
  "rule": "COLREGs 12",
  "goal": "Определить верное действие для судна А",
  "initial": {
    "boats": [
      {
        "id": "А (ВЫ)",
        "course": 0,
        "isPlayer": true,
        "x": 200,
        "y": 300
      },
      {
        "id": "B",
        "course": 180,
        "isPlayer": false,
        "x": 600,
        "y": 300
      }
    ],
    "wind": {
      "direction": 45,
      "strength": 10
    }
  },
  "options": [
    "Лечь правее",
    "Лечь левее",
    "Сохранить курс"
  ],
  "answer": 0,
  "explain": "Правильно! У вашего судна А ветер дует слева (левый галс)...",
  "refs": ["COLREGs §12"]
}
```

---

## Planned Backend Architecture (Этап 3)

### API Endpoints

**GET /scenarios/:id**
- Returns scenario JSON
- Cached for static scenarios
- Response time: <100ms

**POST /eval**
- Input: `{ scenarioId, userAction, freeText? }`
- Output: `{ correct: boolean, explanation: string, rule: string }`
- GPT integration for free-text validation

**GET /scenarios**
- List all available scenarios
- Filterable by rule, difficulty

### LLM Integration

**Prompt Template:**
```
Context: Maritime collision avoidance rules (COLREGs)
Stop-facts: [Relevant rule citations]
Task: Evaluate user action in scenario
Format: JSON { correct, explanation, rule }
```

**Workflow:**
```
User Answer
    ↓
POST /eval → Express Route
    ↓
Check cache (Redis)
    ↓ (miss)
Build GPT prompt with stop-facts
    ↓
OpenAI API call
    ↓
Validate JSON response
    ↓
Cache result → Return to client
```

---

## Directory Structure

### Current (MVP)

```
DAOsail_Simulator/
├── public/
│   ├── index.html          # Entry point
│   └── main.js             # All game logic (3 scenes)
├── .claude/                # Framework metafiles
│   ├── SNAPSHOT.md
│   ├── BACKLOG.md
│   ├── ROADMAP.md
│   ├── IDEAS.md
│   └── ARCHITECTURE.md
├── DAOsail_Simulator_KB_v1.md
├── DAOsail_Simulator_Assistant_Guide_v1.md
├── Project_Architecture_Overview.md
└── README.md
```

### Planned (Этап 2)

```
DAOsail_Simulator/
├── src/
│   ├── main.js             # Phaser config
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── MenuScene.js
│   │   ├── ScenarioScene.js
│   │   └── QuizScene.js
│   ├── logic/
│   │   └── evaluateScenario.js
│   ├── data/
│   │   └── scenarios/
│   │       ├── colregs-12.json
│   │       ├── colregs-13.json
│   │       └── ...
│   └── ui/
│       └── components.js
├── public/                 # Build output
└── tests/                  # Unit tests
```

### Planned (Этап 3 - Backend)

```
+ server/
    ├── index.js            # Express app
    ├── routes/
    │   ├── scenarios.js    # GET /scenarios
    │   └── eval.js         # POST /eval
    ├── llm/
    │   ├── promptBuilder.js
    │   └── cache.js
    └── middleware/
        └── validate.js
```

---

## Data Management

### Storage Strategy

**Client-side (MVP):**
- Scenarios: Embedded in code → JSON files (Этап 2)
- User progress: localStorage

**Backend (Этап 3):**
- Scenarios: File system / Database
- GPT cache: Redis (TTL: 7 days)
- Analytics: Log files → Analytics service

---

## Performance Requirements

### Load Time

- **Initial page load:** <2 seconds
- **Scene transition:** <500ms
- **Scenario load:** <200ms (from JSON)

### Runtime

- **FPS:** Stable 60 FPS (desktop), 30 FPS (mobile)
- **Memory:** <100MB (browser process)
- **Bundle size:** <5MB (без 3D assets)

### API (Этап 3)

- **GET /scenarios/:id:** p95 <100ms
- **POST /eval:** p95 <500ms (with GPT)
- **POST /eval (cached):** p95 <50ms

---

## Security & Privacy

### Current (MVP)

- No user data collection
- No authentication required
- Static content only

### Planned (Этап 3)

- **API rate limiting:** 100 req/min per IP
- **Input validation:** JSON schema validation
- **GPT safety:** Content filtering, cost limits
- **Analytics:** No PII collection, anonymized events

---

## Testing Strategy

### Current

- Manual testing in browser
- Visual verification of scenarios

### Planned

**Unit Tests:**
- `evaluateScenario()` logic (Jest)
- Data validation functions
- Coverage: >80%

**E2E Tests:**
- Scenario flow (Playwright/Cypress)
- User interactions
- Critical paths

**Performance Tests:**
- Lighthouse CI (score >90)
- Load testing (k6) for backend

---

## Deployment

### Current

- Manual git push
- Vercel auto-deploy from `main`
- Preview deploys for PRs

### Planned (CI/CD)

**GitHub Actions Workflow:**
```
Push to main
  → Lint (ESLint)
  → Unit Tests (Jest)
  → Build (webpack/vite)
  → E2E Tests (Playwright)
  → Deploy to Vercel
```

---

## Technical Debt & TODOs

- [ ] Module bundler setup (Webpack/Vite) для Этап 2
- [ ] ESLint configuration
- [ ] Unit tests для logic/evaluateScenario
- [ ] TypeScript migration (опционально, v2.0+)
- [ ] Service Worker для offline mode (Этап 4)

---

## References

- Phaser 3 Docs: https://photonstorm.github.io/phaser3-docs/
- COLREGs: International Regulations for Preventing Collisions at Sea
- Project KB: `DAOsail_Simulator_KB_v1.md`
