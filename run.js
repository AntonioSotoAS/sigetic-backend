// 🚀 EJECUTAR SIGETIC - SÚPER SIMPLE
// Solo ejecuta: node run.js

require('child_process').spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true
});
