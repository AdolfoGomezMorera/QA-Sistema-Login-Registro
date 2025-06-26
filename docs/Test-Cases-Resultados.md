# Reporte de Ejecución - Sistema de Registro y Login

## Fecha de Ejecución: 25/06/2025

* [Resumen Pruebas](#resumen-pruebas)

* [Detalle por Caso de Prueba](#detalle-por-caso-de-prueba)

  * [1. Registro de Usuario](#1-registro-de-usuario)
  * [2. Login de Usuario](#2-login-de-usuario)
  * [3. Borrado de Usuario](#3-borrado-de-usuario)
  * [4. Validaciones de Formulario](#4-validaciones-de-formulario)
  * [5. Seguridad Básica](#5-seguridad-básica)
  * [6. Flujo Completo](#6-flujo-completo)

* [Riesgos de Seguridad Identificados](#riesgos-de-seguridad-identificados)

  * [1. Falta de sanitización en campos de entrada](#1-falta-de-sanitización-en-campos-de-entrada)
  * [2. Ausencia de restricciones de longitud en campos críticos](#2-ausencia-de-restricciones-de-longitud-en-campos-críticos)
  * [3. Contraseñas sin requisitos de seguridad](#3-contraseñas-sin-requisitos-de-seguridad)
  * [4. Gestión insegura de sesiones y privilegios](#4-gestión-insegura-de-sesiones-y-privilegios)

---

## Resumen Pruebas

* Total de casos ejecutados: 15
* Casos exitosos: 10 (66.7%)
* Casos fallidos: 5 (33.3%)

## Detalle por Caso de Prueba

### 1. Registro de Usuario

| ID     | Descripción         | Resultado (Pass/Fail) | Observaciones                                                          |
| ------ | ------------------- | --------------------- | ---------------------------------------------------------------------- |
| TC-R01 | Registro exitoso    | Pass                  | Usuario creado correctamente, redirige a login                         |
| TC-R02 | Campos obligatorios | Pass                  | Todos los campos deben estar rellenos para habilitar el botón Registro |
| TC-R03 | Username existente  | Pass                  | Muestra mensaje: "Username "\[NombreUsuario]" is already taken"        |
| TC-R04 | Cancelar Registro   | Pass                  | Se vuelve a la pantalla de Login                                       |

### 2. Login de Usuario

| ID     | Descripción            | Resultado (Pass/Fail) | Observaciones                                                                      |
| ------ | ---------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| TC-L01 | Login exitoso          | Pass                  | Login exitoso y mensaje de bienvenida. Se muestran todos los usuarios registrados. |
| TC-L02 | Credenciales inválidas | Pass                  | Muestra mensaje: "Username or password is incorrect"                               |
| TC-L03 | Campos vacíos          | Pass                  | El botón "Login" no se habilita                                                    |
| TC-L04 | Redirección a Registro | Pass                  | Se accede a la pantalla de Registro                                                |

### 3. Borrado de Usuario

| ID     | Descripción           | Resultado (Pass/Fail) | Observaciones                                                                                               |
| ------ | --------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| TC-B01 | Borrar usuario propio | Pass                  | Se permite borrar usuario. Sin embargo, eliminar la cuenta activa no redirige a login |
| TC-B02 | Borrar usuario ajeno  | Fail                  | Se permite borrar usuarios ajenos sin restricciones                                                         |

### 4. Validaciones de Formulario

| ID     | Campo               | Resultado (Pass/Fail) | Observaciones                                                                 |
| ------ | ------------------- | --------------------- | ----------------------------------------------------------------------------- |
| TC-V01 | First Name          | Fail                  | No hay restricción de caracteres (permite caracteres especiales y muy largos) |
| TC-V02 | Password o Username | Fail                  | No hay mensajes de complejidad ni validaciones de seguridad                   |
| TC-V03 | Password o Username | Pass                  | Permite caracteres especiales                                                 |

### 5. Seguridad Básica

| ID     | Descripción                     | Resultado (Pass/Fail) | Observaciones                                                                                                                 |
| ------ | ------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| TC-S01 | Protección contra XSS           | Fail                  | Se permite registro con payloads XSS, pero login bloquea acceso si usuario no existe. No hay sanitización ni escape en inputs |
| TC-S02 | Protección contra SQL Injection | Fail                  | Se permite registro con payloads SQL, pero login bloquea acceso si usuario no existe. No hay validación ni escape en inputs   |

### 6. Flujo Completo

| ID     | Descripción                        | Resultado (Pass/Fail) | Observaciones                                                   |
| ------ | ---------------------------------- | --------------------- | --------------------------------------------------------------- |
| TC-F01 | Registro → Login → Borrado → Login | Pass                  | Flujo funcional, aunque con fallos de seguridad como se detalla |

---

### **Riesgos de Seguridad Identificados**

#### 1. Falta de sanitización en campos de entrada

* **Descripción**: Campos como **First Name**, **Last Name** y **Username** aceptan caracteres especiales sin ningún tipo de sanitización o escape.
* **Casos Relacionados**: `TC-V01`, `TC-S01`, `TC-S02`
* **Riesgos Potenciales**:

  * Inyección XSS: Posibilidad de ejecutar código malicioso en el navegador de otros usuarios.
  * Corrupción de la interfaz o fuga de datos al no escaparse correctamente caracteres especiales.

#### 2. Ausencia de restricciones de longitud en campos críticos

* **Descripción**: No existen límites máximos de longitud en campos como **Username** y **Password**.
* **Casos Relacionados**: `TC-V01`
* **Riesgos Potenciales**:

  * Ataques DoS mediante envío de cadenas extremadamente largas.
  * Problemas en almacenamiento o procesamiento por exceso de datos.

#### 3. Contraseñas sin requisitos de seguridad

* **Descripción**: Se permiten contraseñas débiles o simples sin comprobación de complejidad mínima.
* **Casos Relacionados**: `TC-V02`
* **Riesgos Potenciales**:

  * Vulnerabilidad ante ataques de fuerza bruta o diccionario.
  * Posible compromiso de cuentas.

#### 4. Gestión insegura de sesiones y privilegios

* **Descripción**:

  * Usuarios pueden borrar cualquier cuenta sin control de permisos.
  * Al borrar la cuenta activa, la sesión permanece activa y no redirige a login.
* **Casos Relacionados**: `TC-B01`, `TC-B02`
* **Riesgos Potenciales**:

  * Escalada de privilegios y acceso no autorizado.
  * Persistencia de sesión insegura y exposición de datos.

---