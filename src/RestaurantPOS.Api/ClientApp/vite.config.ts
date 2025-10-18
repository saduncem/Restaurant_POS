import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration.  Plugins and additional options can be added as needed.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});