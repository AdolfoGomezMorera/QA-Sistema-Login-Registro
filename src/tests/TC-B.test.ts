import { test, expect } from '@playwright/test';
import { USUARIO_VALIDO, USUARIO_VALIDO2 } from '../datos/usuarios';
import { PaginaLogin } from '../paginas/login.paginas';
import { PaginaRegistro } from '../paginas/registro.paginas';
import { PaginaInicio } from '../paginas/bienvenida.paginas';

test.describe('Pruebas de Borrado de Usuarios', () => {
    let paginaLogin: PaginaLogin;
    let paginaRegistro: PaginaRegistro;
    let paginaInicio: PaginaInicio;

    test.beforeEach(async ({ page }) => {
        // Inicializa las páginas antes de cada prueba
        paginaLogin = new PaginaLogin(page);
        paginaRegistro = new PaginaRegistro(page);
        paginaInicio = new PaginaInicio(page);
        await paginaLogin.navegar();
    });

    test('TC-B01', async ({ page }) => {
        // Registrar Usuario
        await paginaLogin.irARegistro();
        await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
        await paginaRegistro.registrarUsuario(USUARIO_VALIDO);
        await paginaRegistro.verificarRegistroExitoso();

        // Login con el usuario registrado
        await paginaLogin.login(USUARIO_VALIDO.usuario, USUARIO_VALIDO.contrasena);
        await paginaLogin.verificarLoginExitoso();
        
        // Ejecutar el borrado del usuario logueado
        await paginaInicio.borrarUsuario();
        
        // Verificar que no se puede loguear nuevamente con el usuario borrado
        await paginaLogin.login(USUARIO_VALIDO.usuario, USUARIO_VALIDO.contrasena);
        await paginaLogin.verificarErrorCredenciales();
    });

    test('TC-B02', async ({ page }) => {

        // Usuario 1: Registrar y loguear
        await paginaLogin.irARegistro();
        await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
        await paginaRegistro.registrarUsuario(USUARIO_VALIDO);
        await paginaRegistro.verificarRegistroExitoso();

        // Registrar usuario 2
        await paginaLogin.irARegistro();
        await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");
        await paginaRegistro.registrarUsuario(USUARIO_VALIDO2);
        await paginaRegistro.verificarRegistroExitoso();

        // Login con el usuario 1
        await paginaLogin.login(USUARIO_VALIDO.usuario, USUARIO_VALIDO.contrasena);
        await paginaLogin.verificarLoginExitoso();
        
        try {
            // Intentar borrar usuario ajeno (usuario 2), esto no debería estar permitido
            await paginaInicio.borrarUsuario(USUARIO_VALIDO2.usuario);
            
            // Si llega aquí, la prueba falla porque se permitió el borrado indebido
            test.fail(true,'Se permitió borrar un Usuario diferente al de la sesión iniciada');
        } catch (error) {
            // Verificar que no se pudo borrar el usuario ajeno
            await paginaInicio.verificarBorradoNoPermitido(USUARIO_VALIDO2.usuario);
            await paginaInicio.verificarUsuarioVisible(USUARIO_VALIDO2.usuario);
        }
    });
});