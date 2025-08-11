export const sedeData = [
  {
    nombre: 'ARCHIVO CENTRAL SAENZ PEÑA',
    direccion: 'Av. Saenz Peña 123, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE CALLAO - COCHERA-CHIMBOTE',
    direccion: 'Av. Callao 456, Cochera, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE CENTRAL - CHIMBOTE',
    direccion: 'Av. Central 789, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE DE CABANA',
    direccion: 'Plaza Principal 321, Cabana',
    ciudad: 'Cabana',
    activo: true,
  },
  {
    nombre: 'SEDE DE CASMA',
    direccion: 'Av. Casma 654, Casma',
    ciudad: 'Casma',
    activo: true,
  },
  {
    nombre: 'SEDE DE CHAMPAGNAT - CHIMBOTE',
    direccion: 'Av. Champagnat 987, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE DE CORONGO',
    direccion: 'Plaza Mayor 147, Corongo',
    ciudad: 'Corongo',
    activo: true,
  },
  {
    nombre: 'SEDE DE NEPEÑA',
    direccion: 'Av. Nepeña 258, Nepeña',
    ciudad: 'Nepeña',
    activo: true,
  },
  {
    nombre: 'SEDE DE SANTA',
    direccion: 'Av. Santa 369, Santa',
    ciudad: 'Santa',
    activo: true,
  },
  {
    nombre: 'SEDE DEL MODULO BASICO - NV',
    direccion: 'Av. Módulo Básico 741, Nuevo Chimbote',
    ciudad: 'Nuevo Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE DEL NCPP',
    direccion: 'Av. NCPP 852, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE DERRAMA - VIOLENCIA FAM',
    direccion: 'Av. Derrama 963, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE GUARDERIA - LOS LUCIANIT',
    direccion: 'Av. Los Lucianit 159, Chimbote',
    ciudad: 'Chimbote',
    activo: true,
  },
  {
    nombre: 'SEDE HUARMEY',
    direccion: 'Av. Huarmey 753, Huarmey',
    ciudad: 'Huarmey',
    activo: true,
  },
  {
    nombre: 'SEDE HUARMEY - JIP',
    direccion: 'Av. Huarmey JIP 951, Huarmey',
    ciudad: 'Huarmey',
    activo: true,
  },
]

export const categoriaData = [
  {
    nombre: 'hardware',
    activo: true,
  },
  {
    nombre: 'software',
    activo: true,
  }
]

export const subcategoriaData = [
  // Hardware subcategorías
  {
    nombre: 'CPU',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'MONITOR',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'TECLADO',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'MOUSE',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'IMPRESORA',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'ESCANER',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'CÁMARA',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'PARLANTES',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'FOTOCOPIADORA',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'ESTABILIZADOR',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'SUPRESOR DE PICO',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'LECTORA DE CÓDIGO DE BARRAS',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'OTROS',
    categoria_id: 1,
    activo: true,
  },
  
  // Software subcategorías
  {
    nombre: 'MI COMPUTADORA NO ENCIENDE',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'MI COMPUTADORA ESTÁ MUY LENTA',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'PERDÍ CONEXIÓN A INTERNET',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON LOS PROGRAMAS (WORD – EXCEL – POWER POINT)',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'NO PUEDO ACCEDER A SAGA (SISTEMA DE PERSONAL)',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL SGD (SISTEMA DE GESTIÓN DOCUMENTARIA)',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL SIJ y/o EJE',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL SIGEM',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL SISTEMA DE NOTIFICACIÓN DIGITAL',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL REDAM',
    categoria_id: 2,
    activo: true,
  },
  {
    nombre: 'TENGO PROBLEMAS CON EL SERNOT',
    categoria_id: 2,
    activo: true,
  },
]

