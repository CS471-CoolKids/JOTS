-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema jotsdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jotsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jotsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `jotsdb` ;

-- -----------------------------------------------------
-- Table `jotsdb`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jotsdb`.`courses` (
  `CourseID` VARCHAR(9) NOT NULL,
  `CourseName` VARCHAR(45) NOT NULL,
  `Textbook` VARCHAR(45) NULL DEFAULT NULL,
  `HomeworkProblems` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`CourseID`),
  UNIQUE INDEX `CourseID_UNIQUE` (`CourseID` ASC) VISIBLE,
  UNIQUE INDEX `CourseName_UNIQUE` (`CourseName` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jotsdb`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jotsdb`.`students` (
  `FNAME` VARCHAR(45) NOT NULL,
  `LNAME` VARCHAR(45) NOT NULL,
  `StudentID` INT NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Rating` INT NULL DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  UNIQUE INDEX `StudentID_UNIQUE` (`StudentID` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jotsdb`.`tutors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jotsdb`.`tutors` (
  `TutorID` INT NOT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(45) NULL DEFAULT NULL,
  `FName` VARCHAR(45) NULL DEFAULT NULL,
  `LName` VARCHAR(45) NULL DEFAULT NULL,
  `Approved` TINYINT NULL DEFAULT NULL,
  `Rating` VARCHAR(45) NULL DEFAULT NULL,
  `Credentials` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`TutorID`),
  UNIQUE INDEX `TutorID_UNIQUE` (`TutorID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jotsdb`.`tutor_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jotsdb`.`tutor_session` (
  `TutorID` INT NOT NULL,
  `StudentID` INT NOT NULL,
  `StartTime` DATETIME NULL DEFAULT NULL,
  `EndTime` DATETIME NULL DEFAULT NULL,
  `IsRepeating` TINYINT NULL DEFAULT NULL,
  `Course` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`TutorID`, `StudentID`),
  UNIQUE INDEX `TutorID_UNIQUE` (`TutorID` ASC) VISIBLE,
  UNIQUE INDEX `StudentID_UNIQUE` (`StudentID` ASC) VISIBLE,
  INDEX `CourseID_idx` (`Course` ASC) VISIBLE,
  CONSTRAINT `CourseID`
    FOREIGN KEY (`Course`)
    REFERENCES `jotsdb`.`courses` (`CourseID`),
  CONSTRAINT `StudentID`
    FOREIGN KEY (`StudentID`)
    REFERENCES `jotsdb`.`students` (`StudentID`),
  CONSTRAINT `TutorID`
    FOREIGN KEY (`TutorID`)
    REFERENCES `jotsdb`.`tutors` (`TutorID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
