const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuración del servidor
const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Función para verificar si el proyecto está compilado
function isProjectCompiled() {
  const distPath = path.join(__dirname, 'dist');
  return fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'main.js'));
}

// Función para compilar el proyecto
function compileProject() {
  return new Promise((resolve, reject) => {
    console.log('🔨 Compilando proyecto...');
    
    const buildProcess = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Compilación exitosa');
        resolve();
      } else {
        console.error('❌ Error en la compilación');
        reject(new Error(`Build failed with code ${code}`));
      }
    });

    buildProcess.on('error', (error) => {
      console.error('❌ Error al ejecutar el build:', error);
      reject(error);
    });
  });
}

// Función para instalar dependencias si es necesario
function installDependencies() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
      console.log('📦 Instalando dependencias...');
      
      const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
        cwd: __dirname
      });

      installProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Dependencias instaladas');
          resolve();
        } else {
          console.error('❌ Error instalando dependencias');
          reject(new Error(`npm install failed with code ${code}`));
        }
      });

      installProcess.on('error', (error) => {
        console.error('❌ Error al instalar dependencias:', error);
        reject(error);
      });
    } else {
      resolve();
    }
  });
}

// Función para iniciar el servidor
async function startServer() {
  try {
    console.log('🚀 Iniciando servidor SIGETIC...');
    console.log(`📁 Directorio: ${__dirname}`);
    console.log(`🌍 Entorno: ${config.nodeEnv}`);
    console.log(`🔌 Puerto: ${config.port}`);
    console.log(`🏠 Host: ${config.host}`);

    // Verificar e instalar dependencias
    await installDependencies();

    // Verificar si el proyecto está compilado
    if (!isProjectCompiled()) {
      console.log('📝 Proyecto no compilado, compilando...');
      await compileProject();
    }

    // Iniciar el servidor
    console.log('🎯 Iniciando aplicación NestJS...');
    
    const serverProcess = spawn('node', ['dist/main.js'], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname,
      env: {
        ...process.env,
        NODE_ENV: config.nodeEnv,
        PORT: config.port,
        HOST: config.host
      }
    });

    // Manejar señales de terminación
    process.on('SIGINT', () => {
      console.log('\n🛑 Deteniendo servidor...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Deteniendo servidor...');
      serverProcess.kill('SIGTERM');
      process.exit(0);
    });

    serverProcess.on('close', (code) => {
      console.log(`\n📊 Servidor terminado con código: ${code}`);
      process.exit(code);
    });

    serverProcess.on('error', (error) => {
      console.error('❌ Error al iniciar el servidor:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

// Función para modo desarrollo
async function startDevServer() {
  try {
    console.log('🚀 Iniciando servidor SIGETIC en modo desarrollo...');
    
    await installDependencies();

    console.log('🎯 Iniciando aplicación NestJS en modo desarrollo...');
    
    const devProcess = spawn('npm', ['run', 'start:dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname,
      env: {
        ...process.env,
        NODE_ENV: 'development',
        PORT: config.port,
        HOST: config.host
      }
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

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

// Función para mostrar ayuda
function showHelp() {
  console.log(`
🚀 Servidor SIGETIC Backend

Uso:
  node server.js [comando]

Comandos:
  start     Iniciar servidor en modo producción
  dev       Iniciar servidor en modo desarrollo
  build     Solo compilar el proyecto
  help      Mostrar esta ayuda

Variables de entorno:
  PORT      Puerto del servidor (default: 5000)
  HOST      Host del servidor (default: localhost)
  NODE_ENV  Entorno de ejecución (development/production)

Ejemplos:
  node server.js start
  node server.js dev
  PORT=3000 node server.js start
  NODE_ENV=production node server.js start
`);
}

// Función principal
async function main() {
  const command = process.argv[2] || 'start';

  switch (command) {
    case 'start':
      await startServer();
      break;
    case 'dev':
      await startDevServer();
      break;
    case 'build':
      try {
        await installDependencies();
        await compileProject();
        console.log('✅ Compilación completada');
      } catch (error) {
        console.error('❌ Error en la compilación:', error.message);
        process.exit(1);
      }
      break;
    case 'help':
      showHelp();
      break;
    default:
      console.error(`❌ Comando desconocido: ${command}`);
      showHelp();
      process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
}

module.exports = {
  startServer,
  startDevServer,
  compileProject,
  installDependencies
};
