import { Page, expect } from '@playwright/test';

export class PaginaInicio {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ==================== SELECTORES ====================
  private get tituloExito() {
    // Selector para el título de registro exitoso
    return this.page.locator('h1.ng-binding:has-text("Registration successful!")');
  }

  private get listaUsuarios() {
    // Selector para la lista de usuarios registrados
    return this.page.locator('li[ng-repeat="user in vm.allUsers"]');
  }

  private get botonLogout() {
    // Selector para el botón de logout
    return this.page.locator('[ng-click*="logout"], :text("Logout")');
  }

  private get mensajeBienvenida() {
    // Selector para el mensaje de bienvenida
    return this.page.locator('p:has-text("You\'re logged in!!")');
  }

  private get usuarioLogueado() {
    // Selector para el nombre del usuario logueado
    return this.page.locator('h1.ng-binding').first();
  }

  // ==================== MÉTODOS DE ACCIÓN ====================
  async esperarCarga() {
    // Espera a que la página de inicio cargue completamente
    await this.page.waitForURL("**/registration-login-example/#/");
    await this.page.waitForFunction(() => 
      document.querySelector('[ng-view]') !== null,
      { timeout: 15000 }
    );
    await expect(this.tituloExito).toBeVisible({ timeout: 120000 });
  }

  async borrarUsuario(nombreUsuario: string | null = null) {
    // Borra el usuario especificado o el usuario logueado si no se pasa parámetro
    if (nombreUsuario === null) {
      nombreUsuario = await this.obtenerNombreUsuarioLogueado();
    }
    // Buscar el elemento en la lista que coincida con el usuario logueado
    const usuarioEnLista = this.page.locator('li.ng-binding', { hasText: nombreUsuario });
    
    await usuarioEnLista.waitFor({ state: 'visible' });
    
    // Verificar que el botón de borrado existe
    const botonBorrado = usuarioEnLista.locator('a[ng-click*="deleteUser"]');
    await expect(botonBorrado).toBeVisible();
    
    // Borrar el usuario
    await botonBorrado.click();
    
    // Verificar que el usuario fue eliminado
    await expect(usuarioEnLista).not.toBeVisible();

    await this.botonLogout.click();
  }

  async logout() {
    // Realiza logout y espera a que cargue la pantalla de login
    await this.botonLogout.click();
    await this.page.waitForURL(/login/);
    await this.page.waitForLoadState('networkidle');
  }

  // Método para extraer solo el nombre de usuario
  private async obtenerNombreUsuarioLogueado(): Promise<string> {
      // Obtiene el texto del usuario logueado y extrae el nombre
      const textoCompleto = await this.usuarioLogueado.textContent();
      if (!textoCompleto) {
          throw new Error('No se pudo obtener el texto del usuario logueado');
      }

      // Extraer el nombre de usuario del texto "Hi r!"
      const match = textoCompleto.match(/^Hi\s(.+)!$/);
      if (!match || !match[1]) {
          throw new Error(`Formato inesperado del mensaje de bienvenida: "${textoCompleto}"`);
      }

      return match[1].trim();
  }

  // ==================== VALIDACIONES ====================

  async verificarUsuarioVisible(usuario: string) {
    // Verifica que el usuario esté visible en la lista
    await expect(this.listaUsuarios.filter({ hasText: usuario }))
      .toBeVisible({ timeout: 8000 });
  }

  async verificarUsuarioNoVisible(usuario: string) {
    // Verifica que el usuario NO esté visible en la lista
    await expect(this.page.locator('li[ng-repeat]')).not.toContainText(usuario, { timeout: 5000 });
  }

  async verificarSesionCerrada() {
    // Verifica que la sesión esté cerrada y se muestre el login
    await expect(this.page).toHaveURL(/login/);
    await expect(this.page.locator('input[ng-model*="username"]')).toBeVisible();
  }

  async verificarElementosDashboard() {
    // Verifica que los elementos principales del dashboard estén visibles
    await expect(this.tituloExito).toBeVisible();
    await expect(this.mensajeBienvenida).toBeVisible();
    await expect(this.listaUsuarios.first()).toBeVisible();
  }

  async verificarBorradoNoPermitido(usuario: string) {
    // Verifica que el usuario existe en la lista
    await expect.poll(async () => {
        const count = await this.listaUsuarios.filter({ hasText: usuario }).count();
        return count > 0;
    }, {
        message: `El usuario ${usuario} no aparece en la lista`,
        timeout: 15000
    }).toBeTruthy();

    // Verifica que el botón de borrado NO está visible para ese usuario
    const usuarioTarget = this.listaUsuarios.filter({ hasText: usuario });
    const botonBorrado = usuarioTarget.locator('a[ng-click*="deleteUser"]');
    await expect(botonBorrado).not.toBeVisible({ timeout: 120000 });
  }

  private async contarUsuariosRegistrados(): Promise<number> {
      // Cuenta el número de usuarios registrados en la lista
      return await this.page.locator('li[ng-repeat="user in vm.allUsers"]').count();
  }

  async tomarScreenshot(nombre: string) {
    // Toma una captura de pantalla del dashboard
    await this.page.screenshot({
      path: `screenshots/dashboard-${nombre}-${Date.now()}.png`,
      fullPage: true
    });
  }

  async debugEstadoActual() {
    // Imprime en consola el estado actual del dashboard para debug
    console.log('=== DEBUG ESTADO DASHBOARD ===');
    console.log('Usuario logueado:', await this.usuarioLogueado.textContent());
    console.log('Número de usuarios:', await this.contarUsuariosRegistrados());
    console.log('Título visible:', await this.tituloExito.isVisible());
    await this.tomarScreenshot('debug-estado');
  }
}