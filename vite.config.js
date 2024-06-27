import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reactp_swc_vite/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dataservice.accuweather.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
