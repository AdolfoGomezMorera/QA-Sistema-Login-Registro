# QA-Sistema-Login-Registro  

Este repositorio contiene el diseño e implementación de pruebas automatizadas para un sistema de **registro y login de usuarios**, utilizando [Playwright](https://playwright.dev/).

---

## Estructura del Repositorio  

```
/QA-Sistema-Login-Registro
│── /docs
│   ├── Test-Plan.md                  # Plan de pruebas
│   ├── Test-Cases.md                 # Casos de prueba
│   └── Test-Cases-Resultados.md      # Resultados obtenidos
│
│── /src
│   ├── /paginas                      # POM
│   │   ├── login.paginas.ts            # Login 
│   │   ├── registro.paginas.ts         # Registro
│   │   └── bienvenida.paginas.ts       # Post-Login
│   │
│   ├── /tests                       # Casos de prueba automatizados
│   │   ├── TC-B.test.ts                # Pruebas de borrado
│   │   ├── TC-L.test.ts                # Pruebas de login
│   │   ├── TC-V.test.ts                # Validaciones de formularios
│   │   ├── TC-R.test.ts                # Pruebas de registro
│   │   └── TC-S.test.ts                # Pruebas de seguridad
│   │
│   └── /datos
│       └── usuarios.ts              # Datos de entrada para pruebas
│
├── playwright.config.ts             
├── package.json                     
└── .github/workflows/playwright.yml

````

---

##  Cómo Ejecutar  

###  Desde el ordenador local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AdolfoGomezMorera/QA-Sistema-Login-Registro.git
   cd QA-Sistema-Login-Registro
    ```

2. Instala las dependencias:

   ```bash
   npm init playwright@latest
   ```

3. Ejecuta las pruebas:

   ```bash
   npx playwright test
   ```

4. Visualiza el reporte HTML:

   ```bash
   npx playwright show-report
   ```

---

### Con GitHub Actions

1. Ve a la pestaña **"Actions"** en tu repositorio.
2. Selecciona el workflow llamado `Playwright Tests`.
3. Haz clic en **"Run workflow"** (si tienes `workflow_dispatch` habilitado).

---