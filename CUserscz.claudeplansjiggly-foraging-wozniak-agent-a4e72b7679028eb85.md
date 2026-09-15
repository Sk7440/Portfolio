# Implementation Plan: Modern Developer Portfolio Refactor

## 🎯 Goal
Refactor `src/App.jsx` into a high-converting, modern developer portfolio focused on securing a **React Native Developer Internship**.

## 🎨 Design System (UI/UX Pro Max)
### Theme & Aesthetics
- **Base Background:** `bg-slate-950`
- **Glassmorphism Card:** `bg-slate-900/50 backdrop-blur-md border border-slate-800/50`
- **Accents:** 
  - Primary: `cyan-400` (text/glow)
  - Secondary: `blue-500` (gradients/glow)
  - Gradient: `from-cyan-400 to-blue-500`
- **Typography:** `font-sans` with `tracking-tight` for headings and `leading-relaxed` for body.

### Layout Strategy
- **Fluidity:** Max-width container `max-w-6xl` with responsive padding `px-6`.
- **Responsive Breakpoints:** 
  - Mobile: 375px (single column)
  - Tablet: 768px (2-column grids)
  - Desktop: 1440px (3-column grids where applicable)

## 🛠 Component Structure (`App.jsx`)
The application will be a single-page architecture with the following semantic sections:

1.  **`Navbar`**: 
    - Sticky top, glassmorphic background.
    - Links: About, Skills, Projects, Contact.
2.  **`Hero`**: 
    - Large typography with gradient accent.
    - "Seeking React Native Internship" badge.
    - Social links (GitHub, LinkedIn).
    - Sequential animations.
3.  **`Skills`**: 
    - Category-based grids.
    - **Priority Highlighting:** Dedicated "Mobile Development" section explicitly featuring **React Native** and **Expo** with enhanced glow effects.
4.  **`Projects`**: 
    - Staggered grid of glass cards.
    - Project details: Title, Subtitle, Description, Tech Stack (badges), GitHub Link.
5.  **`EducationObjective`**: 
    - Two-column layout showing the Degree and the Internship Objective.
6.  **`Footer`**: 
    - Simple copyright and "Built with" credit.

## ⚡ Animation System (Framer Motion)

### Variants
```javascript
const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 260, damping: 20 } 
    }
  },
  staggerContainer: {
    visible: { transition: { staggerChildren: 0.1 } }
  },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};
```

### Interaction Logic
- **Hero Section:** sequential fade-in of text elements.
- **Grid Items:** `whileInView` triggering `fadeInUp` with `viewport={{ once: true, margin: "-50px" }}`.
- **Cards/Buttons:** `whileHover="hover"` and `whileTap="tap"`.

## 📊 Data Mapping
- **Identity:** Muhammad Sultan Khalid | Lahore, Pakistan | CS Student.
- **Projects:**
  - **Mart-O:** E-Commerce Mini Web App (React, Router, Tailwind, REST API).
  - **Wanderlust:** Tour Booking Platform (React, Router v6, Context API, Tailwind, LocalStorage).
  - **Spendly:** Personal Finance Dashboard (HTML5, Tailwind, JS, GSAP, LocalStorage).
- **Key Skills:** React Native, Expo, React.js, JavaScript ES6+, React Router, Context API, REST APIs, Tailwind CSS, HTML5, CSS3, Git & GitHub.

## 🛡 Verification Plan
### 1. Responsive Audit
- Check 375px (Mobile): Ensure no horizontal overflow, buttons are touch-friendly.
- Check 768px (Tablet): Verify grid columns transition correctly.
- Check 1440px (Desktop): Ensure content doesn't stretch too wide.

### 2. Accessibility (a11y) Audit
- **Contrast:** Check `cyan-400` on `slate-950` using WCAG AA standards.
- **ARIA:** Ensure all `<a>` tags have descriptive `aria-label` (e.g., "Visit Muhammad's GitHub profile").
- **Keyboard:** Tab through the site to ensure focus states are visible and logical.

### 3. Technical Audit
- **Console:** No warnings/errors in DevTools.
- **Performance:** Check for layout shifts during animations.
- **Links:** Verify `target="_blank" rel="noopener noreferrer"`.

## 🚀 Step-by-Step Execution
1.  **Setup:** Clear `App.jsx` and import `motion` from `framer-motion` and `lucide-react` icons.
2.  **Constants:** Define the `projects` and `skills` data arrays at the top of the file.
3.  **variants:** Implement the Framer Motion variants.
4.  **Navbar & Hero:** Build the high-impact entrance.
5.  **Skills Section:** Build the grid, specifically highlighting React Native/Expo.
6.  **Projects Section:** Implement the staggered glass cards.
7.  **Education/Objective:** Build the bottom layout.
8.  **Footer:** Finalize with a minimalistic footer.
9.  **Polish:** Apply global glassmorphism classes and glow effects.
10. **Verify:** Run the verification plan.
