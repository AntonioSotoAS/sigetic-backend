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
  {
    nombre: 'Recuperación de Cuentas de usuario y contraseñas ',
    categoria_id: 1,
    activo: true,
  },
  {
    nombre: 'Certificados de usuario y contraseñas ',
    categoria_id: 2,
    activo: true,
  },
  
]

export const usuarioData = [
  {
    correo: 'superadmin@pj.gob.pe',
    password: '123456',
    nombres: 'Super',
    apellidos_paterno: 'Admin',
    apellidos_materno: 'User',
    dni: '12345678',
    telefono: '999888777',
    rol: 'superadmin',
    foto_perfil: 'public/img/foto_perfil/superadmin.jpg',
    activo: true,
  },
  {
    correo: 'admin@pj.gob.pe',
    password: '123456',
    nombres: 'Admin',
    apellidos_paterno: 'User',
    apellidos_materno: 'Test',
    dni: '87654321',
    telefono: '999888776',
    rol: 'admin',
    foto_perfil: 'public/img/foto_perfil/admin.jpg',
    activo: true,
  },
  {
    correo: 'coordinador@pj.gob.pe',
    password: '123456',
    nombres: 'Coordinador',
    apellidos_paterno: 'Especialista',
    apellidos_materno: 'User',
    dni: '11223344',
    telefono: '999888775',
    rol: 'jefe_soporte',
    foto_perfil: 'public/img/foto_perfil/coordinador.jpg',
    activo: true,
  },
  {
    correo: 'especialista@pj.gob.pe',
    password: '123456',
    nombres: 'Especialista',
    apellidos_paterno: 'Audiencia',
    apellidos_materno: 'User',
    dni: '44332211',
    telefono: '999888774',
    rol: 'ingeniero_soporte',
    foto_perfil: 'public/img/foto_perfil/especialista.jpg',
    activo: true,
  },
  {
    correo: 'admin.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Admin',
    apellidos_paterno: 'Norte',
    apellidos_materno: 'User',
    dni: '55667788',
    telefono: '999888773',
    rol: 'admin',
    foto_perfil: 'public/img/foto_perfil/admin_norte.jpg',
    activo: true,
  },
  {
    correo: 'especialista.norte@pj.gob.pe',
    password: '123456',
    nombres: 'Especialista',
    apellidos_paterno: 'Norte',
    apellidos_materno: 'User',
    dni: '88776655',
    telefono: '999888772',
    rol: 'ingeniero_soporte',
    foto_perfil: 'public/img/foto_perfil/especialista_norte.jpg',
    activo: true,
  },
  {
    correo: 'usuario.test@pj.gob.pe',
    password: '123456',
    nombres: 'Usuario',
    apellidos_paterno: 'Test',
    apellidos_materno: 'Demo',
    dni: '99887766',
    telefono: '999888771',
    rol: 'usuario',
    foto_perfil: 'public/img/foto_perfil/usuario_test.jpg',
    activo: true,
  },
  {
    correo: 'coordinador.sur@pj.gob.pe',
    password: '123456',
    nombres: 'Coordinador',
    apellidos_paterno: 'Sur',
    apellidos_materno: 'Regional',
    dni: '11223355',
    telefono: '999888770',
    rol: 'jefe_soporte',
    foto_perfil: 'public/img/foto_perfil/coordinador_sur.jpg',
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
    subcategoria_id: 3, // Periféricos
    prioridad: 'ALTA',
    estado: 'PENDIENTE',
    user_id: 1,
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
        user_id: 1,
      },
    ],
  },
  {
    titulo: 'Software lento',
    descripcion: 'El sistema está muy lento, tarda en responder',
    categoria_id: 2, // Software
    subcategoria_id: 5, // Sistema Operativo
    prioridad: 'MEDIA',
    estado: 'ASIGNADO',
    user_id: 2,
    dependencia_id: 2,
    sede_id: 1,
    tecnico_id: 3,
    fecha_asignacion: new Date(),
    fecha_resolucion: null,
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 2,
      },
      {
        comentario: 'Asignado al técnico para revisión',
        tipo: 'INTERNO',
        user_id: 1,
      },
    ],
  },
  {
    titulo: 'Impresora no funciona',
    descripcion: 'La impresora no imprime, marca error de papel',
    categoria_id: 1, // Hardware
    subcategoria_id: 1, // Impresora
    prioridad: 'URGENTE',
    estado: 'EN_PROCESO',
    user_id: 4,
    dependencia_id: 3,
    sede_id: 1,
    tecnico_id: 3,
    fecha_asignacion: new Date(),
    fecha_resolucion: null,
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 4,
      },
      {
        comentario: 'Técnico en camino',
        tipo: 'INTERNO',
        user_id: 3,
      },
    ],
  },
  {
    titulo: 'Acceso denegado',
    descripcion: 'No puedo acceder al sistema, me dice acceso denegado',
    categoria_id: 2, // Software
    subcategoria_id: 6, // Aplicaciones
    prioridad: 'ALTA',
    estado: 'RESUELTO',
    user_id: 5,
    dependencia_id: 4,
    sede_id: 1,
    tecnico_id: 3,
    fecha_asignacion: new Date(),
    fecha_resolucion: new Date(),
    fecha_cierre: null,
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 5,
      },
      {
        comentario: 'Problema de permisos resuelto',
        tipo: 'INTERNO',
        user_id: 3,
      },
    ],
  },
  {
    titulo: 'Teclado dañado',
    descripcion: 'Algunas teclas no responden',
    comentarios: 'Es un teclado nuevo',
    categoria: 'HARDWARE',
    prioridad: 'BAJA',
    estado: 'CERRADO',
    user_id: 6,
    dependencia_id: 5,
    sede_id: 1,
    tecnico_id: 3,
    fecha_asignacion: new Date(),
    fecha_resolucion: new Date(),
    fecha_cierre: new Date(),
    comentarios_ticket: [
      {
        comentario: 'Ticket creado automáticamente',
        tipo: 'PUBLICO',
        user_id: 6,
      },
      {
        comentario: 'Teclado reemplazado',
        tipo: 'INTERNO',
        user_id: 3,
      },
      {
        comentario: 'Ticket cerrado',
        tipo: 'PUBLICO',
        user_id: 6,
      },
    ],
  },
] 