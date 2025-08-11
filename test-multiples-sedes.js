// Test para la funcionalidad de múltiples sedes asignadas
const axios = require('axios');

async function testMultiplesSedes() {
  try {
    console.log('🧪 Test de múltiples sedes asignadas...');
    
    const baseURL = 'http://localhost:5000/api/v1';
    
    // 1. Login como superadmin
    console.log('\n🔐 Paso 1: Login como superadmin...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      correo: 'admin@example.com', // Cambia por un usuario superadmin
      password: 'password123'
    });
    
    const token = loginResponse.data.access_token;
    console.log('✅ Login exitoso');
    
    // 2. Obtener todas las sedes
    console.log('\n🏢 Paso 2: Obteniendo sedes...');
    const sedesResponse = await axios.get(`${baseURL}/sedes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const sedes = sedesResponse.data.data;
    console.log('✅ Sedes obtenidas:', sedes.length);
    
    if (sedes.length < 2) {
      console.log('❌ Se necesitan al menos 2 sedes para el test');
      return;
    }
    
    // 3. Obtener usuarios ingenieros/jefes
    console.log('\n👥 Paso 3: Obteniendo usuarios...');
    const usuariosResponse = await axios.get(`${baseURL}/usuarios?rol=ingeniero_soporte`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const usuarios = usuariosResponse.data.data;
    console.log('✅ Usuarios obtenidos:', usuarios.length);
    
    if (usuarios.length === 0) {
      console.log('❌ No hay usuarios ingeniero_soporte');
      return;
    }
    
    const usuario = usuarios[0];
    console.log('👤 Usuario seleccionado:', {
      id: usuario.id,
      nombres: usuario.nombres,
      rol: usuario.rol
    });
    
    // 4. Asignar múltiples sedes al usuario
    console.log('\n🏢 Paso 4: Asignando múltiples sedes...');
    const sedeIds = sedes.slice(0, 2).map(s => s.id); // Tomar las primeras 2 sedes
    
    const assignResponse = await axios.post(`${baseURL}/usuarios/${usuario.id}/assign-sedes`, {
      sede_ids: sedeIds
    }, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Sedes asignadas:', assignResponse.data);
    
    // 5. Verificar sedes asignadas
    console.log('\n🏢 Paso 5: Verificando sedes asignadas...');
    const sedesAsignadasResponse = await axios.get(`${baseURL}/usuarios/sedes-asignadas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('✅ Sedes asignadas al usuario:', sedesAsignadasResponse.data.length);
    sedesAsignadasResponse.data.forEach(sede => {
      console.log('   -', sede.nombre);
    });
    
    // 6. Login como el usuario con múltiples sedes
    console.log('\n🔐 Paso 6: Login como usuario con múltiples sedes...');
    const userLoginResponse = await axios.post(`${baseURL}/auth/login`, {
      correo: usuario.correo,
      password: 'password123' // Asegúrate de usar la contraseña correcta
    });
    
    const userToken = userLoginResponse.data.access_token;
    console.log('✅ Login del usuario exitoso');
    
    // 7. Obtener tickets (debería ver tickets de todas sus sedes asignadas)
    console.log('\n🎫 Paso 7: Obteniendo tickets...');
    const ticketsResponse = await axios.get(`${baseURL}/tickets`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    
    console.log('✅ Tickets obtenidos:', ticketsResponse.data.total);
    console.log('📊 Tickets por sede:');
    
    const ticketsPorSede = {};
    ticketsResponse.data.data.forEach(ticket => {
      const sedeNombre = ticket.sede?.nombre || 'Sin sede';
      ticketsPorSede[sedeNombre] = (ticketsPorSede[sedeNombre] || 0) + 1;
    });
    
    Object.entries(ticketsPorSede).forEach(([sede, count]) => {
      console.log(`   - ${sede}: ${count} tickets`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Ejecutar el test
testMultiplesSedes(); 