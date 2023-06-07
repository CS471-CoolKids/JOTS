-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  UNIQUE INDEX `manager_id_UNIQUE` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `course_ibfk_1`
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
  PRIMARY KEY (`student_id`),
  UNIQUE INDEX `studentcourse_course_id_UNIQUE` (`course_id` ASC) VISIBLE,
  CONSTRAINT `studentcourse_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `jots_sandbox`.`student` (`student_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `studentcourse_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `jots_sandbox`.`course` (`course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jots_sandbox`.`managerdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jots
