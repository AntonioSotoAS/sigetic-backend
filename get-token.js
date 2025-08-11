// Script para obtener un token JWT de prueba
// Ejecuta: node get-token.js

const https = require('https');
const http = require('http');

// Configuración
const API_URL = 'http://localhost:3001/api/v1/auth/login';
const TEST_CREDENTIALS = {
  correo: 'admin@sigetic.com', // Ajusta según tus datos de prueba
  password: 'admin123' // Ajusta según tus datos de prueba
};

// Función para hacer request con cookies
function makeRequestWithCookies(url, method = 'GET', data = null, cookies = []) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies.join('; '),
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = client.request(options, (res) => {
      let responseData = '';
      const responseCookies = res.headers['set-cookie'] || [];

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
            cookies: responseCookies
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            cookies: responseCookies
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = client.request(options, (res) => {
      let responseData = '';
      const responseCookies = res.headers['set-cookie'] || [];

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
            cookies: responseCookies
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            cookies: responseCookies
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function getToken() {
  try {
    console.log('🔐 Intentando obtener token JWT...');
    console.log(`📡 URL: ${API_URL}`);
    console.log(`👤 Credenciales: ${TEST_CREDENTIALS.correo}`);
    
    const response = await makeRequest(API_URL, 'POST', TEST_CREDENTIALS);
    
    console.log(`📊 Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      const token = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      
      console.log('✅ Login exitoso!');
      console.log('🔑 Access Token JWT:');
      console.log(token);
      
      if (refreshToken) {
        console.log('\n🔄 Refresh Token:');
        console.log(refreshToken);
      }
      
      console.log('\n🍪 Cookies configuradas:');
      console.log('- access_token (15 minutos)');
      console.log('- refresh_token (7 días)');
      console.log('- token (15 minutos, para Socket.IO)');
      
      console.log('\n📋 Para Socket.IO, usa el access_token:');
      console.log(token);
      console.log('\n🌐 Abre test-socket.html en tu navegador y pega el token');
      
      // Probar el endpoint de perfil con cookies
      console.log('\n🧪 Probando endpoint de perfil...');
      const profileResponse = await makeRequestWithCookies(
        'http://localhost:3001/api/v1/auth/perfil',
        'GET',
        null,
        [`access_token=${token}`]
      );
      
      if (profileResponse.statusCode === 200) {
        console.log('✅ Perfil obtenido exitosamente con cookies!');
        console.log('👤 Usuario:', profileResponse.data.user.nombres);
      } else {
        console.log('❌ Error al obtener perfil:', profileResponse.data);
      }
      
    } else {
      console.log('❌ Error al obtener token:');
      console.log(response.data);
      
      // Sugerencias de solución
      console.log('\n💡 Posibles soluciones:');
      console.log('1. Verifica que el servidor esté corriendo en puerto 3001');
      console.log('2. Verifica que las credenciales sean correctas');
      console.log('3. Ejecuta el seed para crear usuarios de prueba:');
      console.log('   POST http://localhost:3001/api/v1/seed');
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n💡 Verifica que:');
    console.log('1. El servidor esté corriendo: npm run start:dev');
    console.log('2. El puerto 3001 esté disponible');
    console.log('3. No haya firewall bloqueando la conexión');
  }
}

// Ejecutar
getToken();


