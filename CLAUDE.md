# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- **Development Server**: `npm run dev`
- **Build Project**: `npm run build`
- **Lint Code**: `npm run lint`
- **Preview Build**: `npm run preview`

## Architecture & Structure
- **Framework**: React SPA powered by Vite.
- **Core Component**: `src/App.jsx` contains the primary portfolio logic, content, and layout.
- **Styling**: Utility-first CSS using Tailwind CSS (v4) and custom glassmorphism effects.
- **Animations**: High-end motion and interactions implemented via `framer-motion`.
- **Entry Point**: `src/main.jsx` handles the root rendering.
- **Assets**: Static images and icons are located in `src/assets/`.

## Project Specifics
- **Design System**: Implements a "Dark Mode Glassmorphism" theme with `slate-950` background and `cyan-400` accents.
- **Data Strategy**: Project and skill data are managed as constants within the component for maximum performance and simplicity (YAGNI).
