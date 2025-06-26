import { test, expect } from '@playwright/test';
import { USUARIO_VALIDO, USUARIO_INVALIDO } from '../datos/usuarios';
import { PaginaLogin } from '../paginas/login.paginas';
import { PaginaRegistro } from '../paginas/registro.paginas';

// Grupo de pruebas relacionadas con el login
test.describe('Pruebas de Login', () => {
  let paginaLogin: PaginaLogin;
  let paginaRegistro: PaginaRegistro;

  test.beforeEach(async ({ page }) => {
    // Inicializa las páginas antes de cada prueba y navega al login
    paginaLogin = new PaginaLogin(page);
    paginaRegistro = new PaginaRegistro(page);
    await paginaLogin.navegar();
  });

  test('TC-L01', async ({ page }) => {
    // Asegura que el usuario existe registrándolo primero
    await paginaLogin.irARegistro();
    await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
    await paginaRegistro.registrarUsuario(USUARIO_VALIDO);
    await paginaRegistro.verificarRegistroExitoso();

    // Realiza login con usuario válido y verifica acceso exitoso
    await paginaLogin.login(USUARIO_VALIDO.usuario, USUARIO_VALIDO.contrasena);
    await paginaLogin.verificarLoginExitoso();
  });

  test('TC-L02', async () => {
    // Intenta login con usuario inválido y verifica mensaje de error
    await paginaLogin.login(USUARIO_INVALIDO.usuario, USUARIO_INVALIDO.contrasena);
    await paginaLogin.verificarErrorCredenciales();
  });

  test('TC-L03', async () => {
    // Verifica que los campos obligatorios estén validados (botón deshabilitado)
    await paginaLogin.verificarCamposObligatorios();
  });

  test('TC-L04', async ({ page }) => {
    // Verifica la navegación al formulario de registro
    await paginaLogin.irARegistro();
    await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
  });
});