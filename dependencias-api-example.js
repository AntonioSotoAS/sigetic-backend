// Ejemplo de cómo usar todos los endpoints de Dependencias

// Configuración
const API_URL = 'http://localhost:5000/api/v1';

// Función para hacer peticiones autenticadas
async function authenticatedRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Para cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}

// Función para verificar permisos
async function checkPermissions() {
  try {
    const profile = await authenticatedRequest(`${API_URL}/auth/perfil`);
    console.log('👤 Usuario actual:', profile.user.nombres, '- Rol:', profile.user.rol);
    return profile.user.rol === 'superadmin';
  } catch (error) {
    console.error('❌ Error al verificar permisos:', error.message);
    return false;
  }
}

// Ejemplos de uso de todos los endpoints

async function ejemploCompletoDependencias() {
  try {
    console.log('🏢 Ejemplos de API de Dependencias\n');

    // Verificar permisos
    const isSuperAdmin = await checkPermissions();
    console.log('🔐 ¿Es superadmin?', isSuperAdmin ? '✅ Sí' : '❌ No');

    // 1. Obtener todas las dependencias (con filtros) - TODOS pueden ver
    console.log('\n1️⃣ Obtener todas las dependencias...');
    const dependencias = await authenticatedRequest(`${API_URL}/dependencias?limit=5&search=dep`);
    console.log('📋 Dependencias encontradas:', dependencias.data.length, 'de', dependencias.total);
    dependencias.data.forEach(dep => {
      console.log(`   - ${dep.nombre} (${dep.descripcion || 'Sin descripción'})`);
    });

    // 2. Obtener una dependencia específica
    if (dependencias.data.length > 0) {
      const depId = dependencias.data[0].id;
      console.log(`\n2️⃣ Obtener dependencia con ID ${depId}...`);
      const dependencia = await authenticatedRequest(`${API_URL}/dependencias/${depId}`);
      console.log('📋 Dependencia encontrada:', dependencia.nombre);
    }

    // 3. Crear una nueva dependencia - SOLO SUPERADMIN
    console.log('\n3️⃣ Crear nueva dependencia...');
    if (isSuperAdmin) {
      const nuevaDependencia = await authenticatedRequest(`${API_URL}/dependencias`, {
        method: 'POST',
        body: JSON.stringify({
          nombre: 'Departamento de Recursos Humanos',
          descripcion: 'Encargado de la gestión del personal',
          activo: true
        })
      });
      console.log('✅ Dependencia creada:', nuevaDependencia.nombre, 'con ID:', nuevaDependencia.id);
    } else {
      console.log('❌ No tienes permisos para crear dependencias (solo superadmin)');
    }

    // 4. Actualizar la dependencia creada - SOLO SUPERADMIN
    console.log('\n4️⃣ Actualizar dependencia...');
    if (isSuperAdmin && dependencias.data.length > 0) {
      const depId = dependencias.data[0].id;
      const dependenciaActualizada = await authenticatedRequest(`${API_URL}/dependencias/${depId}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombre: 'Departamento de RRHH Actualizado',
          descripcion: 'Gestión integral del capital humano'
        })
      });
      console.log('✅ Dependencia actualizada:', dependenciaActualizada.nombre);
    } else {
      console.log('❌ No tienes permisos para actualizar dependencias (solo superadmin)');
    }

    // 5. Actualización parcial - SOLO SUPERADMIN
    console.log('\n5️⃣ Actualización parcial...');
    if (isSuperAdmin && dependencias.data.length > 0) {
      const depId = dependencias.data[0].id;
      const dependenciaParcial = await authenticatedRequest(`${API_URL}/dependencias/${depId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          descripcion: 'Descripción actualizada vía PATCH'
        })
      });
      console.log('✅ Dependencia actualizada parcialmente:', dependenciaParcial.descripcion);
    } else {
      console.log('❌ No tienes permisos para actualizar dependencias (solo superadmin)');
    }

    // 6. Eliminar la dependencia (soft delete) - SOLO SUPERADMIN
    console.log('\n6️⃣ Eliminar dependencia (soft delete)...');
    if (isSuperAdmin && dependencias.data.length > 0) {
      const depId = dependencias.data[0].id;
      const resultadoEliminacion = await authenticatedRequest(`${API_URL}/dependencias/${depId}`, {
        method: 'DELETE'
      });
      console.log('✅ Resultado:', resultadoEliminacion.message);
    } else {
      console.log('❌ No tienes permisos para eliminar dependencias (solo superadmin)');
    }

    // 7. Verificar que ya no aparece en la lista activa - TODOS pueden ver
    console.log('\n7️⃣ Verificar que no aparece en dependencias activas...');
    const dependenciasActivas = await authenticatedRequest(`${API_URL}/dependencias?activo=true`);
    console.log('📋 Dependencias activas:', dependenciasActivas.data.length);

    // 8. Obtener todas las dependencias (incluyendo inactivas) - TODOS pueden ver
    console.log('\n8️⃣ Obtener todas las dependencias (incluyendo inactivas)...');
    const todasDependencias = await authenticatedRequest(`${API_URL}/dependencias?activo=false`);
    console.log('📋 Dependencias inactivas:', todasDependencias.data.length);

    console.log('\n🎉 ¡Todos los ejemplos completados exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejemplos de filtros disponibles
async function ejemplosFiltros() {
  console.log('\n🔍 Ejemplos de filtros disponibles:\n');

  const filtros = [
    { descripcion: 'Búsqueda por nombre', url: `${API_URL}/dependencias?search=dep` },
    { descripcion: 'Paginación', url: `${API_URL}/dependencias?limit=5&page=1` },
    { descripcion: 'Solo activas', url: `${API_URL}/dependencias?activo=true` },
    { descripcion: 'Solo inactivas', url: `${API_URL}/dependencias?activo=false` },
    { descripcion: 'Búsqueda + paginación', url: `${API_URL}/dependencias?search=recursos&limit=3&page=1` },
  ];

  filtros.forEach((filtro, index) => {
    console.log(`${index + 1}. ${filtro.descripcion}`);
    console.log(`   GET ${filtro.url}`);
  });

  console.log('\n🔐 Permisos por rol:');
  console.log('   👁️  VER: Todos los roles pueden ver dependencias');
  console.log('   ➕ CREAR: Solo superadmin');
  console.log('   ✏️  EDITAR: Solo superadmin');
  console.log('   🗑️  ELIMINAR: Solo superadmin');
}

// Ejecutar ejemplos
async function main() {
  await ejemploCompletoDependencias();
  await ejemplosFiltros();
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ejemploCompletoDependencias,
    ejemplosFiltros
  };
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  main();
}
