#!/usr/bin/env node

/**
 * Script de inicio rápido para desarrollo
 * Ejecuta: node start-dev.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando SIGETIC Backend en modo desarrollo...');
console.log('📁 Directorio:', __dirname);
console.log('⏰ Fecha:', new Date().toLocaleString());

// Configurar variables de entorno para desarrollo
const env = {
  ...process.env,
  NODE_ENV: 'development',
  PORT: process.env.PORT || '5000',
  HOST: process.env.HOST || 'localhost'
};

console.log('🌍 Entorno:', env.NODE_ENV);
console.log('🔌 Puerto:', env.PORT);
console.log('🏠 Host:', env.HOST);

// Iniciar el servidor en modo desarrollo
const devProcess = spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: env
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor de desarrollo...');
  devProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor de desarrollo...');
  devProcess.kill('SIGTERM');
  process.exit(0);
});

devProcess.on('close', (code) => {
  console.log(`\n📊 Servidor de desarrollo terminado con código: ${code}`);
  process.exit(code);
});

devProcess.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor de desarrollo:', error);
  process.exit(1);
});
