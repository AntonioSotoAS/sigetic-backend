#!/usr/bin/env node

/**
 * Script de inicio para producción
 * Ejecuta: node start-prod.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Iniciando SIGETIC Backend en modo producción...');
console.log('📁 Directorio:', __dirname);
console.log('⏰ Fecha:', new Date().toLocaleString());

// Verificar si el proyecto está compilado
const distPath = path.join(__dirname, 'dist');
const mainJsPath = path.join(distPath, 'main.js');

if (!fs.existsSync(mainJsPath)) {
  console.log('❌ Error: El proyecto no está compilado.');
  console.log('💡 Ejecuta primero: npm run build');
  console.log('💡 O usa: node server.js build');
  process.exit(1);
}

// Configurar variables de entorno para producción
const env = {
  ...process.env,
  NODE_ENV: 'production',
  PORT: process.env.PORT || '5000',
  HOST: process.env.HOST || 'localhost'
};

console.log('🌍 Entorno:', env.NODE_ENV);
console.log('🔌 Puerto:', env.PORT);
console.log('🏠 Host:', env.HOST);

// Iniciar el servidor en modo producción
const prodProcess = spawn('node', ['dist/main.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: env
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor de producción...');
  prodProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor de producción...');
  prodProcess.kill('SIGTERM');
  process.exit(0);
});

prodProcess.on('close', (code) => {
  console.log(`\n📊 Servidor de producción terminado con código: ${code}`);
  process.exit(code);
});

prodProcess.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor de producción:', error);
  process.exit(1);
});
