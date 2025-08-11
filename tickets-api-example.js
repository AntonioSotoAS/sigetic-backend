// Ejemplo de cómo usar todos los endpoints de Tickets

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
    return profile.user.rol;
  } catch (error) {
    console.error('❌ Error al verificar permisos:', error.message);
    return null;
  }
}

// Ejemplos de uso de todos los endpoints

async function ejemploCompletoTickets() {
  try {
    console.log('🎫 Ejemplos de API de Tickets\n');

    // Verificar permisos
    const userRole = await checkPermissions();
    console.log('🔐 Rol del usuario:', userRole);

    // 1. Obtener todas las dependencias para usar en el ticket
    console.log('\n1️⃣ Obtener dependencias disponibles...');
    const dependencias = await authenticatedRequest(`${API_URL}/dependencias?limit=10`);
    console.log('📋 Dependencias encontradas:', dependencias.data.length);
    
    // 2. Obtener todas las sedes para usar en el ticket
    console.log('\n2️⃣ Obtener sedes disponibles...');
    const sedes = await authenticatedRequest(`${API_URL}/sedes?limit=10`);
    console.log('📋 Sedes encontradas:', sedes.data.length);

    if (dependencias.data.length === 0 || sedes.data.length === 0) {
      console.log('❌ Necesitas tener dependencias y sedes creadas para crear tickets');
      return;
    }

    const dependenciaId = dependencias.data[0].id;
    const sedeId = sedes.data[0].id;

    // 3. Crear un ticket sin técnico asignado (PENDIENTE)
    console.log('\n3️⃣ Crear ticket sin técnico asignado...');
    const ticketSinTecnico = await authenticatedRequest(`${API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1, // ID del usuario solicitante
        titulo: 'Problema con la impresora',
        descripcion: 'La impresora no imprime y muestra error de papel',
        categoria_id: 1, // ID de la categoría Hardware
        subcategoria_id: 1, // ID de la subcategoría Impresora
        prioridad: 'alta',
        dependencia_id: dependenciaId,
        sede_id: sedeId
        // No se incluye tecnico_id, por lo que quedará PENDIENTE
      })
    });
    console.log('✅ Ticket creado sin técnico:', ticketSinTecnico.titulo, '- Estado:', ticketSinTecnico.estado);

    // 4. Crear un ticket con técnico asignado (ASIGNADO)
    console.log('\n4️⃣ Crear ticket con técnico asignado...');
    const ticketConTecnico = await authenticatedRequest(`${API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1, // ID del usuario solicitante
        titulo: 'Problema de red',
        descripcion: 'No hay conexión a internet en el área de desarrollo',
        categoria_id: 3, // ID de la categoría Red
        subcategoria_id: 9, // ID de la subcategoría Conectividad
        prioridad: 'urgente',
        dependencia_id: dependenciaId,
        sede_id: sedeId,
        tecnico_id: 2 // Asumiendo que existe un usuario con ID 2
      })
    });
    console.log('✅ Ticket creado con técnico:', ticketConTecnico.titulo, '- Estado:', ticketConTecnico.estado);

    // 5. Crear un ticket mínimo (solo campos obligatorios)
    console.log('\n5️⃣ Crear ticket mínimo...');
    const ticketMinimo = await authenticatedRequest(`${API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1, // ID del usuario solicitante
        prioridad: 'media',
        dependencia_id: dependenciaId,
        sede_id: sedeId
        // Solo campos obligatorios
      })
    });
    console.log('✅ Ticket mínimo creado:', ticketMinimo.id, '- Estado:', ticketMinimo.estado);

    // 5. Obtener todos los tickets
    console.log('\n5️⃣ Obtener todos los tickets...');
    const tickets = await authenticatedRequest(`${API_URL}/tickets?limit=10`);
    console.log('📋 Tickets encontrados:', tickets.data.length, 'de', tickets.total);
    tickets.data.forEach(ticket => {
      console.log(`   - ${ticket.titulo} (${ticket.estado}) - Solicitante: ${ticket.user.nombres}`);
      if (ticket.tecnico) {
        console.log(`     Técnico asignado: ${ticket.tecnico.nombres}`);
      }
    });

    // 6. Obtener un ticket específico
    if (tickets.data.length > 0) {
      const ticketId = tickets.data[0].id;
      console.log(`\n6️⃣ Obtener ticket con ID ${ticketId}...`);
      const ticket = await authenticatedRequest(`${API_URL}/tickets/${ticketId}`);
      console.log('📋 Ticket encontrado:', ticket.titulo);
      console.log(`   Solicitante: ${ticket.user.nombres} ${ticket.user.apellidos_paterno}`);
      console.log(`   Dependencia: ${ticket.dependencia.nombre}`);
      console.log(`   Sede: ${ticket.sede.nombre}`);
      console.log(`   Estado: ${ticket.estado}`);
      console.log(`   Prioridad: ${ticket.prioridad}`);
      if (ticket.tecnico) {
        console.log(`   Técnico: ${ticket.tecnico.nombres} ${ticket.tecnico.apellidos_paterno}`);
      }
    }

    // 7. Actualizar un ticket (cambiar estado y asignar técnico)
    if (tickets.data.length > 0) {
      const ticketId = tickets.data[0].id;
      console.log(`\n7️⃣ Actualizar ticket ${ticketId}...`);
      const ticketActualizado = await authenticatedRequest(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify({
          estado: 'en_proceso',
          tecnico_id: 2, // Asignar técnico
          comentario_interno: 'Técnico asignado y trabajo iniciado'
        })
      });
      console.log('✅ Ticket actualizado:', ticketActualizado.titulo, '- Nuevo estado:', ticketActualizado.estado);
    }

    // 8. Obtener tickets sin asignar
    console.log('\n8️⃣ Obtener tickets sin asignar...');
    const ticketsSinAsignar = await authenticatedRequest(`${API_URL}/tickets/sin-asignar`);
    console.log('📋 Tickets sin asignar:', ticketsSinAsignar.length);
    ticketsSinAsignar.forEach(ticket => {
      console.log(`   - ${ticket.titulo} (${ticket.prioridad})`);
    });

    // 9. Obtener mis tickets (del usuario actual)
    console.log('\n9️⃣ Obtener mis tickets...');
    const misTickets = await authenticatedRequest(`${API_URL}/tickets/mis-tickets`);
    console.log('📋 Mis tickets:', misTickets.length);
    misTickets.forEach(ticket => {
      console.log(`   - ${ticket.titulo} (${ticket.estado})`);
    });

    // 10. Obtener tickets asignados a un técnico específico
    console.log('\n🔟 Obtener tickets asignados a técnico...');
    const ticketsAsignados = await authenticatedRequest(`${API_URL}/tickets/asignados/2`);
    console.log('📋 Tickets asignados al técnico:', ticketsAsignados.length);
    ticketsAsignados.forEach(ticket => {
      console.log(`   - ${ticket.titulo} (${ticket.estado})`);
    });

    console.log('\n🎉 ¡Todos los ejemplos completados exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejemplos de filtros disponibles
async function ejemplosFiltros() {
  console.log('\n🔍 Ejemplos de filtros disponibles:\n');

  const filtros = [
    { descripcion: 'Búsqueda por título', url: `${API_URL}/tickets?search=impresora` },
    { descripcion: 'Por estado', url: `${API_URL}/tickets?estado=pendiente` },
    { descripcion: 'Por prioridad', url: `${API_URL}/tickets?prioridad=alta` },
    { descripcion: 'Por categoría', url: `${API_URL}/tickets?categoria_id=1` },
    { descripcion: 'Por subcategoría', url: `${API_URL}/tickets?subcategoria_id=1` },
    { descripcion: 'Por dependencia', url: `${API_URL}/tickets?dependencia_id=1` },
    { descripcion: 'Por sede', url: `${API_URL}/tickets?sede_id=1` },
    { descripcion: 'Por técnico', url: `${API_URL}/tickets?tecnico_id=2` },
    { descripcion: 'Por solicitante', url: `${API_URL}/tickets?user_id=1` },
    { descripcion: 'Paginación', url: `${API_URL}/tickets?limit=5&page=1` },
    { descripcion: 'Combinación de filtros', url: `${API_URL}/tickets?estado=pendiente&prioridad=alta&categoria_id=1&limit=10` },
  ];

  filtros.forEach((filtro, index) => {
    console.log(`${index + 1}. ${filtro.descripcion}`);
    console.log(`   GET ${filtro.url}`);
  });

  console.log('\n🔐 Permisos por rol:');
  console.log('   👁️  VER: Todos los roles pueden ver tickets (filtrados por sede)');
  console.log('   ➕ CREAR: Todos los usuarios autenticados');
  console.log('   ✏️  EDITAR: Técnicos, admin y superadmin');
  console.log('   🗑️  ELIMINAR: Solo admin y superadmin');
}

// Ejecutar ejemplos
async function main() {
  await ejemploCompletoTickets();
  await ejemplosFiltros();
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ejemploCompletoTickets,
    ejemplosFiltros
  };
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  main();
}
