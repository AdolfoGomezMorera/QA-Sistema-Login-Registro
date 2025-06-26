// src/pruebas/registro.pruebas.ts
import { test, expect } from '@playwright/test';
import { USUARIO_VALIDO, PAYLOADS_SEGURIDAD, MENSAJES_ERROR} from '../datos/usuarios';
import { PaginaRegistro } from '../paginas/registro.paginas';
import { PaginaLogin } from '../paginas/login.paginas';

test.describe('Pruebas de Formulacion', () => {
  let paginaRegistro: PaginaRegistro;
  let paginaLogin: PaginaLogin;

  test.beforeEach(async ({ page }) => {
    // Inicializa las páginas antes de cada prueba y navega al registro
    paginaRegistro = new PaginaRegistro(page);
    paginaLogin = new PaginaLogin(page);
    await paginaRegistro.navegar();
  });

  test('TC-V01', async () => {
    // Intenta registrar usuario con nombre y apellido demasiado largos
    await paginaLogin.irARegistro();

    await paginaRegistro.registrarUsuario({
      nombre: PAYLOADS_SEGURIDAD.LONGITUD.NOMBRE,
      apellido: PAYLOADS_SEGURIDAD.LONGITUD.NOMBRE,
      usuario: USUARIO_VALIDO.usuario,
      contrasena: PAYLOADS_SEGURIDAD.LONGITUD.PASSWORD
    });

    try {
      // Verifica que aparezca el mensaje de error por longitud máxima
      await paginaRegistro.verificarLongitudNombre(USUARIO_VALIDO.usuario);
    } catch (error) {
      // Si no aparece el mensaje, la prueba falla
      test.fail(true,'El sistema NO mostró el mensaje de error esperado para longitud máxima.');
    }
  });

  test('TC-V02', async () => {
    // Intenta registrar usuario con contraseña débil
    await paginaLogin.irARegistro();

    await paginaRegistro.registrarUsuario({
      nombre: USUARIO_VALIDO.nombre,
      apellido: USUARIO_VALIDO.apellido,
      usuario: PAYLOADS_SEGURIDAD.USUARIO_DEBIL,
      contrasena: PAYLOADS_SEGURIDAD.CONTRASEÑA_DEBIL
    });

    try {
      // Si el registro es exitoso, la prueba falla porque no debe permitir contraseñas débiles
      await paginaRegistro.verificarRegistroExitoso();
      test.fail(true,'El sistema NO mostró el mensaje de error esperado para contraseña débil.');
    } catch (error) {
      // Si falla el registro, es el comportamiento esperado
      test.fail(false,'El sistema mostró el mensaje de error esperado para contraseña débil.');
    }
  });

  test('TC-V03', async () => {
    // Intenta registrar usuario con caracteres especiales y longitudes extremas
    await paginaLogin.irARegistro();

    await paginaRegistro.registrarUsuario({
      nombre: PAYLOADS_SEGURIDAD.LONGITUD.NOMBRE,
      apellido: PAYLOADS_SEGURIDAD.LONGITUD.NOMBRE,
      usuario: PAYLOADS_SEGURIDAD.USUARIO_ESPECIAL,
      contrasena: PAYLOADS_SEGURIDAD.CONTRASEÑA_ESPECIAL
    });

    // Verifica que el registro fue exitoso con datos especiales
    await paginaRegistro.verificarRegistroExitoso();
   });
});