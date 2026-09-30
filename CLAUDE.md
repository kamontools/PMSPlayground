# PMSPlayground

A Vue 3 documentation and prototyping playground for the **ERP Components Bible** — a design system for LivingOS PMS (Property Management System). Used to document UI components, prototype new features, and explore UX patterns before production.

## Tech Stack

- **Frontend:** Vue 3 + Vite + Vue Router
- **Backend:** Node.js + Express (API server)
- **Styling:** CSS Variables (design tokens), no CSS framework
- **UI Reference:** PrimeVue v3 (component base)
- **Deploy:** Vercel

## Dev Commands

```bash
npm run dev          # frontend (port 3000) + backend (port 3001) concurrently
npm run dev:frontend # Vite only
npm run dev:backend  # Express only
npm run build        # production build
```

## Project Structure

```
src/
  views/             # Page-level Vue components
    Home.vue                       # Component library homepage
    ComponentDetail.vue            # Individual component docs page
    PageView.vue                   # Generic page view
    PmsJuDrawer.vue                # Prototype: LivingOS Sentinel notification drawer
    MigratePermissions.vue         # Prototype: permissions migration UX
    RoomPriceQuiz.vue              # Prototype: room pricing quiz
    LosHomepage.vue                # Prototype: LivingOS marketing homepage (currently unrouted)
    PmsCloneTool.vue               # Prototype: new-project setup, incl. clone-from-existing-project
    PmsSidebarDemo.vue             # Prototype: sidebar collapse/expand behavior demo
    CheckTemplateSwitcher.vue      # Prototype: cheque template editor/switcher
    AutoGlReceiptPosting.vue       # Prototype: auto GL receipt-posting settings
    PmsSelfServiceOnboarding.vue   # Prototype: self-service onboarding brief/PRD page
    AdvancePaymentDemo.vue         # Prototype: เงินทดรองจ่าย advance payment (request → clearing)
    SelfOnboardWizard.vue          # Prototype: self-onboard wizard shell (sidebar + topbar + views)
    self-onboard/                 # Self-onboard wizard sub-components
      SsoWelcomeDialog.vue        # 3-step welcome/intro dialog (welcome, PMS overview mindmap, start/demo)
      SsoSetup.vue                # Step-by-step project setup (general/AR/GL/AP + go-live review)
      SsoHome.vue                 # PMS home dashboard (shown once a project is live)
      SsoAccountPicker.vue        # Account/project picker used within setup
      store.js                    # Shared reactive state + validators for the wizard
      wizard.css                  # Shared styles for the self-onboard components
  components/
    Sidebar.vue                   # Persistent nav sidebar
    examples/                     # Live component examples (Button, Input, Dropdown, etc.)
  router/index.js                 # Vue Router config
server/index.js                   # Express API server
```

## Routes

| Path | View | Purpose |
|------|------|---------|
| `/` | Home | Component library index |
| `/components/:id` | ComponentDetail | Component docs |
| `/pages/:id` | PageView | Page pattern docs |
| `/prototype/pms-ju-drawer` | PmsJuDrawer | Notification drawer prototype |
| `/prototype/check-template-switcher` | CheckTemplateSwitcher | Cheque template editor/switcher |
| `/prototype/auto-gl-receipt-posting` | AutoGlReceiptPosting | Auto GL receipt-posting settings |
| `/prototype/self-service-onboarding` | PmsSelfServiceOnboarding | Self-service onboarding brief/PRD |
| `/prototype/self-onboard-wizard` | SelfOnboardWizard | Self-onboard wizard (setup + home dashboard) |
| `/prototype/pms-clone-tool` | PmsCloneTool | New-project setup / clone-from-existing |
| `/prototype/pms-sidebar-demo` | PmsSidebarDemo | Sidebar behavior demo |
| `/prototype/advance-payment` | AdvancePaymentDemo | เงินทดรองจ่าย request → clearing flow |
| `/prototype/advance-payment-v2` | AdvancePaymentDemoV2 | เงินทดรองจ่าย alt version: status filters + inline status change, 2-section layout |
| `/prototype/advance-payment-v3` | AdvancePaymentDemoV3 | v2 + 3-step workflow guide: three.js step scene (`advance-payment-v3/`), live checklists |
| `/migrate-permissions` | MigratePermissions | Permissions migration prototype |
| `/room-price-quiz` | RoomPriceQuiz | Room price quiz prototype |

## API Endpoints (port 3001)

- `GET /api/health` — health check
- `GET /api/search?q=query` — search components
- `GET /api/components` — list all components
- `GET /api/components/:id` — single component detail

## Design System

Design tokens live as CSS variables in `src/style.css`. Key colors:
- Primary: `#1C70F7`
- Error: `#F03737`
- Success: `#05A861`
- Attention: `#EE9F00`

Full token reference in `DESIGN_SYSTEM.md`. Figma source: `A00-ERP-Components-Bible`.

## Active Prototypes

### PmsJuDrawer — LivingOS Sentinel
AI-powered notification center prototype. Shifts PMS staff from data-entry to decision-making by surfacing prioritized actions. Key built features: animated cloud mascot (น้องลีวิ่ง), slide-in drawer, highlight carousel, task list with quick-action CTAs, mark-as-read.

Notable gaps vs. PO requirements: tab filters, 5-pillar severity chips, deep-linked CTA navigation, smart snooze. See `README.md` for full gap table.

### SelfOnboardWizard — self-onboard setup + home dashboard
Lets a project set itself up without CS: a 3-step welcome dialog (product intro, an animated AR/AP/GL data-flow mindmap, start-real-vs-demo choice), a step-by-step setup flow (general info → AR → GL → AP → go-live review) with autosave to `localStorage`, and a PMS home dashboard (`SsoHome.vue`, modeled on the live product's หน้าหลัก) shown once the project goes live. Shared state, section metadata and validators live in `self-onboard/store.js`.
