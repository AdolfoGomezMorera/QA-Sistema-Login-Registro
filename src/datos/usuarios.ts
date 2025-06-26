// Usuario válido de prueba
export const USUARIO_VALIDO = {
  nombre: 'Test',
  apellido: 'User',
  usuario: `testuser_1`,
  contrasena: 'ValidPass123!'
};

// Segundo usuario válido de prueba
export const USUARIO_VALIDO2 = {
  nombre: 'Test2',
  apellido: 'User2',
  usuario: `testuser_2`,
  contrasena: 'ValidPass213!'
};

// Usuario inválido para pruebas negativas
export const USUARIO_INVALIDO = {
  usuario: 'usuario_inexistente',
  contrasena: 'contrasena_invalida'
};

// Payloads para pruebas de seguridad y validaciones
export const PAYLOADS_SEGURIDAD = {
  XSS: [
    '<script>alert(1)</script>', // Prueba de inyección XSS
    '<img src=x onerror=alert(1)>', // Otra variante de XSS
  ],
  SQL: [
    "' OR '1'='1'", // Prueba de inyección SQL
    "admin'--" // Otra variante de SQL Injection
  ],
  LONGITUD: {
    NOMBRE: 'A'.repeat(1000), // Nombre muy largo para pruebas de límite
    PASSWORD: 'A'.repeat(500) // Contraseña muy larga para pruebas de límite
  },
  CONTRASEÑA_DEBIL: '1', // Contraseña débil para pruebas
  USUARIO_DEBIL: 'user', // Usuario débil para pruebas

  CONTRASEÑA_ESPECIAL: '*/!@#$%^&*()_+', // Contraseña con caracteres especiales
  USUARIO_ESPECIAL: '1231#|12AS3^^[' // Usuario con caracteres especiales
};

// Mensajes de error y éxito para validaciones y respuestas
export const MENSAJES_ERROR = {
  LOGIN_INVALIDO: 'Username or password is incorrect', // Error de login
  USUARIO_EXISTENTE: (user: string) => `Username "${user}" is already taken`, // Usuario ya registrado
  REGISTRO_EXITOSO: 'Registration successful', // Registro exitoso
  LONGITUD_SUPERADA: 'Name must be shorter than 50 characters' // Error por longitud de nombre
};