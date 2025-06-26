import { Page, expect } from '@playwright/test';
import { MENSAJES_ERROR } from '../datos/usuarios';

export class PaginaRegistro {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ==================== SELECTORES ====================
  private get campoNombre() {
    // Selector para el campo de nombre
    return this.page.locator('input[ng-model*="firstName"], #firstName');
  }

  private get campoApellido() {
    // Selector para el campo de apellido
    return this.page.locator('input[ng-model*="lastName"], #lastName');
  }

  private get campoUsuario() {
    // Selector para el campo de usuario
    return this.page.locator('input[ng-model*="username"], #username');
  }

  private get campoContrasena() {
    // Selector para el campo de contraseña
    return this.page.locator('input[ng-model*="password"][type="password"], #password');
  }

  private get botonRegistro() {
    // Selector para el botón de registro
    return this.page.locator('button:has-text("Register"), a.btn-link:has-text("Register")');
  }

  private get botonCancelar() {
    // Selector para el botón de cancelar
    return this.page.locator('button:has-text("Cancel"), a:has-text("Cancel")');
  }

  private get mensajeError() {
    // Selector para mensajes de error
    return this.page.locator('.alert.alert-danger, [ng-bind*="error"]');
  }

  private get mensajeExito() {
    // Selector para mensajes de éxito
    return this.page.locator('.alert.alert-success, [ng-bind*="success"]');
  }

  // ==================== MÉTODOS ====================
  async navegar() {
    // Navega a la página de login y espera a que cargue el formulario de registro
    await this.page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
    
    // Espera explícita para AngularJS + validación visual
    await Promise.all([
      this.page.waitForFunction(() => 
        document.querySelector('[ng-view]') !== null,
      { timeout: 10000 }
      ),
      this.page.waitForSelector('input[ng-model], input[id]', { 
        state: 'visible',
        timeout: 15000 
      })
    ]);
  }

  async registrarUsuario(datos: {
    nombre: string;
    apellido: string;
    usuario: string;
    contrasena: string;
  }) {
    // Rellena los campos del formulario de registro
    await this._rellenarCampo(this.campoNombre, datos.nombre);
    await this._rellenarCampo(this.campoApellido, datos.apellido);
    await this._rellenarCampo(this.campoUsuario, datos.usuario);
    await this._rellenarCampo(this.campoContrasena, datos.contrasena);

    // Hace clic en el botón de registro
    await this._clickBotonRegistro();
  }

  // ==================== VALIDACIONES ====================
  async verificarRegistroExitoso() {
    // Verifica que el registro fue exitoso
    await expect(this.page).toHaveURL(/login/);
    await expect(this.mensajeExito).toBeVisible();
    await this._validarMensajeExito(MENSAJES_ERROR.REGISTRO_EXITOSO);
  }

  async verificarUsuarioExistente(usuario: string) {
    // Verifica que aparece el mensaje de usuario existente
    await expect(this.mensajeError).toBeVisible();
    await this._validarMensajeError(
      MENSAJES_ERROR.USUARIO_EXISTENTE(usuario)
    );
  }

  async verificarCamposObligatorios() {
    // Verifica que el botón de registro esté deshabilitado si faltan datos
    await expect(this.botonRegistro).toBeDisabled();
  }

  async verificarLongitudNombre(usuario: string){
    // Verifica el mensaje de error por longitud de nombre excedida
    await expect(this.mensajeError).toBeVisible();
    await this._validarMensajeError(MENSAJES_ERROR.LONGITUD_SUPERADA);
  }

  async IrALogin() {
    // Hace clic en cancelar y vuelve a la pantalla de login
    await this.botonCancelar.waitFor({ state: 'visible' });
    await this.botonCancelar.click();
    await this.page.waitForURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");
  }

  // ==================== HELPERS PRIVADOS ====================
  private async _rellenarCampo(locator: any, valor: string) {
    // Espera a que el campo esté visible y lo rellena
    await locator.waitFor({ state: 'visible', timeout: 8000 });
    await locator.fill(valor);
    await expect(locator).toHaveValue(valor);
  }

  private async _clickBotonRegistro() {
    // Espera a que el botón esté habilitado y hace clic
    await expect(this.botonRegistro).toBeEnabled({ timeout: 5000 });
    await this.botonRegistro.click();
    
    // Espera a que ocurra alguna acción post-registro (navegación o mensaje)
    await Promise.race([
      this.page.waitForURL(/login|register/, { timeout: 10000 }),
      this.mensajeError.waitFor({ timeout: 8000 }),
      this.mensajeExito.waitFor({ timeout: 8000 })
    ]);
  }

  private async _validarMensajeError(textoEsperado: string) {
    // Valida que el mensaje de error contenga el texto esperado y toma screenshot
    const mensaje = await this.mensajeError.textContent();
    expect(mensaje).toContain(textoEsperado);
    await this.tomarScreenshot(`error-${Date.now()}`);
  }

  private async _validarMensajeExito(textoEsperado: string) {
    // Valida que el mensaje de éxito contenga el texto esperado y toma screenshot
    const mensaje = await this.mensajeExito.textContent();
    expect(mensaje).toContain(textoEsperado);
    await this.tomarScreenshot(`exito-${Date.now()}`);
  }

  // ==================== UTILIDADES ====================
  async tomarScreenshot(nombre: string) {
    // Toma una captura de pantalla de la página actual
    await this.page.screenshot({
      path: `screenshots/${nombre}.png`,
      fullPage: true
    });
  }
}