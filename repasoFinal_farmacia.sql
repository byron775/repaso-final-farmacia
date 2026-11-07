-- =====================================================================
-- UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA · PROGRAMACIÓN II
-- Repaso Examen Final: Reportes en PDF y Excel
-- Base de datos: repasoFinal  (Farmacia)
-- Ejecutar completo en MySQL Workbench (Ctrl + Shift + Enter)
-- =====================================================================

DROP DATABASE IF EXISTS repasoFinal;
CREATE DATABASE repasoFinal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE repasoFinal;

-- ---------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------
CREATE TABLE categoria (
  ID_CATEGORIA INT NOT NULL AUTO_INCREMENT,
  ESTADO       TINYINT(1) DEFAULT 1,
  NOMBRE       VARCHAR(65),
  DESCRIPCION  VARCHAR(65),
  PRIMARY KEY (ID_CATEGORIA)
);

CREATE TABLE medicamento (
  ID_MEDICAMENTO INT NOT NULL AUTO_INCREMENT,
  ESTADO         TINYINT(1) DEFAULT 1,
  NOMBRE         VARCHAR(65),
  LABORATORIO    VARCHAR(65),
  PRECIO         DECIMAL(10,2),
  STOCK          INT,
  ID_CATEGORIA   INT,
  PRIMARY KEY (ID_MEDICAMENTO),
  CONSTRAINT FK_MEDICAMENTO_CATEGORIA FOREIGN KEY (ID_CATEGORIA)
    REFERENCES categoria (ID_CATEGORIA)
);

CREATE TABLE cliente (
  ID_CLIENTE     INT NOT NULL AUTO_INCREMENT,
  ESTADO         TINYINT(1) DEFAULT 1,
  NOMBRE         VARCHAR(85),
  APELLIDO       VARCHAR(85),
  EMAIL          VARCHAR(85),
  TELEFONO       VARCHAR(25),
  FECHA_REGISTRO DATETIME,
  PRIMARY KEY (ID_CLIENTE)
);

CREATE TABLE venta (
  ID_VENTA     INT NOT NULL AUTO_INCREMENT,
  ESTADO       TINYINT(1) DEFAULT 1,
  FECHA_VENTA  DATETIME,
  ESTADO_VENTA TINYINT(1) DEFAULT 0,
  TOTAL        DECIMAL(10,2),
  ID_CLIENTE   INT,
  PRIMARY KEY (ID_VENTA),
  CONSTRAINT FK_VENTA_CLIENTE FOREIGN KEY (ID_CLIENTE)
    REFERENCES cliente (ID_CLIENTE)
);

CREATE TABLE venta_detalle (
  ID_VENTA_DETALLE INT NOT NULL AUTO_INCREMENT,
  CANTIDAD         INT,
  PRECIO_UNITARIO  DECIMAL(10,2),
  SUBTOTAL         DECIMAL(10,2),
  ID_VENTA         INT,
  ID_MEDICAMENTO   INT,
  PRIMARY KEY (ID_VENTA_DETALLE),
  CONSTRAINT FK_DETALLE_VENTA FOREIGN KEY (ID_VENTA)
    REFERENCES venta (ID_VENTA),
  CONSTRAINT FK_DETALLE_MEDICAMENTO FOREIGN KEY (ID_MEDICAMENTO)
    REFERENCES medicamento (ID_MEDICAMENTO)
);

-- ---------------------------------------------------------------------
-- Datos
-- ---------------------------------------------------------------------

-- Categorías (la 8 está anulada: ESTADO = 0)
INSERT INTO categoria (ESTADO, NOMBRE, DESCRIPCION) VALUES
  (1, 'Analgésicos', 'Medicamentos para aliviar el dolor'),
  (1, 'Antibióticos', 'Tratamiento de infecciones bacterianas'),
  (1, 'Antigripales', 'Alivio de síntomas de gripe y resfriado'),
  (1, 'Vitaminas', 'Suplementos vitamínicos y minerales'),
  (1, 'Dermatológicos', 'Cremas y tratamientos para la piel'),
  (1, 'Gastrointestinales', 'Tratamiento de malestares digestivos'),
  (1, 'Cuidado Infantil', 'Productos y medicamentos pediátricos'),
  (0, 'Homeopáticos', 'Productos naturales y homeopáticos');

