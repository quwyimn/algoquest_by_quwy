import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Bất kỳ request nào bắt đầu bằng "/api" sẽ được chuyển tiếp
      '/api': {
        target: 'http://localhost:5135', // Địa chỉ của backend ASP.NET
        changeOrigin: true,
        secure: false,
      },
    },
  },
})