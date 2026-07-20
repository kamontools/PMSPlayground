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
    Home.vue                  # Component library homepage
    ComponentDetail.vue       # Individual component docs page
    PageView.vue              # Generic page view
    PmsJuDrawer.vue           # Prototype: LivingOS Sentinel notification drawer
    MigratePermissions.vue    # Prototype: permissions migration UX
    RoomPriceQuiz.vue         # Prototype: room pricing quiz
    LosHomepage.vue           # Prototype: LivingOS homepage
  components/
    Sidebar.vue               # Persistent nav sidebar
    examples/                 # Live component examples (Button, Input, Dropdown, etc.)
  router/index.js             # Vue Router config
server/index.js               # Express API server
```

## Routes

| Path | View | Purpose |
|------|------|---------|
| `/` | Home | Component library index |
| `/components/:id` | ComponentDetail | Component docs |
| `/pages/:id` | PageView | Page pattern docs |
| `/prototype/pms-ju-drawer` | PmsJuDrawer | Notification drawer prototype |
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