-- Medicamentos (los ids 9 y 26 están anulados: ESTADO = 0)
INSERT INTO medicamento (ESTADO, NOMBRE, LABORATORIO, PRECIO, STOCK, ID_CATEGORIA) VALUES
  (1, 'Acetaminofén 500 mg', 'FarmaVida', 15.50, 120, 1),
  (1, 'Ibuprofeno 400 mg', 'Laboratorios Andinos', 22.00, 85, 1),
  (1, 'Naproxeno 550 mg', 'Medifarma', 35.75, 8, 1),
  (1, 'Diclofenaco Gel 1%', 'Bioquímica GT', 42.00, 30, 1),
  (1, 'Ketorolaco 10 mg', 'Lab. Centroamericano', 28.50, 4, 1),
  (1, 'Amoxicilina 500 mg', 'Laboratorios Andinos', 48.00, 60, 2),
  (1, 'Azitromicina 500 mg', 'Medifarma', 95.00, 25, 2),
  (1, 'Ciprofloxacino 500 mg', 'FarmaVida', 67.25, 6, 2),
  (0, 'Cefalexina 500 mg', 'Bioquímica GT', 58.00, 40, 2),
  (1, 'Antigripal Día y Noche', 'Lab. Centroamericano', 32.00, 150, 3),
  (1, 'Jarabe para la Tos 120 ml', 'FarmaVida', 45.50, 70, 3),
  (1, 'Loratadina 10 mg', 'Medifarma', 18.00, 95, 3),
  (1, 'Pastillas para la Garganta', 'Bioquímica GT', 12.75, 3, 3),
  (1, 'Vitamina C 1 g', 'Laboratorios Andinos', 55.00, 110, 4),
  (1, 'Complejo B Inyectable', 'Medifarma', 72.00, 20, 4),
  (1, 'Multivitamínico Adulto', 'FarmaVida', 125.00, 35, 4),
  (1, 'Hierro + Ácido Fólico', 'Lab. Centroamericano', 64.50, 9, 4),
  (1, 'Vitamina D3 1000 UI', 'Bioquímica GT', 89.00, 45, 4),
  (1, 'Crema Hidratante 200 g', 'Bioquímica GT', 78.00, 28, 5),
  (1, 'Clotrimazol Crema 1%', 'Laboratorios Andinos', 38.50, 50, 5),
  (1, 'Protector Solar FPS 50', 'FarmaVida', 145.00, 7, 5),
  (1, 'Hidrocortisona Crema', 'Medifarma', 41.00, 33, 5),
  (1, 'Omeprazol 20 mg', 'Lab. Centroamericano', 25.00, 130, 6),
  (1, 'Sales de Rehidratación', 'FarmaVida', 9.50, 200, 6),
  (1, 'Loperamida 2 mg', 'Medifarma', 19.75, 5, 6),
  (0, 'Antiácido Masticable', 'Bioquímica GT', 16.00, 90, 6),
  (1, 'Acetaminofén Infantil Jarabe', 'FarmaVida', 29.00, 65, 7),
  (1, 'Suero Oral Pediátrico', 'Laboratorios Andinos', 21.50, 55, 7),
  (1, 'Crema para Rozaduras', 'Bioquímica GT', 49.00, 2, 7),
  (1, 'Árnica Gotas 30 ml', 'Naturalia', 36.00, 15, 8);

-- Clientes (el 15 está anulado: ESTADO = 0)
INSERT INTO cliente (ESTADO, NOMBRE, APELLIDO, EMAIL, TELEFONO, FECHA_REGISTRO) VALUES
  (1, 'Carlos', 'Méndez', 'carlos.mendez@correo.com', '5521-3344', '2026-01-15 09:30:00'),
  (1, 'María', 'López', 'maria.lopez@correo.com', '4433-2211', '2026-01-22 10:15:00'),
  (1, 'José', 'Ramírez', 'jose.ramirez@correo.com', '5566-7788', '2026-02-03 14:00:00'),
  (1, 'Ana', 'García', 'ana.garcia@correo.com', '3322-1100', '2026-02-18 16:45:00'),
  (1, 'Luis', 'Hernández', 'luis.hernandez@correo.com', '5544-9988', '2026-03-05 11:20:00'),
  (1, 'Sofía', 'Morales', 'sofia.morales@correo.com', '4455-6677', '2026-03-12 08:50:00'),
  (1, 'Pedro', 'Castillo', 'pedro.castillo@correo.com', '5599-0011', '2026-04-01 13:10:00'),
  (1, 'Lucía', 'Pérez', 'lucia.perez@correo.com', '3344-5566', '2026-04-20 15:35:00'),
  (1, 'Jorge', 'Vásquez', 'jorge.vasquez@correo.com', '5511-2233', '2026-05-08 09:05:00'),
  (1, 'Elena', 'Rodríguez', 'elena.rodriguez@correo.com', '4477-8899', '2026-05-25 17:00:00'),
  (1, 'Miguel', 'Flores', 'miguel.flores@correo.com', '5588-4455', '2026-06-10 10:40:00'),
  (1, 'Gabriela', 'Cruz', 'gabriela.cruz@correo.com', '3399-6622', '2026-06-28 12:25:00'),
  (1, 'Andrés', 'Ortiz', 'andres.ortiz@correo.com', '5533-7744', '2026-07-14 14:55:00'),
  (1, 'Valeria', 'Reyes', 'valeria.reyes@correo.com', '4422-8833', '2026-07-30 16:10:00'),
  (0, 'Ricardo', 'Santos', 'ricardo.santos@correo.com', '5577-1199', '2026-08-02 11:00:00');

