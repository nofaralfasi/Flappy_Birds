SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS 'flappybirds';
USE 'flappybirds';


CREATE TABLE IF NOT EXISTS 'highscores'(
  'hs_id' INT NOT NULL AUTO_INCREMENT,
  'hs_player' VARCHAR(8) NOT NULL,
  'hs_score' INT NOT NULL,
  PRIMARY KEY ('hs_id')
) ENGINE=InnoDB;