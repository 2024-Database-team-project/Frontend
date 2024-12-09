import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'My Vite PWA',
                short_name: 'VitePWA',
                description: 'A simple PWA using Vite and React',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/DormitoryIcon.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/DormitoryIcon.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'https://bdb3-58-120-74-156.ngrok-free.app',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
