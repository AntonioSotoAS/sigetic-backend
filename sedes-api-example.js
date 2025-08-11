// Ejemplo de cómo usar todos los endpoints de Sedes

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

async function ejemploCompletoSedes() {
  try {
    console.log('🏢 Ejemplos de API de Sedes\n');

    // Verificar permisos
    const isSuperAdmin = await checkPermissions();
    console.log('🔐 ¿Es superadmin?', isSuperAdmin ? '✅ Sí' : '❌ No');

    // 1. Obtener todas las sedes (con filtros) - TODOS pueden ver
    console.log('\n1️⃣ Obtener todas las sedes...');
    const sedes = await authenticatedRequest(`${API_URL}/sedes?limit=5&search=sede`);
    console.log('📋 Sedes encontradas:', sedes.data.length, 'de', sedes.total);
    sedes.data.forEach(sede => {
      console.log(`   - ${sede.nombre} (${sede.ciudad})`);
    });

    // 2. Obtener una sede específica
    if (sedes.data.length > 0) {
      const sedeId = sedes.data[0].id;
      console.log(`\n2️⃣ Obtener sede con ID ${sedeId}...`);
      const sede = await authenticatedRequest(`${API_URL}/sedes/${sedeId}`);
      console.log('📋 Sede encontrada:', sede.nombre);
    }

    // 3. Crear una nueva sede - SOLO SUPERADMIN
    console.log('\n3️⃣ Crear nueva sede...');
    if (isSuperAdmin) {
      const nuevaSede = await authenticatedRequest(`${API_URL}/sedes`, {
        method: 'POST',
        body: JSON.stringify({
          nombre: 'Sede Nueva Ejemplo',
          direccion: 'Av. Ejemplo 123',
          ciudad: 'Ciudad Ejemplo',
          activo: true
        })
      });
      console.log('✅ Sede creada:', nuevaSede.nombre, 'con ID:', nuevaSede.id);
    } else {
      console.log('❌ No tienes permisos para crear sedes (solo superadmin)');
    }

    // 4. Actualizar la sede creada - SOLO SUPERADMIN
    console.log('\n4️⃣ Actualizar sede...');
    if (isSuperAdmin && sedes.data.length > 0) {
      const sedeId = sedes.data[0].id;
      const sedeActualizada = await authenticatedRequest(`${API_URL}/sedes/${sedeId}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombre: 'Sede Actualizada',
          direccion: 'Av. Actualizada 456'
        })
      });
      console.log('✅ Sede actualizada:', sedeActualizada.nombre);
    } else {
      console.log('❌ No tienes permisos para actualizar sedes (solo superadmin)');
    }

    // 5. Actualización parcial - SOLO SUPERADMIN
    console.log('\n5️⃣ Actualización parcial...');
    if (isSuperAdmin && sedes.data.length > 0) {
      const sedeId = sedes.data[0].id;
      const sedeParcial = await authenticatedRequest(`${API_URL}/sedes/${sedeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ciudad: 'Ciudad Actualizada'
        })
      });
      console.log('✅ Sede actualizada parcialmente:', sedeParcial.ciudad);
    } else {
      console.log('❌ No tienes permisos para actualizar sedes (solo superadmin)');
    }

    // 6. Eliminar la sede (soft delete) - SOLO SUPERADMIN
    console.log('\n6️⃣ Eliminar sede (soft delete)...');
    if (isSuperAdmin && sedes.data.length > 0) {
      const sedeId = sedes.data[0].id;
      const resultadoEliminacion = await authenticatedRequest(`${API_URL}/sedes/${sedeId}`, {
        method: 'DELETE'
      });
      console.log('✅ Resultado:', resultadoEliminacion.message);
    } else {
      console.log('❌ No tienes permisos para eliminar sedes (solo superadmin)');
    }

    // 7. Verificar que ya no aparece en la lista activa - TODOS pueden ver
    console.log('\n7️⃣ Verificar que no aparece en sedes activas...');
    const sedesActivas = await authenticatedRequest(`${API_URL}/sedes?activo=true`);
    console.log('📋 Sedes activas:', sedesActivas.data.length);

    // 8. Obtener todas las sedes (incluyendo inactivas) - TODOS pueden ver
    console.log('\n8️⃣ Obtener todas las sedes (incluyendo inactivas)...');
    const todasSedes = await authenticatedRequest(`${API_URL}/sedes?activo=false`);
    console.log('📋 Sedes inactivas:', todasSedes.data.length);

    console.log('\n🎉 ¡Todos los ejemplos completados exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejemplos de filtros disponibles
async function ejemplosFiltros() {
  console.log('\n🔍 Ejemplos de filtros disponibles:\n');

  const filtros = [
    { descripcion: 'Búsqueda por nombre', url: `${API_URL}/sedes?search=sede` },
    { descripcion: 'Paginación', url: `${API_URL}/sedes?limit=5&page=1` },
    { descripcion: 'Solo activas', url: `${API_URL}/sedes?activo=true` },
    { descripcion: 'Solo inactivas', url: `${API_URL}/sedes?activo=false` },
    { descripcion: 'Búsqueda + paginación', url: `${API_URL}/sedes?search=principal&limit=3&page=1` },
  ];

  filtros.forEach((filtro, index) => {
    console.log(`${index + 1}. ${filtro.descripcion}`);
    console.log(`   GET ${filtro.url}`);
  });

  console.log('\n🔐 Permisos por rol:');
  console.log('   👁️  VER: Todos los roles pueden ver sedes');
  console.log('   ➕ CREAR: Solo superadmin');
  console.log('   ✏️  EDITAR: Solo superadmin');
  console.log('   🗑️  ELIMINAR: Solo superadmin');
}

// Ejecutar ejemplos
async function main() {
  await ejemploCompletoSedes();
  await ejemplosFiltros();
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ejemploCompletoSedes,
    ejemplosFiltros
  };
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  main();
}
