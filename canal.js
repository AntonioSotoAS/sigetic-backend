#!/usr/bin/env node

/**
 * 🎯 INICIO RÁPIDO PARA TU CANAL SIGETIC
 * Solo ejecuta: node canal.js
 */

console.log('🎯 SIGETIC Backend - Iniciando para tu canal...');
console.log('');

// Ejecutar el servidor principal en modo desarrollo
require('child_process').spawn('node', ['server.js', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});
