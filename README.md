# Ticketing Dashboard

A right-to-left (RTL) management dashboard for viewing ticket-related information and configuring the system. The frontend is built with React and TypeScript. During development, sample data is served by a local mock API.

## Features

- Ticket overview cards for total, open, in-progress, and resolved tickets
- Analytics charts, expert performance, and tickets that need action
- Responsive RTL interface with light and dark themes
- Sign-in and sign-up pages
- Basic information management with a data table, pagination, and modal dialogs
- User management page
- Sidebar navigation for ticket, history, support, and settings sections


## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router |
| Server state and local state | TanStack Query, Zustand |
| Tables and forms | TanStack Table, React Hook Form |
| UI and charts | Tailwind CSS, Radix UI, ApexCharts, Hugeicons |
| Mock API | json-server |


## Getting Started

Install the dependencies:

```bash
npm install
```

Run the mock API and the frontend in separate terminals:

```bash
# Terminal 1: starts the mock API at http://localhost:3001
npm run server
```

```bash
# Terminal 2: starts the Vite development server
npm run dev
```

Vite normally serves the application at `http://localhost:5173`. It prints the exact address in the terminal. Keep the mock API running for dashboard statistics and basic-information data to load.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the local mock API from `db.json` on port 3001 |
| `npm run build` | Type-check and create a production build in `dist` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Mock API

[`db.json`](./db.json) is the data source for `json-server`. It currently provides these endpoints:

| Endpoint | Purpose |
| --- | --- |
| `GET /ticketStats` | Dashboard ticket statistics |
| `GET /basicInfoCategories` | Basic-information categories |
| `GET /basicInfoData` | Basic-information records |
| `GET /basicInfoData/:id` | One basic-information record |

To connect a real backend, update the request URLs and service implementations in [`src/services`](./src/services).

## Project Structure

```text
src/
├── assets/       # Fonts and images
├── components/   # Reusable UI components
├── config/       # Application and menu configuration
├── layouts/      # Main layout, header, and sidebar
├── pages/        # Dashboard, tickets, settings, and authentication pages
├── services/     # API requests
├── store/        # Global state, including theme state
├── styles/       # Base styles and Tailwind styles
└── types/        # TypeScript type definitions
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Dashboard |
| `/signin` | Sign in |
| `/signup` | Sign up |
| `/tickets/cartabl` | Task inbox |
| `/tickets/packages` | Support packages |
| `/settings/basics` | Basic information |
| `/settings/users` | User management |
