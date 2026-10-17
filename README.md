# Edveo Live website

Standalone **Next.js 16 App Router + React 19 + TypeScript** product website. The existing Edveo Laravel and Next.js applications are separate and are not modified by this project.

## Run locally

Use Node.js 20.9 or later. From this directory:

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. For a normal Next.js production deployment, run `npm run build` followed by `npm start`.

`npm run check` runs strict TypeScript checks. `npm run build:export` creates the static marketing release in `out/`, and `npm run check:export` validates its assets, anchors, IDs, and accessibility references. Sites hosting uses this static export; the source is a real Next.js application in either deployment mode.

The default Next.js configuration supports server deployment. Only `build:export` enables static export. Server-dependent features such as authenticated dashboard routes or API handlers should use the normal deployment rather than the exported marketing release.

## Project structure

- `src/app/layout.tsx`: document shell, metadata, and global styles.
- `src/app/page.tsx`: App Router home page.
- `src/components/marketing-content.tsx`: prerendered website content.
- `src/components/`: React components for navigation, tabs, dialogs, drawing, chat, usage, and planning.
- `src/lib/setup-brief.ts`: typed brief generation.
- `public/`: static assets.
- `next.config.ts`: normal Next.js configuration with optional export support.

Browser-only work lives in client components; interactive state and handlers are managed by React. No standalone script injects HTML or attaches document-wide component handlers.

## Included

- Responsive product website with classroom illustration and institute/integration paths.
- Keyboard-accessible tabs, native dialogs, mobile navigation, and FAQs.
- Pointer/touch drawing board and example chat, entirely local to the page.
- Participant-minute workload calculator and downloadable institute setup brief.
- Explicit product-preview and planned-integration disclosures.

## Boundaries

No accounts, live calls, backend integration, customer bookings, pricing, payment collection, or enquiry submissions are connected. The planner does not transmit or persist its inputs. No real student data is included. Google Fonts is the only external page resource; system font fallbacks are provided.

The marketing site does not establish product capacity, recording retention, or production availability. Its classroom/dashboard data is illustrative. Connect real provisioning, authentication, validated live APIs, and an approved commercial/support policy before offering customer signup. There are no backend or database changes in this conversion.

Research and website rationale are in `../documentation/research/2026-10-17-live-classroom-website-research.md`.
