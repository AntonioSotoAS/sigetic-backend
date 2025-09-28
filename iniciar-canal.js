#!/usr/bin/env node

/**
 * 🚀 Script de inicio rápido para el canal SIGETIC
 * Ejecuta: node iniciar-canal.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🎯 Iniciando SIGETIC Backend para tu canal...');
console.log('📁 Directorio:', __dirname);
console.log('⏰ Fecha:', new Date().toLocaleString());
console.log('');

// Configuración específica para el canal
const config = {
  port: process.env.PORT || '5000',
  host: process.env.HOST || 'localhost',
  nodeEnv: 'development'
};

console.log('⚙️ Configuración del Canal:');
console.log(`   🔌 Puerto: ${config.port}`);
console.log.log(`   🏠 Host: ${config.host}`);
console.log(`   🌍 Entorno: ${config.nodeEnv}`);
console.log('');

// Configurar variables de entorno
const env = {
  ...process.env,
  NODE_ENV: config.nodeEnv,
  PORT: config.port,
  HOST: config.host
};

console.log('🚀 Iniciando servidor...');
console.log('💡 El servidor estará disponible en: http://localhost:' + config.port);
console.log('💡 Presiona Ctrl+C para detener el servidor');
console.log('');

// Iniciar el servidor en modo desarrollo
const devProcess = spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: env
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor del canal...');
  devProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor del canal...');
  devProcess.kill('SIGTERM');
  process.exit(0);
});

devProcess.on('close', (code) => {
  console.log(`\n📊 Servidor del canal terminado con código: ${code}`);
  process.exit(code);
});

devProcess.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor del canal:', error);
  process.exit(1);
});
