-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stylegram_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stylegram_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stylegram_db` DEFAULT CHARACTER SET utf8 ;
USE `stylegram_db` ;

-- -----------------------------------------------------
-- Table `stylegram_db`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `nombre` VARCHAR(40) NOT NULL COMMENT 'Nombre del cliente ',
  `correo_electronico` VARCHAR(254) NOT NULL COMMENT 'Correo electrónico \ndel cliente ',
  `password` VARCHAR(128) NOT NULL COMMENT 'Contraseña con la \ncual iniciara sesión ',
  `whatsapp` VARCHAR(20) NOT NULL COMMENT 'Numero de \nWhatsApp del \ncliente ',
  `ciudad` VARCHAR(30) NOT NULL COMMENT 'Ciudad en la que \nvive ',
  `foto_url` VARCHAR(225) NULL COMMENT 'Url de la imagen \nque usara como \nfoto de perfil',
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `idClientes_UNIQUE` (`id_cliente` ASC) VISIBLE,
  UNIQUE INDEX `correo_electronico_UNIQUE` (`correo_electronico` ASC) VISIBLE,
  UNIQUE INDEX `whatsapp_UNIQUE` (`whatsapp` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`salones_virtuales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`salones_virtuales` (
  `id_salon` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `nombre_estilista` VARCHAR(40) NOT NULL COMMENT 'Nombre del estilista o barbero ',
  `nombre_salon` VARCHAR(40) NOT NULL COMMENT 'Nombre del negocio (salón de belleza o Barberia)',
  `correo_electronico` VARCHAR(254) NOT NULL COMMENT 'Correo electrónico del estilista',
  `password` VARCHAR(128) NOT NULL COMMENT 'Contraseña con la cual iniciara sesión',
  `whatsapp` VARCHAR(20) NOT NULL COMMENT 'Numero de WhatsApp del estilista ',
  `horario_atencion` VARCHAR(255) NULL COMMENT 'Texto en el que el estilista dirá los días y horario en el que esta abierto su local ',
  `descripcion` VARCHAR(255) NULL COMMENT 'La descripción del salón de belleza o barberia ',
  `servicios` VARCHAR(255) NULL COMMENT 'Los servicios que ofrece el salón ',
  `ciudad` VARCHAR(30) NOT NULL COMMENT 'Ciudad en la que está ubicado ',
  `direccion` VARCHAR(45) NOT NULL COMMENT 'Dirección exacta del salón de belleza o barberia ',
  `publico_objetivo` VARCHAR(20) NOT NULL COMMENT 'Publico que atiende',
  `opcion_compra` VARCHAR(20) NOT NULL COMMENT 'Especifica si los productos los vende online o solo en el salón (físico) ',
  `foto_url` VARCHAR(225) NULL COMMENT 'Url de la imagen que usara como foto de perfil',
  PRIMARY KEY (`id_salon`),
  UNIQUE INDEX `idsalones_virtuales_UNIQUE` (`id_salon` ASC) VISIBLE,
  UNIQUE INDEX `salones_virtualescol_correo_UNIQUE` (`correo_electronico` ASC) INVISIBLE,
  UNIQUE INDEX `salones_virtualescol_whatsapp_UNIQUE` (`whatsapp` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`salones_favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`salones_favoritos` (
  `cliente` INT NOT NULL COMMENT 'ID del cliente',
  `salon` INT NOT NULL COMMENT 'ID del salón marcado como favorito ',
  PRIMARY KEY (`cliente`, `salon`),
  INDEX `fk_clientes_has_salones_virtuales_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  INDEX `fk_clientes_has_salones_virtuales_clientes_idx` (`cliente` ASC) VISIBLE,
  CONSTRAINT `fk_clientes_has_salones_virtuales_clientes`
    FOREIGN KEY (`cliente`)
    REFERENCES `stylegram_db`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clientes_has_salones_virtuales_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria ',
  `nombre` VARCHAR(45) NOT NULL COMMENT 'Nombre del producto ',
  `precio` DECIMAL(10,2) NOT NULL COMMENT 'Precio del producto',
  `descripcion` VARCHAR(45) NULL COMMENT 'Descripción del producto',
  `cantidad` INT NOT NULL COMMENT 'La cantidad que posee el salón de este mismo producto ',
  `foto_url` VARCHAR(225) NOT NULL COMMENT 'Url de la imagen del producto ',
  `vendedor` INT NOT NULL COMMENT 'ID del salón que lo vende ',
  PRIMARY KEY (`id_producto`),
  UNIQUE INDEX `idproductos_UNIQUE` (`id_producto` ASC) VISIBLE,
  INDEX `fk_productos_salones_virtuales1_idx` (`vendedor` ASC) VISIBLE,
  CONSTRAINT `fk_productos_salones_virtuales1`
    FOREIGN KEY (`vendedor`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`citas` (
  `id_cita` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria ',
  `servicio` VARCHAR(45) NULL COMMENT 'El servicio que solicita el cliente',
  `fecha_hora` DATETIME NOT NULL COMMENT 'La fecha y la hora en la que esta programada la cita ',
  `estado` VARCHAR(20) NOT NULL COMMENT 'Muestra si la cita ya esta confirmada y agendada o está pendiente (por confirmar) ',
  `salon` INT NOT NULL COMMENT 'ID del salón al cual se solicitó la cita ',
  `cliente` INT NOT NULL COMMENT 'ID del cliente quien solicito la cita',
  PRIMARY KEY (`id_cita`),
  UNIQUE INDEX `idcitas_UNIQUE` (`id_cita` ASC) VISIBLE,
  INDEX `fk_citas_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  INDEX `fk_citas_clientes1_idx` (`cliente` ASC) VISIBLE,
  CONSTRAINT `fk_citas_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_citas_clientes1`
    FOREIGN KEY (`cliente`)
    REFERENCES `stylegram_db`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`calificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`calificacion` (
  `salon` INT NOT NULL COMMENT 'ID del salón calificado. ',
  `cliente` INT NOT NULL COMMENT 'ID del cliente que califica ',
  `calificacion` INT NOT NULL COMMENT 'Puntuación del 1 al 5 que le da el cliente al salón',
  `reseña` VARCHAR(225) NULL COMMENT 'Comentario que el cliente le deja al salón',
  PRIMARY KEY (`salon`, `cliente`),
  INDEX `fk_salones_virtuales_has_clientes_clientes1_idx` (`cliente` ASC) VISIBLE,
  INDEX `fk_salones_virtuales_has_clientes_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  CONSTRAINT `fk_salones_virtuales_has_clientes_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_salones_virtuales_has_clientes_clientes1`
    FOREIGN KEY (`cliente`)
    REFERENCES `stylegram_db`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`registro_financiero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`registro_financiero` (
  `id_registro` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria ',
  `tipo` VARCHAR(20) NOT NULL COMMENT 'Aquí se especifica si es ingreso o egreso ',
  `valor` DECIMAL(10,2) UNSIGNED NOT NULL COMMENT 'El valor del ingreso o del egreso ',
  `categoria` VARCHAR(30) NOT NULL COMMENT 'La categoría del ingreso o egreso, para facilitar su clasificación. ',
  `descripcion` VARCHAR(100) NULL COMMENT 'Una descripción del ingreso o del egreso registrado ',
  `salon` INT NOT NULL COMMENT 'ID del salón el cual hizo el registro ',
  PRIMARY KEY (`id_registro`),
  UNIQUE INDEX `idregistro_financiero_UNIQUE` (`id_registro` ASC) VISIBLE,
  INDEX `fk_registro_financiero_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  CONSTRAINT `fk_registro_financiero_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`galeria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`galeria` (
  `id_foto` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `foto_url` VARCHAR(225) NOT NULL COMMENT 'Url de la imagen',
  `salon` INT NOT NULL COMMENT 'Id del salón que publica la foto',
  PRIMARY KEY (`id_foto`),
  UNIQUE INDEX `idgaleria_UNIQUE` (`id_foto` ASC) VISIBLE,
  INDEX `fk_galeria_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  CONSTRAINT `fk_galeria_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stylegram_db`.`recordatorio_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stylegram_db`.`recordatorio_pagos` (
  `id_recordatorio` INT NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria ',
  `categoria` VARCHAR(30) NOT NULL COMMENT 'La categoría del pago, para facilitar su clacificación ',
  `descripcion` VARCHAR(100) NULL COMMENT 'La descripción del pago a realizar ',
  `valor` DECIMAL(10,2) NOT NULL COMMENT 'Cuanto debe pagar ',
  `fecha` DATE NOT NULL COMMENT 'La fecha en la que se debe hacer el págo ',
  `salon` INT NOT NULL COMMENT 'ID del salón que registro el pago futuro ',
  PRIMARY KEY (`id_recordatorio`),
  UNIQUE INDEX `idrecordatorio_pagos_UNIQUE` (`id_recordatorio` ASC) VISIBLE,
  INDEX `fk_recordatorio_pagos_salones_virtuales1_idx` (`salon` ASC) VISIBLE,
  CONSTRAINT `fk_recordatorio_pagos_salones_virtuales1`
    FOREIGN KEY (`salon`)
    REFERENCES `stylegram_db`.`salones_virtuales` (`id_salon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
