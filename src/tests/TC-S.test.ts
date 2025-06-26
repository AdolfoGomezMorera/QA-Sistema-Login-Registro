import { test, expect } from '@playwright/test';
import { PAYLOADS_SEGURIDAD, USUARIO_VALIDO, MENSAJES_ERROR } from '../datos/usuarios';
import { PaginaLogin } from '../paginas/login.paginas';
import { PaginaRegistro } from '../paginas/registro.paginas';

test.describe('Pruebas de Seguridad', () => {
  let paginaRegistro: PaginaRegistro;
  let paginaLogin: PaginaLogin;

  test.beforeEach(async ({ page }) => {
    // Inicializa las páginas antes de cada prueba y navega al registro
    paginaRegistro = new PaginaRegistro(page);
    paginaLogin = new PaginaLogin(page);
    await paginaRegistro.navegar();
  });

  test('TC-S01', async () => {
    // Intenta registrar un usuario con payloads XSS en usuario y contraseña
    await paginaLogin.irARegistro();
    await paginaRegistro.registrarUsuario({
      nombre: USUARIO_VALIDO.nombre,
      apellido: USUARIO_VALIDO.apellido,
      usuario: PAYLOADS_SEGURIDAD.XSS[0],
      contrasena: PAYLOADS_SEGURIDAD.XSS[1]
    });
    await paginaRegistro.verificarRegistroExitoso();
    await paginaLogin.login(PAYLOADS_SEGURIDAD.XSS[0], PAYLOADS_SEGURIDAD.XSS[1]);

    try {
      // Si el login es exitoso, la prueba falla porque no debe permitir XSS
      await paginaLogin.verificarLoginExitoso();
      test.fail(true, 'El sistema permitio usuarios con XSS como inputs.');
    } catch (error) {}
  });

  test('TC-S02', async () => {
    // Intenta registrar un usuario con payloads de SQL Injection en usuario y contraseña
    await paginaLogin.irARegistro();
    await paginaRegistro.registrarUsuario({
      nombre: USUARIO_VALIDO.nombre,
      apellido: USUARIO_VALIDO.apellido,
      usuario: PAYLOADS_SEGURIDAD.SQL[0],
      contrasena: PAYLOADS_SEGURIDAD.SQL[1]
    });
    await paginaRegistro.verificarRegistroExitoso();
    await paginaLogin.login(PAYLOADS_SEGURIDAD.SQL[0], PAYLOADS_SEGURIDAD.SQL[1]);

    try {
      // Si el login es exitoso, la prueba falla porque no debe permitir SQL Injection
      await paginaLogin.verificarLoginExitoso();
      test.fail(true, 'El sistema permitio usuarios con sentencias SQL.');
    } catch (error) {
      // Se espera que falle el login
    }
  });
});