import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'wp-timesheet-plugin/assets',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'timesheet-app.js',
        assetFileNames: 'timesheet-app.css',
      },
    },
    lib: {
      entry: 'src/main.tsx',
      name: 'TimesheetApp',
      formats: ['iife'],
    },
  },
})