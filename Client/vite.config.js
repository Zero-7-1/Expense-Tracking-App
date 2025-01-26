// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://financial-management-app-backend.onrender.com', // Your backend server OR  http://localhost:5001
        changeOrigin: true, // Crucial for CORS
      },
    },
  },
});