-- Ventas (las ventas 7 y 18 están anuladas: ESTADO = 0)
INSERT INTO venta (ESTADO, FECHA_VENTA, ESTADO_VENTA, TOTAL, ID_CLIENTE) VALUES
  (1, '2026-08-03 08:19:00', 1, 747.00, 8),
  (1, '2026-08-04 09:19:00', 1, 31.00, 12),
  (1, '2026-08-05 16:22:00', 1, 111.50, 4),
  (1, '2026-08-16 12:06:00', 1, 129.00, 13),
  (1, '2026-08-18 09:52:00', 1, 154.00, 2),
  (1, '2026-08-18 12:45:00', 1, 356.00, 8),
  (0, '2026-08-21 08:32:00', 1, 202.00, 4),
  (1, '2026-08-22 14:58:00', 1, 441.00, 6),
  (1, '2026-09-02 18:35:00', 1, 432.00, 13),
  (1, '2026-09-03 11:39:00', 1, 61.00, 6),
  (1, '2026-09-07 15:54:00', 1, 145.00, 14),
  (1, '2026-09-20 15:24:00', 1, 651.00, 8),
  (1, '2026-09-20 15:37:00', 1, 392.50, 3),
  (1, '2026-09-22 17:20:00', 1, 55.00, 12),
  (1, '2026-09-26 16:53:00', 1, 134.50, 8),
  (1, '2026-09-28 14:19:00', 1, 330.00, 8),
  (1, '2026-10-01 10:25:00', 1, 301.25, 9),
  (0, '2026-10-11 15:48:00', 1, 231.00, 1),
  (1, '2026-10-12 09:10:00', 1, 269.00, 1),
  (1, '2026-10-12 17:42:00', 1, 441.00, 5),
  (1, '2026-10-15 16:26:00', 1, 429.25, 11),
  (1, '2026-10-19 11:38:00', 1, 401.50, 12),
  (1, '2026-10-25 17:38:00', 1, 91.00, 1),
  (1, '2026-10-27 09:56:00', 1, 356.00, 9);

-- Detalle de ventas (SUBTOTAL = CANTIDAD * PRECIO_UNITARIO)
INSERT INTO venta_detalle (CANTIDAD, PRECIO_UNITARIO, SUBTOTAL, ID_VENTA, ID_MEDICAMENTO) VALUES
  (3, 145.00, 435.00, 1, 21),
  (4, 78.00, 312.00, 1, 19),
  (2, 15.50, 31.00, 2, 1),
  (2, 19.75, 39.50, 3, 25),
  (2, 36.00, 72.00, 3, 30),
  (2, 64.50, 129.00, 4, 17),
  (4, 38.50, 154.00, 5, 20),
  (4, 89.00, 356.00, 6, 18),
  (3, 41.00, 123.00, 7, 22),
  (4, 19.75, 79.00, 7, 25),
  (3, 32.00, 96.00, 8, 10),
  (4, 72.00, 288.00, 8, 15),
  (2, 28.50, 57.00, 8, 5),
  (2, 22.00, 44.00, 9, 2),
  (4, 42.00, 168.00, 9, 4),
  (4, 55.00, 220.00, 9, 14),
  (1, 18.00, 18.00, 10, 12),
  (2, 21.50, 43.00, 10, 28),
  (3, 18.00, 54.00, 11, 12),
  (2, 45.50, 91.00, 11, 11),
  (4, 64.50, 258.00, 12, 17),
  (1, 18.00, 18.00, 12, 12),
  (3, 125.00, 375.00, 12, 16),
  (4, 55.00, 220.00, 13, 14),
  (2, 18.00, 36.00, 13, 12),
  (3, 45.50, 136.50, 13, 11),
  (1, 55.00, 55.00, 14, 14),
  (2, 67.25, 134.50, 15, 8),
  (2, 78.00, 156.00, 16, 19),
  (3, 42.00, 126.00, 16, 4),
  (1, 48.00, 48.00, 16, 6),
  (3, 64.50, 193.50, 17, 17),
  (2, 36.00, 72.00, 17, 30),
  (1, 35.75, 35.75, 17, 3),
  (1, 41.00, 41.00, 18, 22),
  (2, 95.00, 190.00, 18, 7),
  (2, 49.00, 98.00, 19, 29),
  (3, 25.00, 75.00, 19, 23),
  (3, 32.00, 96.00, 19, 10),
  (4, 18.00, 72.00, 20, 12),
  (2, 28.50, 57.00, 20, 5),
  (4, 78.00, 312.00, 20, 19),
  (2, 32.00, 64.00, 21, 10),
  (3, 35.75, 107.25, 21, 3),
  (4, 64.50, 258.00, 21, 17),
  (2, 125.00, 250.00, 22, 16),
  (3, 29.00, 87.00, 22, 27),
  (1, 64.50, 64.50, 22, 17),
  (2, 45.50, 91.00, 23, 11),
  (4, 89.00, 356.00, 24, 18);

-- ---------------------------------------------------------------------
-- Verificación rápida
-- ---------------------------------------------------------------------
SELECT 'categoria' AS tabla, COUNT(*) AS registros FROM categoria
UNION ALL SELECT 'medicamento', COUNT(*) FROM medicamento
UNION ALL SELECT 'cliente', COUNT(*) FROM cliente
UNION ALL SELECT 'venta', COUNT(*) FROM venta
UNION ALL SELECT 'venta_detalle', COUNT(*) FROM venta_detalle;