export const usuarioData = [
  // SUPERADMIN
  {
    correo: 'superadmin@pj.gob.pe',
    password: '123456',
    nombres: 'Carlos Alberto',
    apellidos_paterno: 'Rodríguez',
    apellidos_materno: 'Vargas',
    dni: '12345678',
    telefono: '999888777',
    rol: 'superadmin',
    cargo_id: 1, // PRESIDENTE DE CORTE
    foto_perfil: 'public/img/foto_perfil/superadmin.jpg',
    activo: true,
  },
  
  // ADMIN
  {
    correo: 'admin@pj.gob.pe',
    password: '123456',
    nombres: 'María Elena',
    apellidos_paterno: 'García',
    apellidos_materno: 'López',
    dni: '87654321',
    telefono: '999888776',
    rol: 'admin',
    cargo_id: 2, // JUEZ ESPECIALIZADO 7U-4
    foto_perfil: 'public/img/foto_perfil/admin.jpg',
    activo: true,
  },
  {
    correo: 'admin.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Roberto Carlos',
    apellidos_paterno: 'Martínez',
    apellidos_materno: 'Fernández',
    dni: '55667788',
    telefono: '999888775',
    rol: 'admin',
    cargo_id: 3, // JUEZ DE PAZ LETRADO
    foto_perfil: 'public/img/foto_perfil/admin_norte.jpg',
    activo: true,
  },
  {
    correo: 'admin.sur@pj.gob.pe',
    password: '123456',
    nombres: 'Ana Patricia',
    apellidos_paterno: 'Herrera',
    apellidos_materno: 'Jiménez',
    dni: '33445566',
    telefono: '999888774',
    rol: 'admin',
    cargo_id: 4, // SECRETARIO DE SALA
    foto_perfil: 'public/img/foto_perfil/admin_sur.jpg',
    activo: true,
  },
  
  // JEFE_SOPORTE
  {
    correo: 'jefe.soporte@pj.gob.pe',
    password: '123456',
    nombres: 'Luis Fernando',
    apellidos_paterno: 'Torres',
    apellidos_materno: 'Ramos',
    dni: '11223344',
    telefono: '999888773',
    rol: 'jefe_soporte',
    cargo_id: 13, // ASISTENTE DE SISTEMAS
    foto_perfil: 'public/img/foto_perfil/jefe_soporte.jpg',
    activo: true,
  },
  {
    correo: 'jefe.soporte.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Carmen Rosa',
    apellidos_paterno: 'Silva',
    apellidos_materno: 'Mendoza',
    dni: '22334455',
    telefono: '999888784',
    rol: 'jefe_soporte',
    cargo_id: 14, // TECNICO ADMINISTRATIVO
    foto_perfil: 'public/img/foto_perfil/jefe_soporte_norte.jpg',
    activo: true,
  },
  {
    correo: 'jefe.soporte.sur@pj.gob.pe',
    password: '123456',
    nombres: 'Jorge Luis',
    apellidos_paterno: 'Pérez',
    apellidos_materno: 'González',
    dni: '33445566',
    telefono: '999888785',
    rol: 'jefe_soporte',
    cargo_id: 15, // ASISTENTE ADMINISTRATIVO
    foto_perfil: 'public/img/foto_perfil/jefe_soporte_sur.jpg',
    activo: true,
  },
  
  // INGENIERO_SOPORTE
  {
    correo: 'ingeniero.soporte@pj.gob.pe',
    password: '123456',
    nombres: 'Diego Alejandro',
    apellidos_paterno: 'Morales',
    apellidos_materno: 'Castro',
    dni: '44332211',
    telefono: '999888779',
    rol: 'ingeniero_soporte',
    cargo_id: 16, // ASISTENTE JURISDICCIONAL DE CUSTODIA DE EXPEDIENTES Y GRABACIONES
    foto_perfil: 'public/img/foto_perfil/ingeniero_soporte.jpg',
    activo: true,
  },
  {
    correo: 'ingeniero.soporte.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Sandra Patricia',
    apellidos_paterno: 'Ruiz',
    apellidos_materno: 'Díaz',
    dni: '88776655',
    telefono: '999888791',
    rol: 'ingeniero_soporte',
    cargo_id: 17, // ASISTENTE ADMINISTRATIVO
    foto_perfil: 'public/img/foto_perfil/ingeniero_soporte_norte.jpg',
    activo: true,
  },
  {
    correo: 'ingeniero.soporte.sur@pj.gob.pe',
    password: '123456',
    nombres: 'Miguel Ángel',
    apellidos_paterno: 'Flores',
    apellidos_materno: 'Vega',
    dni: '66778899',
    telefono: '999888792',
    rol: 'ingeniero_soporte',
    cargo_id: 18, // ASISTENTE JURISDICCIONAL DE C.G.E.
    foto_perfil: 'public/img/foto_perfil/ingeniero_soporte_sur.jpg',
    activo: true,
  },
  {
    correo: 'ingeniero.soporte.central@pj.gob.pe',
    password: '123456',
    nombres: 'Rosa María',
    apellidos_paterno: 'Chávez',
    apellidos_materno: 'Ríos',
    dni: '77889900',
    telefono: '999888793',
    rol: 'ingeniero_soporte',
    cargo_id: 19, // JUEZ SUPERIOR
    foto_perfil: 'public/img/foto_perfil/ingeniero_soporte_central.jpg',
    activo: true,
  },
  
  // USUARIO
  {
    correo: 'usuario@pj.gob.pe',
    password: '123456',
    nombres: 'Juan Carlos',
    apellidos_paterno: 'Ramírez',
    apellidos_materno: 'Soto',
    dni: '99887766',
    telefono: '999888794',
    rol: 'usuario',
    cargo_id: 20, // ESPECIALISTA JUDICIAL DE AUDIENCIA DE JUZGADO
    foto_perfil: 'public/img/foto_perfil/usuario.jpg',
    activo: true,
  },
  {
    correo: 'usuario.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Lucía Elena',
    apellidos_paterno: 'Navarro',
    apellidos_materno: 'Córdova',
    dni: '11223355',
    telefono: '999888786',
    rol: 'usuario',
    cargo_id: 21, // PERITO JUDICIAL
    foto_perfil: 'public/img/foto_perfil/usuario_norte.jpg',
    activo: true,
  },
  {
    correo: 'usuario.sur@pj.gob.pe',
    password: '123456',
    nombres: 'Pedro Manuel',
    apellidos_paterno: 'Valdez',
    apellidos_materno: 'Aguilar',
    dni: '22334466',
    telefono: '999888787',
    rol: 'usuario',
    cargo_id: 22, // ESPECIALISTA JUDICIAL DE JUZGADO
    foto_perfil: 'public/img/foto_perfil/usuario_sur.jpg',
    activo: true,
  },
  {
    correo: 'usuario.central@pj.gob.pe',
    password: '123456',
    nombres: 'Isabel Cristina',
    apellidos_paterno: 'Mendoza',
    apellidos_materno: 'Paredes',
    dni: '33445577',
    telefono: '999888788',
    rol: 'usuario',
    cargo_id: 23, // COORDINADOR I
    foto_perfil: 'public/img/foto_perfil/usuario_central.jpg',
    activo: true,
  },
  {
    correo: 'usuario.este@pj.gob.pe',
    password: '123456',
    nombres: 'Ricardo José',
    apellidos_paterno: 'Salazar',
    apellidos_materno: 'Miranda',
    dni: '44556688',
    telefono: '999888789',
    rol: 'usuario',
    cargo_id: 24, // ASISTENTE ADMINISTRATIVO II
    foto_perfil: 'public/img/foto_perfil/usuario_este.jpg',
    activo: true,
  },
  {
    correo: 'usuario.oeste@pj.gob.pe',
    password: '123456',
    nombres: 'Verónica Alejandra',
    apellidos_paterno: 'Cruz',
    apellidos_materno: 'Bustamante',
    dni: '55667799',
    telefono: '999888790',
    rol: 'usuario',
    cargo_id: 25, // ESPECIALISTA JUDICIAL DE AUDIENCIA
    foto_perfil: 'public/img/foto_perfil/usuario_oeste.jpg',
    activo: true,
  },
]

