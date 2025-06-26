// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testMatch: '**/*.test.ts', // Coincide con todos los archivos de prueba
  testDir: './src/tests',    // Directorio donde están las pruebas
  timeout: 180000,           // Tiempo máximo por prueba (ms)
  retries: 0,                // Número de reintentos por prueba fallida
  workers: 1,                // Número de procesos paralelos
  reporter: [
    ['list'], // Reporte en consola
    ['html', { open: 'never' }], // Reporte HTML (no se abre automáticamente)
    ['json', { outputFile: 'test-results/results.json' }] // Reporte JSON
  ],
  use: {
    baseURL: 'https://globalsqa.com/angularJs-protractor/registration-login-example/#', // URL base para las pruebas
    headless: true, // Ejecuta en modo headless
    actionTimeout: 45000, // Timeout para acciones individuales
    navigationTimeout: 60000, // Timeout específico para navegación
    viewport: { width: 1280, height: 720 }, // Resolución de la ventana del navegador
    screenshot: 'only-on-failure',            // Toma capturas de pantalla en cada prueba
    video: 'retain-on-failure',                 // Graba video de cada prueba
    trace: 'retain-on-failure',  // Guarda trazas solo si la prueba falla
  },
  expect: {
    toHaveScreenshot: { threshold: 0.2, maxDiffPixels: 100 } // Configuración de tolerancia para comparación de screenshots
  },
  projects: [
    {
      name: 'chromium', // Proyecto para el navegador Chromium
      use: { browserName: 'chromium' },
    },
  ],
};

export default config;