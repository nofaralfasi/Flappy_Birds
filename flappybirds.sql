SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `flappybirds` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `flappybirds`;


CREATE TABLE IF NOT EXISTS `highscores` (
  `hs_id` int(11) NOT NULL AUTO_INCREMENT,
  `hs_player` varchar(8) NOT NULL,
  `hs_score` int(11) NOT NULL,
  PRIMARY KEY (`hs_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

