import { test, expect } from '@playwright/test';
import { USUARIO_VALIDO2, PAYLOADS_SEGURIDAD, MENSAJES_ERROR } from '../datos/usuarios';
import { PaginaRegistro } from '../paginas/registro.paginas';
import { PaginaLogin } from '../paginas/login.paginas';

test.describe('Pruebas de Registro', () => {
  let paginaRegistro: PaginaRegistro;
  let paginaLogin: PaginaLogin;

  test.beforeEach(async ({ page }) => {
    // Inicializa las páginas antes de cada prueba y navega al registro
    paginaRegistro = new PaginaRegistro(page);
    paginaLogin = new PaginaLogin(page);
    await paginaRegistro.navegar();
  });

  test('TC-R01', async () => {
    // Registra un usuario válido y verifica el registro exitoso
    await paginaLogin.irARegistro();
    await paginaRegistro.registrarUsuario(USUARIO_VALIDO2);
    await paginaRegistro.verificarRegistroExitoso();
  });

  test('TC-R02', async () => {
    // Verifica que los campos obligatorios estén validados (botón deshabilitado)
    await paginaLogin.irARegistro();
    await paginaRegistro.verificarCamposObligatorios();
  });

  test('TC-R03', async () => {
    // Primero registra el usuario
    await paginaLogin.irARegistro();
    await paginaRegistro.registrarUsuario(USUARIO_VALIDO2);

    // Luego intenta registrarlo de nuevo y verifica mensaje de usuario existente
    await paginaLogin.irARegistro();
    await paginaRegistro.registrarUsuario(USUARIO_VALIDO2);
    await paginaRegistro.verificarUsuarioExistente(USUARIO_VALIDO2.usuario);
  });

  test('TC-R04', async ({ page }) => {
    // Verifica la navegación de regreso al login desde el registro
    await paginaLogin.irARegistro();
    await paginaRegistro.IrALogin();
    await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
  });
});