export const cargoData = [
  {
    nombre: 'JUEZ ESPECIALIZADO',
    activo: true,
  },
  {
    nombre: 'JUEZ ESPECIALIZADO 7U-4',
    activo: true,
  },
  {
    nombre: 'JUEZ DE PAZ LETRADO',
    activo: true,
  },
  {
    nombre: 'SECRETARIO DE SALA',
    activo: true,
  },
  {
    nombre: 'ASISTENTE LEGAL',
    activo: true,
  },
  {
    nombre: 'AUXILIAR JUDICIAL',
    activo: true,
  },
  {
    nombre: 'SECRETARIO JUDICIAL',
    activo: true,
  },
  {
    nombre: 'ASISTENTE EN SERVICIOS ADMINISTRATIVOS',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JUDICIAL',
    activo: true,
  },
  {
    nombre: 'TECNICO JUDICIAL',
    activo: true,
  },
  {
    nombre: 'ASISTENTE EN SERVICIOS DE COMUNICACIONES I',
    activo: true,
  },
  {
    nombre: 'SECRETARIO/A JUDICIAL',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE SISTEMAS',
    activo: true,
  },
  {
    nombre: 'TECNICO ADMINISTRATIVO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL DE CUSTODIA DE EXPEDIENTES Y GRABACIONES',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL DE C.G.E.',
    activo: true,
  },
  {
    nombre: 'JUEZ SUPERIOR',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL DE AUDIENCIA DE JUZGADO',
    activo: true,
  },
  {
    nombre: 'PERITO JUDICIAL',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL DE JUZGADO',
    activo: true,
  },
  {
    nombre: 'COORDINADOR I',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO II',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL DE AUDIENCIA',
    activo: true,
  },
  {
    nombre: 'APOYO EN PERICIAS CONTABLES JUDICIALES',
    activo: true,
  },
  {
    nombre: 'RELATOR',
    activo: true,
  },
  {
    nombre: 'PSICOLOGO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE SOCIAL',
    activo: true,
  },
  {
    nombre: 'Apoyo Temas Asist.Social',
    activo: true,
  },
  {
    nombre: 'ANALISTA II',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO EN ARCHIVO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE CUSTODIA Y GRABACION',
    activo: true,
  },
  {
    nombre: 'APOYO ADMINISTRATIVO',
    activo: true,
  },
  {
    nombre: 'APOYO ADMINISTRATIVO EN LAS AREAS DE NOTIFICACIONES',
    activo: true,
  },
  {
    nombre: 'MADRE CUIDADORA',
    activo: true,
  },
  {
    nombre: 'APO. PREPARA ALIMENT CUNA',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO I',
    activo: true,
  },
  {
    nombre: 'JEFE DE UNIDAD',
    activo: true,
  },
  {
    nombre: 'Apoyo en Peritajes',
    activo: true,
  },
  {
    nombre: 'AUXILIAR ADMINISTRATIVO III',
    activo: true,
  },
  {
    nombre: 'AUXILIAR ADMINISTRATIVO I',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE COMUNICACIONES',
    activo: true,
  },
  {
    nombre: 'AUXILIAR ADMINISTRATIVO II',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL DE CUSTODIA DE EXPEDIENTES',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE ASISTENCIA SOCIAL',
    activo: true,
  },
  {
    nombre: 'TECNICO ADMINISTRATIVO I',
    activo: true,
  },
  {
    nombre: 'ANALISTA EN REMUNERACIONES Y PLANILLAS',
    activo: true,
  },
  {
    nombre: 'ASISTENTE EN SERVICIOS DE COMUNICACIONES',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL DE JUZGADO',
    activo: true,
  },
  {
    nombre: 'APOYO ADMINISTRATIVO Y/O JURISDICCIONAL',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL DE SALA',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE INFORMATICA',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JURISDICCIONAL DE SALA',
    activo: true,
  },
  {
    nombre: 'ADMINISTRADOR MODULO DEL NCPP',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA JUDICIAL DE AUDIENCIA DE SALA',
    activo: true,
  },
  {
    nombre: 'RESG./CUSTOD./VIGILANCIA',
    activo: true,
  },
  {
    nombre: 'Coordinar Activ.Seguridad',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO (A)',
    activo: true,
  },
  {
    nombre: 'GERENTE_UE',
    activo: true,
  },
  {
    nombre: 'ASISTENTE INFORMATICO',
    activo: true,
  },
  {
    nombre: 'JUEZ MIXTO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE GRABACIÓN',
    activo: true,
  },
  {
    nombre: 'AGENTE DE SEGURIDAD',
    activo: true,
  },
  {
    nombre: 'ASISTENTE DE ATENCION AL PUBLICO',
    activo: true,
  },
  {
    nombre: 'COORDINADOR',
    activo: true,
  },
  {
    nombre: 'CHOFER',
    activo: true,
  },
  {
    nombre: 'COORDINADOR/A DE CAUSA/ AUDIENCIA',
    activo: true,
  },
  {
    nombre: 'ADMINISTRADOR',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO/A',
    activo: true,
  },
  {
    nombre: 'REVISOR',
    activo: true,
  },
  {
    nombre: 'SUBADMINISTRADOR',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA LEGAL',
    activo: true,
  },
  {
    nombre: 'ADMINISTRADOR I',
    activo: true,
  },
  {
    nombre: 'SECRETARIO/A DE SALA',
    activo: true,
  },
  {
    nombre: 'AUXILIAR ADMINISTRATIVO/A',
    activo: true,
  },
  {
    nombre: 'Apoyo Org.Jurisd.Juez Sup',
    activo: true,
  },
  {
    nombre: 'APOYO EN ORG. JURISDICCIO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE JUDICIAL II',
    activo: true,
  },
  {
    nombre: 'ADMINISTRADOR DEL MODULO CORPORATIVO DE FAMILIA',
    activo: true,
  },
  {
    nombre: 'APOYO EN LOS ORGANOS JURISDICCIONALES Y/O ADMINISTRATIVOS',
    activo: true,
  },
  {
    nombre: 'ASISTENTE LEGAL DEL MAU',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA LEGAL DE AUDIENCIA',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA LEGAL DE AUDIENCIAS',
    activo: true,
  },
  {
    nombre: 'ESPECIALISTA LEGAL DE JUZGADO',
    activo: true,
  },
  {
    nombre: 'APOYO EN NOTIFICACIONES',
    activo: true,
  },
  {
    nombre: 'TECNICO ADMINISTRATIVO II',
    activo: true,
  },
  {
    nombre: 'AUXILIAR EN SERVICIOS ADMINISTRATIVOS',
    activo: true,
  },
  {
    nombre: 'AUXILIAR ADMINISTRATIVO',
    activo: true,
  },
  {
    nombre: 'COORDINADOR /A I',
    activo: true,
  },
  {
    nombre: 'ASESOR DE CORTE',
    activo: true,
  },
  {
    nombre: 'PRESIDENTE DE CORTE',
    activo: true,
  },
  {
    nombre: 'COORDINADOR(CSJ_UE)',
    activo: true,
  },
  {
    nombre: 'AGENTE DE SEGURIDAD.',
    activo: true,
  },
  {
    nombre: 'Servicio Resg. Cust.y Vig',
    activo: true,
  },
  {
    nombre: 'TÉCNICO EN VIGILANCIA Y CONTROL',
    activo: true,
  },
  {
    nombre: 'CAJERO',
    activo: true,
  },
  {
    nombre: 'ASISTENTE ADMINISTRATIVO EN TESORERIA',
    activo: true,
  },
  {
    nombre: 'CAJERO I',
    activo: true,
  },
  {
    nombre: 'APOYO EN MANTENIMIENTO Y OTROS SERVICIOS',
    activo: true,
  },
  {
    nombre: 'CHOFER I',
    activo: true,
  },
  {
    nombre: 'CONDUCCION DE VEHICULO',
    activo: true,
  },
  {
    nombre: 'TÉCNICO EN OPERACIÓN DE EQUIPO VEHICULAR',
    activo: true,
  },
]

