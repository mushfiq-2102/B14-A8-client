# HandInHand

A community-driven platform where people create, join and track social service events in their local area, from winter clothes distributions in Mirpur 10 to blanket drives in Mohammadpur.

**Live site:** https://your-handinhand-site.vercel.app *(replace with your deployed URL)*
**Server repository:** *(add your server repo link)*

## Features

- **Email/password and Google login** powered by Better Auth, with password validation (uppercase, lowercase, 6+ characters) and toast feedback.
- **Create events** with title, type, location, thumbnail and a future-only date; every event stores its creator's email.
- **Upcoming Events** page that only lists events that have not yet passed, with a detailed public view page for each one.
- **Join Event** in one click (login required). Joined events are saved to the database and shown, sorted by date, on the Joined Events page.
- **Manage Events** lets users edit or delete only the events they created, enforced by JWT-protected API routes.
- **Light / dark theme toggle** across the whole app, a fully responsive layout, loading skeletons, and a profile page to update your name and photo.

## Tech Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (Base UI), Better Auth + MongoDB adapter + JWT, Express.js and MongoDB on the server.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Gallery photos are free-to-use Unsplash images (edit them in `src/components/home/gallery.tsx`).
