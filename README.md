<div align="center">

# Baivax

### A nanovaccine designer — molecule viewer & design dashboard

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-Radix-000000?style=for-the-badge&logo=radixui&logoColor=white" />
</p>

</div>

---

## 📖 About

**Baivax** is a web app **concept prototype** that imagines what a workspace for designing
nanovaccines might look and feel like. It pairs an animated 3D molecule viewer with a
project-oriented design dashboard, wrapped in a polished, modern UI.

> [!IMPORTANT]
> Baivax is a **UI / design prototype only**. It does **not** model, simulate, validate, or
> design real vaccines, and it is **not** a scientific, clinical, or medical tool. Nothing in
> this project should be used for research, diagnosis, or treatment decisions. The visuals are
> illustrative and are not based on validated biological data.

## ✨ Concept / What It Explores

The project is an exploration of the *experience* of a nanovaccine design platform:

- How a design workflow could be organized into **projects**, each with its own history.
- How a **3D molecular visual** could anchor an otherwise form-heavy interface.
- How a dashboard, library, team, and settings could fit together as a coherent product shell.

It is a front-end concept — a design study — rather than a working scientific application.

## 🧩 Features

What the UI actually includes today:

- **🧬 Molecule viewer** — an interactive, auto-rotating 3D double-helix rendered with
  `three.js` via React Three Fiber and `drei`. It is a stylized, decorative visualization, not a
  structural representation of any specific molecule.
- **📊 Design dashboard** — a project dashboard with summary stat cards, project cards, and
  create/browse flows, built on a reusable dashboard layout (navbar, sidebar, footer).
- **🗂️ App shell & pages** — landing, authentication, new-project, project detail, project
  history, library, team, settings, and documentation routes wired with React Router.
- **🌐 Internationalization scaffold** — a lightweight language context for localized strings.
- **🎨 Full component set** — a complete `shadcn/ui` library (Radix primitives) plus charts
  (Recharts), motion (Framer Motion), toasts, and form handling (React Hook Form + Zod).

## 🖼️ Screenshots

<!-- Add screenshots or a short demo GIF here, e.g. the dashboard and the 3D molecule viewer. -->
<!-- ![Dashboard](docs/dashboard.png) -->
<!-- ![Molecule viewer](docs/molecule-viewer.png) -->

_Screenshots coming soon._

## 🛠️ Tech Stack

| Area        | Tools                                                             |
| ----------- | ----------------------------------------------------------------- |
| Framework   | React + React Router                                              |
| Build tool  | Vite                                                              |
| Language    | TypeScript                                                        |
| Styling     | Tailwind CSS, `tailwindcss-animate`                               |
| UI          | shadcn/ui (Radix UI primitives), Lucide icons                     |
| 3D          | three.js, @react-three/fiber, @react-three/drei                   |
| Data viz    | Recharts                                                          |
| Motion      | Framer Motion                                                     |
| Forms       | React Hook Form, Zod                                              |
| Platform    | Blink SDK (`@blinkdotnew/sdk`) for auth and data                  |

## 🚀 Getting Started

> Requires [Node.js](https://nodejs.org/) 18+ and a package manager (npm, pnpm, or bun).

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd baivax-nanovaccine-designer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

**Other scripts:**

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint      # Type-check, lint JS/CSS, and verify CSS tokens
```

> [!NOTE]
> Auth and data features use the Blink SDK and expect environment values in a `.env.local`
> file. Without them, those parts of the UI may not be fully functional.

## 📌 Status

🧪 **Concept prototype — work in progress.**

Baivax was **AI-scaffolded with [Blink](https://blink.new)** and then extended by hand. It is a
design/UI concept, not a production or validated scientific product. Interfaces, copy, and
features are experimental and may change or be incomplete.

## 📄 License

Released under the [MIT License](LICENSE). © 2026 Alan Bai.
