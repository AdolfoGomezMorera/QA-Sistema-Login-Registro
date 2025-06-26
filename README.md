# QA-Sistema-Login-Registro  

Este repositorio contiene el diseño e implementación de pruebas automatizadas para un sistema de **registro y login de usuarios**, utilizando [Playwright](https://playwright.dev/).

## Estructura del Repositorio  

```
/qa-intern-technical-exam  
│── /docs
│   ├── Test-Plan.md                # Plan de Pruebas
│   ├── Test-Cases.md               # Casos a probar
│   └── Test-Cases-Resultados.md               # Resultados
│── /src  
│   ├── /paginas  
│   │   ├── login.paginas.ts         # POM para la página de login  
│   │   ├── registro.paginas.ts      # POM para la página de registro  
│   │   └── bienvenida.paginas.ts    # POM para la página de post-Login  
│   ├── /tests  
│   │   ├── TC-B.test.ts             # Pruebas de Borrado  
│   │   ├── TC-L.test.ts             # Pruebas de Login  
│   │   ├── TC-V.test.ts             # Validaciones de formularios  
│   │   ├── TC-R.test.ts             # Pruebas de Registro  
│   │   └── TC-S.test.ts             # Pruebas de Seguridad  
│   └── /datos  
│       └── usuarios.ts              # Datos de usuarios para pruebas  
├── playwright.config.ts             # Configuración de Playwright  
└── package.json                     # Dependencias del proyecto  
```

##  Cómo Ejecutar  
1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/AdolfoGomezMorera/QA-Sistema-Login-Registro.git
   ```
2. Instalar dependencias:  
   ```bash
   npm init playwright@latest
   ```
3. Ejecutar pruebas:  
   ```bash
   npx playwright test --project=chromium --reporter=html
   ```