export const dependenciaData = [
  {
    nombre: 'ADMINISTRACIÓN',
    descripcion: 'Departamento de Administración',
    activo: true,
  },
  {
    nombre: 'CONTABILIDAD',
    descripcion: 'Departamento de Contabilidad',
    activo: true,
  },
  {
    nombre: 'RECURSOS HUMANOS',
    descripcion: 'Departamento de Recursos Humanos',
    activo: true,
  },
  {
    nombre: 'TECNOLOGÍA DE LA INFORMACIÓN',
    descripcion: 'Departamento de TI',
    activo: true,
  },
  {
    nombre: 'MARKETING',
    descripcion: 'Departamento de Marketing',
    activo: true,
  },
  {
    nombre: 'VENTAS',
    descripcion: 'Departamento de Ventas',
    activo: true,
  },
  {
    nombre: 'ATENCIÓN AL CLIENTE',
    descripcion: 'Departamento de Atención al Cliente',
    activo: true,
  },
  {
    nombre: 'LOGÍSTICA',
    descripcion: 'Departamento de Logística',
    activo: true,
  },
  {
    nombre: 'FINANZAS',
    descripcion: 'Departamento de Finanzas',
    activo: true,
  },
  {
    nombre: 'LEGAL',
    descripcion: 'Departamento Legal',
    activo: true,
  },
  {
    nombre: 'OPERACIONES',
    descripcion: 'Departamento de Operaciones',
    activo: true,
  },
  {
    nombre: 'DESARROLLO',
    descripcion: 'Departamento de Desarrollo',
    activo: true,
  },
  {
    nombre: 'SOPORTE TÉCNICO',
    descripcion: 'Departamento de Soporte Técnico',
    activo: true,
  },
  {
    nombre: 'CALIDAD',
    descripcion: 'Departamento de Calidad',
    activo: true,
  },
  {
    nombre: 'INVESTIGACIÓN Y DESARROLLO',
    descripcion: 'Departamento de I+D',
    activo: true,
  },
]

