import { Page, expect } from '@playwright/test';
import { MENSAJES_ERROR } from '../datos/usuarios';

export class PaginaLogin {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectores actualizados según el HTML proporcionado
  private get campoUsuario() { return this.page.locator('#username'); } // Campo de usuario
  private get campoContrasena() { return this.page.locator('input[type="password"]'); } // Campo de contraseña
  private get botonLogin() { return this.page.locator('button[type="submit"]'); } // Botón para iniciar sesión
  private get botonRegistro() { return this.page.locator('a.btn-link:has-text("Register")'); } // Enlace a registro
  private get mensajeError() { 
    return this.page.locator('div.alert.alert-danger:visible'); // Mensaje de error visible
  }

  // Métodos mejorados
  async navegar() {
    // Navega a la página de login y espera a que los campos estén visibles
    await this.page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
    await this.page.waitForSelector('#username', { state: 'visible' });
    await this.page.waitForSelector('input[type="password"]', { state: 'visible' });
    // Espera a que AngularJS termine de renderizar
    await this.page.waitForFunction(() => 
      document.querySelector('#username') && 
      document.querySelector('input[type="password"]')
    );
    await this.page.waitForLoadState('networkidle');
  }

  // Solución mejorada para el método login
  async login(usuario: string, contrasena: string) {
    // Espera a que los campos estén listos
    await this.campoUsuario.waitFor({ state: 'visible', timeout: 15000 });
    await this.campoContrasena.waitFor({ state: 'visible', timeout: 15000 });

    // Limpia los campos y verifica que estén vacíos
    await this.campoUsuario.clear();
    await this.campoContrasena.clear();
    await expect(this.campoUsuario).toHaveValue('');
    await expect(this.campoContrasena).toHaveValue('');

    // Rellena los campos con los valores recibidos
    await this.campoUsuario.fill(usuario);
    await this.campoContrasena.fill(contrasena);

    // Verifica que los valores se hayan escrito correctamente
    await expect.poll(async () => await this.campoUsuario.inputValue())
        .toBe(usuario);
    await expect.poll(async () => await this.campoContrasena.inputValue())
        .toBe(contrasena);

    // Espera a que el botón de login esté habilitado
    await expect(this.botonLogin).toBeEnabled({ timeout: 30000 });

    // Hace clic en el botón y espera la navegación o error
    try {
        await Promise.all([
            this.page.waitForURL(/login|dashboard/, { 
                timeout: 20000,
                waitUntil: 'networkidle'
            }),
            this.botonLogin.click()
        ]);
    } catch (error) {
        // Si hay error, verifica si es por credenciales inválidas
        if (await this.mensajeError.isVisible()) {
            return; // Comportamiento esperado para login fallido
        }
        throw error;
    }
  }

  async verificarLoginExitoso() {
    // Verifica que la URL sea la del dashboard tras login exitoso
    await expect(this.page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/");
    await this.page.waitForLoadState('networkidle');
  }

  async verificarErrorCredenciales() {
    // Espera y verifica que aparezca el mensaje de error por credenciales inválidas
    await this.mensajeError.waitFor({ state: 'visible' });
    await expect(this.mensajeError).toContainText(MENSAJES_ERROR.LOGIN_INVALIDO);
    // Captura de pantalla para debug
    await this.page.screenshot({ path: 'screenshots/error-credenciales.png' });
  }

  async verificarCamposObligatorios() {
    // Verifica que el botón de login esté deshabilitado si faltan datos
    await expect(this.botonLogin).toBeDisabled();
  }

  async irARegistro() {
    // Hace clic en el enlace de registro y espera la navegación
    await this.botonRegistro.waitFor({ state: 'visible' });
    await this.botonRegistro.click();
    await this.page.waitForURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
    await this.page.waitForLoadState('networkidle');
}
}