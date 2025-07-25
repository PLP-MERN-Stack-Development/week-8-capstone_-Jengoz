import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ Import Tailwind Vite plugin

export default defineConfig({
  plugins: [react(), tailwindcss()], // ✅ Include Tailwind plugin
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true,
        // THIS IS THE CRUCIAL CHANGE: Remove '/api' from the path when forwarding to backend
        rewrite: (path) => path.replace(/^\/api/, ''), //  <-- THIS LINE IS UPDATED
      },
    },
  },
});