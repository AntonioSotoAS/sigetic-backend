-- Migración para crear la tabla usuario_sedes (relación muchos a muchos)
-- Ejecutar este SQL en tu base de datos MySQL

CREATE TABLE usuario_sedes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  sede_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE CASCADE,
  
  UNIQUE KEY unique_usuario_sede (usuario_id, sede_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_usuario_sedes_usuario_id ON usuario_sedes(usuario_id);
CREATE INDEX idx_usuario_sedes_sede_id ON usuario_sedes(sede_id); 