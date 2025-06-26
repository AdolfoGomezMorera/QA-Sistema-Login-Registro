# Test Cases - Sistema de Registro y Login

* [1. Registro de Usuario](#1-registro-de-usuario)
* [2. Login de Usuario](#2-login-de-usuario)
* [3. Borrado de Usuario](#3-borrado-de-usuario)
* [4. Validaciones de Formulario](#4-validaciones-de-formulario)
* [5. Flujo Completo](#5-flujo-completo)
* [6. Seguridad Básica](#6-seguridad-básica)

## 1. Registro de Usuario

| ID     | Descripción         | Precondiciones        | Pasos                                                         | Resultado Esperado                          |
| ------ | ------------------- | --------------------- | ------------------------------------------------------------- | ------------------------------------------- |
| TC-R01 | Registro exitoso    | Usuario no registrado | 1. Completar todos los campos válidos<br>2. Click en Register | Mensaje de éxito, redirige a login          |
| TC-R02 | Campos obligatorios | -                     | 1. Dejar un campo vacío<br>2. Click en Register               | Registro no permitido, mensaje de error     |
| TC-R03 | Username existente  | Usuario "test" existe | 1. Usar username "test"<br>2. Completar otros campos          | Mensaje: "Username 'test' is already taken" |
| TC-R04 | Cancelar Registro   | -                     | 1. Pulsar botón "Cancel"                                      | Volver a pantalla de Login                  |

## 2. Login de Usuario

| ID     | Descripción            | Precondiciones     | Pasos                                                                | Resultado Esperado                                                 |
| ------ | ---------------------- | ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| TC-L01 | Login exitoso          | Usuario registrado | 1. Ingresar credenciales válidas<br>2. Click en Login                | Login exitoso y mensaje de bienvenida. Muestra listado de usuarios |
| TC-L02 | Credenciales inválidas | -                  | 1. Ingresar un campo correcto y otro incorrecto<br>2. Click en Login | Login no permitido y mensaje "Username or password is incorrect"   |
| TC-L03 | Campos vacíos          | -                  | 1. Dejar un campo vacío<br>2. Intentar Click en Login                | Botón "Login" no se habilita                                       |
| TC-L04 | Redirección a Registro | -                  | 1. Click en botón para Registro                             | Se accede a la pantalla de Registro                                |

## 3. Borrado de Usuario

| ID     | Descripción                   | Precondiciones                   | Pasos                                                      | Resultado Esperado                                            |
| ------ | ----------------------------- | -------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| TC-B01 | Borrar usuario propio         | Usuario logueado                 | 1. Seleccionar opción borrar cuenta propia<br>2. Confirmar | Cuenta eliminada; sesión invalidada y redirección a login     |
| TC-B02 | Intentar borrar usuario ajeno | Usuario logueado sin privilegios | 1. Intentar borrar usuario diferente<br>2. Confirmar       | Operación no permitida; mensaje de error y sin borrar usuario |

## 4. Validaciones de Formulario

| ID     | Descripción                           | Resultado Esperado                                                                                  |
| ------ | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| TC-V01 | Restricción de longitud en campos     | Mensaje de error si el campo excede límite definido                                                 |
| TC-V02 | Requisitos de complejidad en password | Mensaje solicitando más complejidad (mínimo 8 caracteres, mezcla de mayúsculas, números y símbolos) |
| TC-V03 | Permitir caracteres especiales        | Caracteres especiales permitidos para aumentar complejidad                                          |

## 5. Seguridad Básica

| ID     | Descripción              | Pasos                                                                         | Resultado Esperado                                                              |
| ------ | ------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| TC-S01 | Prevención de XSS        | 1. Ingresar `<script>alert(1)</script>` en algun campo<br>2. Enviar formulario | Entrada sanitizada; script no ejecutado y mensaje de error o limpieza del input |
| TC-S02 | Prevención SQL Injection | 1. Ingresar `' OR '1'='1` en campo login<br>2. Enviar formulario              | Entrada sanitizada; login no permitido                                          |

## 6. Flujo Completo

| ID     | Descripción                       | Pasos                                                                                                                             | Resultado Esperado                       |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| TC-F01 | Registro → Login → Borrar → Login | 1. Registrar nuevo usuario<br>2. Iniciar sesión con ese usuario<br>3. Borrar cuenta<br>4. Intentar login con el usuario eliminado | No se permite login; usuario inexistente |

---
