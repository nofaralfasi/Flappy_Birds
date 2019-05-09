SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


create DATABASE IF NOT EXISTS 'flappybirds';
USE 'flappybirds';
--
--CREATE TABLE IF NOT EXISTS 'highscores'(
-- 'hs_id' integer PRIMARY KEY AUTOINCREMENT,
--   'hs_player' text NOT NULL,
-- 'hs_score' integer NOT NULL,
-- table_constraint
--);

create TABLE IF NOT EXISTS 'highscores'(
  'hs_id' INT(11) NOT NULL AUTO_INCREMENT,
  'hs_player' VARCHAR(8) NOT NULL,
  'hs_score' INT NOT NULL,
  PRIMARY KEY ('hs_id')
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


--
--create TABLE t1 (
--  id          INT(11) NOT NULL AUTO_INCREMENT,
--  description VARCHAR(50),
--  PRIMARY KEY(id)
--) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
--
--SET NAMES latin1;