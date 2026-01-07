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
│   ├── components/          # Vue components
│   │   └── Sidebar.vue     # Navigation sidebar
│   ├── views/              # Page views
│   │   ├── Home.vue        # Homepage
│   │   ├── ComponentDetail.vue
│   │   └── PageView.vue
│   ├── router/             # Vue Router configuration
│   │   └── index.js
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point
│   └── style.css           # Global styles
├── server/                 # Backend
│   └── index.js           # Express server
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Framework Reference

All components are built using [PrimeVue v3](https://v3.primevue.org/introduction/) as the base framework.

## License

This documentation is part of the ERP Components Bible design system.
