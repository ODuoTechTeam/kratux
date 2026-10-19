# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Build & Dev Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (flat config via `defineConfig` in `eslint.config.mjs`, ESLint 9)

No test runner is configured.

## Tech Stack

- **Next.js 16** (App Router) — read `node_modules/next/dist/docs/` before making changes; APIs differ from earlier versions
- **React 19** with `"use client"` directives
- **Tailwind CSS v4** via `@tailwindcss/postcss` (not v3 — no `tailwind.config.js`)
- **Framer Motion 12** for scroll animations and transitions
- **TypeScript 5** (strict mode, path alias `@/*` → `./src/*`)

## Architecture

This is a **static marketing landing page** for Kratux, a heavy machinery company. There is no backend, no database, no API routes.

### File Structure

All application code lives in `src/app/` (only 3 files):

- **`page.tsx`** — Single monolithic `"use client"` component containing all sections, inline component definitions, and embedded product data. This is the entire site.
- **`layout.tsx`** — Root layout loading two Google Fonts: Barlow Condensed (display) and DM Sans (body). HTML lang is `pt-BR`.
- **`globals.css`** — Tailwind v4 import and design tokens defined via `@theme inline` block. Also defines a noise texture overlay and `fadeInUp` keyframe.

### Design Tokens (globals.css)

Dark theme with orange accent. Key tokens:
- `--color-background: #0C0C0B`, `--color-foreground: #EDEDE8`, `--color-accent: #E75F0D`
- `--color-surface: #141413`, `--color-surface-raised: #1A1A18`
- `--font-display` (Barlow Condensed), `--font-body` (DM Sans)

### Page Sections (in order)

Nav → Hero (parallax) → ProofBar (stats) → Problema → Solucao → Comparativo (table) → Maquinas (tabbed product carousel) → Numeros → Depoimentos (testimonials) → Financiamento → Contato (Google Maps embed) → Footer → WhatsApp (floating button)

Sections alternate between dark background (default theme) and light background (`bg-[#F5F5F0] text-[#1C1C1A]`). Light sections: Problema, Comparativo, Depoimentos, Contato.

### Inline Components Pattern

`page.tsx` defines reusable components inline: `Reveal` (scroll fade-in via `useInView`), `Label` (section header), `Nav`, and each section as a distinct function component. Product data (7 machine categories, ~16 models with specs and PDF links) is embedded as constants inside the `Maquinas` component.

### Static Assets (public/)

Product images and PDF catalogs live in `public/images/` under **Portuguese folder names with accented characters** (e.g., `PÁ CARREGADEIRA/`, `MOTONIVELADORA/`). File paths in code must match these names exactly, including accents and spaces.

## Deployment

Deployed on Vercel. Remote images allowed from `images.unsplash.com` (configured in `next.config.ts`).

## Language

All user-facing content is in **Brazilian Portuguese (pt-BR)**.
