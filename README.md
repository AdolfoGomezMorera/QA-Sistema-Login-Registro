# QA-Sistema-Login-Registro  

Este repositorio contiene diseño e implantación de pruebas auomatizadas, enfocada en un sistema de registro y login de usuarios.  

## Estructura del Repositorio  

```
/qa-intern-technical-exam  
│── /docs
│   ├── Test-Plan.md
│   ├── Test-Cases.md
│   └── Resultados.md
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
