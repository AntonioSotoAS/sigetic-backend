// Ejemplo de cómo usar la autenticación con cookies en el frontend

// Configuración
const API_URL = 'http://localhost:5000/api/v1';

// Función para hacer login
async function login(correo, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include', // Importante para cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, password })
    });

    const data = await response.json();
    
    if (data.success) {
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
    const response = await fetch(`${API_URL}/auth/perfil`, {
      method: 'GET',
      credentials: 'include', // Importante para cookies
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Importante para cookies
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (data.success) {
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
async function logout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Importante para cookies
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Logout exitoso');
      return data;
    } else {
      throw new Error(data.message || 'Error en logout');
    }
  } catch (error) {
    console.error('❌ Error en logout:', error);
    throw error;
  }
}

// Función para hacer peticiones autenticadas
async function authenticatedRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Importante para cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  // Si el token expiró, intentar renovarlo
  if (response.status === 401) {
    try {
      await refreshToken();
      // Reintentar la petición
      const retryResponse = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      return retryResponse;
    } catch (error) {
      // Si no se puede renovar, hacer logout
      await logout();
      throw new Error('Sesión expirada');
    }
  }

  return response;
}

// Función para verificar si el usuario está autenticado
async function isAuthenticated() {
  try {
    const response = await fetch(`${API_URL}/auth/perfil`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Función para obtener el usuario actual
async function getCurrentUser() {
  try {
    const response = await getProfile();
    return response.user;
  } catch (error) {
    return null;
  }
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
    console.log('✅ Usuario autenticado:', await isAuthenticated());
    console.log('👤 Usuario actual:', await getCurrentUser());
    
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
