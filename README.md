# HireBoard — Job Listings App

A small React + TypeScript project built to practice the skills listed in FirstHire's
Associate Frontend Developer requirements: JavaScript/TypeScript fundamentals, React,
working with data (simulated API + filtering), and clean client-side architecture.

## Features
- Simulated API fetch with a loading state (`useEffect` + `setTimeout`)
- Search jobs by title, company, or skill
- Filter by location and job type
- Pagination
- Fully typed with TypeScript (`interface Job`, `interface JobFilters`)
- Component-based architecture: `JobCard`, `SearchFilter`, `Pagination`

## Tech Stack
- React 18
- TypeScript
- Vite (build tool)
- Plain CSS (no framework, to keep styling fundamentals visible)

## Getting Started

You'll need [Node.js](https://nodejs.org/) (v18+) installed on your machine.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed localhost URL in your browser
```

To build for production:
```bash
npm run build
```

## Project Structure
```
src/
  components/
    JobCard.tsx        # Displays a single job listing
    SearchFilter.tsx    # Search input + location/type dropdowns
    Pagination.tsx      # Prev/Next page controls
  data/
    jobs.ts             # Mock job data (stands in for a real API response)
  types/
    job.ts               # TypeScript interfaces (Job, JobFilters)
  App.tsx                # Main component: fetching, filtering, pagination logic
  App.css                # Component styling
  main.tsx               # React entry point
```

## Possible Next Steps (good talking points for interviews)
- Replace mock data with a real API call (e.g. `fetch('/api/jobs')`)
- Add a job detail page using React Router
- Add unit tests with Vitest + React Testing Library
- Add dark mode using CSS variables (already structured as design tokens in `index.css`)
