# Restaurant POS Frontend Skeleton

This directory contains a basic frontend skeleton for the Restaurant POS system built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.  The goal of this skeleton is to provide a starting point for developing the user interface during Sprint 2.

## Structure

```
restaurant_pos_frontend/
├── index.html               # Vite entry HTML file
├── package.json             # Defines dependencies and scripts (placeholder)
├── vite.config.ts           # Vite configuration (minimal)
├── tailwind.config.js       # TailwindCSS configuration (placeholder)
├── postcss.config.js        # PostCSS configuration for Tailwind
└── src/
    ├── main.tsx             # Application entry point
    ├── App.tsx              # Root component switching between pages
    ├── index.css            # Global styles (imports Tailwind)
    ├── store/
    │   └── useOrderStore.ts # Zustand store for order state
    └── components/
        ├── TableLayout.tsx  # Displays tables and handles navigation
        ├── OrderScreen.tsx  # Displays current order and menu items
        └── OptionModal.tsx  # Placeholder for future option selection modal
```

### Note

The `package.json` and configuration files are provided as placeholders only.  They illustrate what a typical Vite + Tailwind project might look like but do not include actual package dependencies.  When you integrate this skeleton into your environment, initialise a new Vite project (`npm create vite@latest`) and copy the `src` contents into it.  Then install dependencies such as `react`, `react-dom`, `tailwindcss`, `lucide-react`, `zustand`, and others as needed.

## Running the Project

1. Create a new Vite React project or copy this folder into an existing one.
2. Install the necessary dependencies (`npm install`).  At a minimum you will need:
   - `react`, `react-dom`, `typescript`
   - `tailwindcss`, `postcss`, `autoprefixer`
   - `zustand` for state management
   - `lucide-react` for icons
3. Configure Tailwind by generating a `tailwind.config.js` file and adding the paths to your `src` files.
4. Run the development server with `npm run dev`.

## Next Steps

- Implement additional screens such as Payment, Delivery, Reports, and Settings based on the backend APIs.
- Integrate with real data from the backend (e.g. fetch tables and orders via REST endpoints).
- Add authentication and role‑based routing once the backend is secured.