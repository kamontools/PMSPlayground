# ERP Components Bible - Design System Documentation

Vue.js documentation website with Node.js/Express backend for the ERP Components Bible design system.

## Tech Stack

- **Frontend:** Vue 3 + Vite + Vue Router
- **Backend:** Node.js + Express
- **Styling:** CSS Variables (Design Tokens)

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- **Frontend:** http://localhost:3000 (Vite dev server)
- **Backend API:** http://localhost:3001 (Express server)

### Run Separately

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
.
├── src/
│   ├── components/                    # Vue components
│   │   ├── Sidebar.vue               # Navigation sidebar
│   │   └── examples/                 # Component examples
│   ├── views/                        # Page views
│   │   ├── Home.vue                  # Homepage
│   │   ├── ComponentDetail.vue
│   │   ├── PageView.vue
│   │   ├── PmsJuDrawer.vue           # PMS Notification Center prototype
│   │   ├── pmsJuDrawerStyles.css     # Styles for PmsJuDrawer
│   │   ├── MigratePermissions.vue    # Permissions migration view
│   │   └── RoomPriceQuiz.vue         # Room pricing quiz view
│   ├── router/                       # Vue Router configuration
│   │   └── index.js
│   ├── App.vue                       # Root component
│   ├── main.js                       # Entry point
│   └── style.css                     # Global styles
├── server/                           # Backend
│   └── index.js                     # Express server
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
└── package.json                      # Dependencies
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Search
```
GET /api/search?q=query
```

### Components
```
GET /api/components          # List all components
GET /api/components/:id      # Get component details
```

## Features

- ✅ Vue 3 Composition API
- ✅ Vue Router for navigation
- ✅ Persistent sidebar navigation
- ✅ Alphabetical component listing
- ✅ RESTful API backend
- ✅ Hot Module Replacement (HMR)
- ✅ Design tokens via CSS variables
- ✅ Responsive design

---

## PMS Notification Center — "LivingOS Sentinel" (`PmsJuDrawer.vue`)

A prototype for the AI-powered proactive notification system described in the LivingOS PMS product strategy. The goal is to shift staff from "data entry operators" to "reviewers and decision-makers" by surfacing the right action at the right time.

### ✅ Built

| Feature | Detail |
|---|---|
| Cloud mascot button (น้องลีวิ่ง) | Animated cloud SVG with radial gradient fill, blink animation, pulse rings on important alerts |
| Red dot badge | Appears on the button when there are unread items or important notifications |
| Pulse ring animation | Two staggered rings, starts matching button border-radius and morphs to circle as it fades |
| Proactive tooltip | Dismissible reminder bubble anchored to the button — appears unprompted |
| Notification drawer | Slide-in panel from the right, closes on outside click |
| Highlight carousel | Top-3 priority cards (Amber/Red/Blue) with scrollable carousel + dot pagination |
| Task list | Flat list of notifications with unread state (blue tint + blue dot) |
| Per-task Quick Action CTA | Every row has a colored action button (red / green / amber / blue) |
| Mark as read (single) | Click any task row to mark it read |
| Mark all as read | "อ่านทั้งหมด" button in drawer header |
| Important vs notify grouping | `group: 'important'` triggers pulse rings and badge |

### ❌ Gaps vs. PO Requirements (5-Pillar Framework)

| Gap | Priority | Notes |
|---|---|---|
| Tab filter in drawer | High | Tabs: Action Required / Info / Completed |
| 5-pillar notification type chips | High | Visual label per row: Critical / High / Medium / Low / Info |
| Warning/Anomaly notification type | High | e.g. "ค่าน้ำห้อง A201 สูงผิดปกติ 300%" with distinct red background |
| AI Insight notification type | Medium | e.g. "วันนี้ประหยัดเวลาออกบิลไป 2 ชม." — info/teal style |
| Payment discrepancy alert | Medium | AI suggests reason for mismatched transfer amount |
| N'Living persona in copy | Medium | Friendly Thai AI voice: "น้องลีวิ่งเตรียมไว้ให้แล้วนะคะ" |
| N'Living branding in drawer header | Low | Mascot avatar or name next to "การแจ้งเตือน" title |
| Smart Snooze per notification | Medium | "เตือนอีกครั้ง 1 ชม." per-row option |
| Bulk delete | Low | Alongside existing bulk mark-as-read |
| Financial vs general row distinction | Medium | Different background color for financial notifications |
| Deep linking (action buttons) | High | CTAs must navigate to the actual module page |

### Reference
PO strategy document: "LivingOS Sentinel — AI-Powered Co-Pilot" (shared in project chat)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Framework Reference

All components are built using [PrimeVue v3](https://v3.primevue.org/introduction/) as the base framework.

## License

This documentation is part of the ERP Components Bible design system.
# PMSPlayground
