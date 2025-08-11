// Ejemplo de cómo usar la autenticación con localStorage en el frontend

// Configuración
const API_URL = 'http://localhost:5000/api/v1';

// Función para hacer login
async function login(correo, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, password })
    });

    const data = await response.json();
    
    if (data.success) {
      // Guardar tokens en localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('✅ Login exitoso');
      return data;
    } else {
      throw new Error(data.message || 'Error en login');
    }
  } catch (error) {
    console.error('❌ Error en login:', error);
    throw error;
  }
}

// Función para obtener el perfil del usuario
async function getProfile() {
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No hay token de acceso');
    }

    const response = await fetch(`${API_URL}/auth/perfil`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Perfil obtenido:', data.user);
      return data;
    } else {
      throw new Error(data.message || 'Error al obtener perfil');
    }
  } catch (error) {
    console.error('❌ Error al obtener perfil:', error);
    throw error;
  }
}

// Función para renovar el token
async function refreshToken() {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    
    if (!refresh_token) {
      throw new Error('No hay refresh token');
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token })
    });

    const data = await response.json();
    
    if (data.success) {
      // Actualizar tokens en localStorage
      localStorage.setItem('access_token', data.access_token);
      console.log('✅ Token renovado');
      return data;
    } else {
      throw new Error(data.message || 'Error al renovar token');
    }
  } catch (error) {
    console.error('❌ Error al renovar token:', error);
    throw error;
  }
}

// Función para hacer logout
function logout() {
  // Limpiar localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  
  console.log('✅ Logout exitoso');
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('access_token');
  return !!token;
}

// Función para obtener el usuario actual
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Función para hacer peticiones autenticadas
async function authenticatedRequest(url, options = {}) {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No hay token de acceso');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });

  // Si el token expiró, intentar renovarlo
  if (response.status === 401) {
    try {
      await refreshToken();
      // Reintentar la petición con el nuevo token
      const newToken = localStorage.getItem('access_token');
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${newToken}`,
          ...options.headers
        }
      });
      return retryResponse;
    } catch (error) {
      // Si no se puede renovar, hacer logout
      logout();
      throw new Error('Sesión expirada');
    }
  }

  return response;
}

// Ejemplo de uso
async function ejemplo() {
  try {
         // 1. Login
     console.log('🔐 Haciendo login...');
     await login('admin@pj.gob.pe', '123456');
    
    // 2. Obtener perfil
    console.log('👤 Obteniendo perfil...');
    const profile = await getProfile();
    
    // 3. Verificar autenticación
    console.log('✅ Usuario autenticado:', isAuthenticated());
    console.log('👤 Usuario actual:', getCurrentUser());
    
    // 4. Ejemplo de petición autenticada
    console.log('📡 Haciendo petición autenticada...');
    const response = await authenticatedRequest(`${API_URL}/usuarios`);
    const usuarios = await response.json();
    console.log('📋 Usuarios:', usuarios);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Exportar funciones para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    login,
    getProfile,
    refreshToken,
    logout,
    isAuthenticated,
    getCurrentUser,
    authenticatedRequest
  };
}
