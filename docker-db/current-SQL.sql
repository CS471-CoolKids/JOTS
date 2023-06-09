-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema jots_sandbox
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jots_sandbox
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jots_sandbox` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `jots_sandbox` ;

-- -----------------------------------------------------
-- Table `jots_sandbox`.`manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`manager` (
  `manager_id` INT NOT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`manager_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`course` (
  `course_id` INT NOT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `manager_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  INDEX `manager_id` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `course_ibfk_1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `jots_sandbox`.`manager` (`manager_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`managerdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`managerdetails` (
  `manager_id` INT NOT NULL,
  `details` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  CONSTRAINT `managerdetails_ibfk_1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `jots_sandbox`.`manager` (`manager_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`student` (
  `student_id` INT NOT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`studentcourse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`studentcourse` (
  `student_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`student_id`, `course_id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `studentcourse_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `jots_sandbox`.`student` (`student_id`),
  CONSTRAINT `studentcourse_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `jots_sandbox`.`course` (`course_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`tutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`tutor` (
  `tutor_id` INT NOT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  `resume` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`tutor_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`studentrating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`studentrating` (
  `student_id` INT NULL DEFAULT NULL,
  `tutor_id` INT NULL DEFAULT NULL,
  `rating` DECIMAL(2,1) NULL DEFAULT NULL,
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  INDEX `tutor_id` (`tutor_id` ASC) VISIBLE,
  CONSTRAINT `studentrating_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `jots_sandbox`.`student` (`student_id`),
  CONSTRAINT `studentrating_ibfk_2`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `jots_sandbox`.`tutor` (`tutor_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`tutor_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`tutor_session` (
  `session_id` INT NOT NULL AUTO_INCREMENT,
  `tutor_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`session_id`),
  INDEX `fk_session_tutor_idx` (`tutor_id` ASC) VISIBLE,
  INDEX `fk_session_student_idx` (`student_id` ASC) VISIBLE,
  CONSTRAINT `fk_session_student`
    FOREIGN KEY (`student_id`)
    REFERENCES `jots_sandbox`.`student` (`student_id`),
  CONSTRAINT `fk_session_tutor`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `jots_sandbox`.`tutor` (`tutor_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`tutorcourse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`tutorcourse` (
  `tutor_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`tutor_id`, `course_id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `tutorcourse_ibfk_1`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `jots_sandbox`.`tutor` (`tutor_id`),
  CONSTRAINT `tutorcourse_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `jots_sandbox`.`course` (`course_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`tutorrating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots_sandbox`.`tutorrating` (
  `tutor_id` INT NULL DEFAULT NULL,
  `student_id` INT NULL DEFAULT NULL,
  `rating` DECIMAL(2,1) NULL DEFAULT NULL,
  INDEX `tutor_id` (`tutor_id` ASC) VISIBLE,
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  CONSTRAINT `tutorrating_ibfk_1`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `jots_sandbox`.`tutor` (`tutor_id`),
  CONSTRAINT `tutorrating_ibfk_2`
    FOREIGN KEY (`student_id`)
    REFERENCES `jots_sandbox`.`student` (`student_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `jots_sandbox` ;

-- -----------------------------------------------------
-- procedure GetStudentDetails
-- -----------------------------------------------------

DELIMITER $$
USE `jots_sandbox`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentDetails`(IN `studentId` INT)
BEGIN
  SELECT *
  FROM `student`
  WHERE `student_id` = studentId;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