export const ticketData = [
  {
    titulo: 'Monitor no enciende',
    descripcion: 'El monitor no muestra imagen, está completamente negro',
    categoria_id: 1, // Hardware
    subcategoria_id: 1, // Recuperación de Cuentas
    prioridad: 'ALTA',
    estado: 'PENDIENTE',
    user_id: 13, // usuario@pj.gob.pe
    dependencia_id: 1,
    sede_id: 1,
    tecnico_id: null,
    fecha_asignacion: null,
    fecha_resolucion: null,
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 13,
      },
    ],
  },
  {
    titulo: 'Software lento',
    descripcion: 'El sistema está muy lento, tarda en responder',
    categoria_id: 2, // Software
    subcategoria_id: 2, // Certificados
    prioridad: 'MEDIA',
    estado: 'ASIGNADO',
    user_id: 14, // usuario.norte@pj.gob.pe
    dependencia_id: 2,
    sede_id: 1,
    tecnico_id: 9, // ingeniero.soporte@pj.gob.pe
    fecha_asignacion: new Date(),
    fecha_resolucion: null,
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 14,
      },
      {
        comentario: 'Asignado al técnico para revisión',
        tipo: 'INTERNO',
        user_id: 7, // jefe.soporte@pj.gob.pe
      },
    ],
  },
  {
    titulo: 'Impresora no funciona',
    descripcion: 'La impresora no imprime, marca error de papel',
    categoria_id: 1, // Hardware
    subcategoria_id: 1, // Recuperación de Cuentas
    prioridad: 'URGENTE',
    estado: 'EN_PROCESO',
    user_id: 15, // usuario.sur@pj.gob.pe
    dependencia_id: 3,
    sede_id: 1,
    tecnico_id: 10, // ingeniero.soporte.norte@pj.gob.pe
    fecha_asignacion: new Date(),
    fecha_resolucion: null,
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 15,
      },
      {
        comentario: 'Técnico en camino',
        tipo: 'INTERNO',
        user_id: 10,
      },
    ],
  },
  {
    titulo: 'Acceso denegado',
    descripcion: 'No puedo acceder al sistema, me dice acceso denegado',
    categoria_id: 2, // Software
    subcategoria_id: 2, // Certificados
    prioridad: 'ALTA',
    estado: 'RESUELTO',
    user_id: 16, // usuario.central@pj.gob.pe
    dependencia_id: 4,
    sede_id: 1,
    tecnico_id: 11, // ingeniero.soporte.sur@pj.gob.pe
    fecha_asignacion: new Date(),
    fecha_resolucion: new Date(),
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 16,
      },
      {
        comentario: 'Problema de permisos resuelto',
        tipo: 'INTERNO',
        user_id: 11,
      },
    ],
  },
  {
    titulo: 'Teclado dañado',
    descripcion: 'Algunas teclas no responden',
    categoria_id: 1, // Hardware
    subcategoria_id: 1, // Recuperación de Cuentas
    prioridad: 'BAJA',
    estado: 'CERRADO',
    user_id: 17, // usuario.este@pj.gob.pe
    dependencia_id: 5,
    sede_id: 1,
    tecnico_id: 12, // ingeniero.soporte.central@pj.gob.pe
    fecha_asignacion: new Date(),
    fecha_resolucion: new Date(),
    fecha_cierre: new Date(),
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 17,
      },
      {
        comentario: 'Teclado reemplazado',
        tipo: 'INTERNO',
        user_id: 12,
      },
      {
        comentario: 'Ticket cerrado',
        tipo: 'PUBLICO',
        user_id: 17,
      },
    ],
  },
] 