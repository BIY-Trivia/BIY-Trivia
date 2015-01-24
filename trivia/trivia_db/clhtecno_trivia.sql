-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 24-01-2015 a las 08:18:27
-- Versión del servidor: 5.5.40-36.1-log
-- Versión de PHP: 5.4.23

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `clhtecno_trivia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `idQuestion` int(11) NOT NULL AUTO_INCREMENT,
  `question` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topic` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `answer1` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `answer2` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `answer3` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rightanswer` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idQuestion`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`idQuestion`, `question`, `topic`, `answer1`, `answer2`, `answer3`, `rightanswer`) VALUES
(7, 'How many legs does a spider have?', 'Insects', '3', '8', '6', '8'),
(10, 'What does BIY stands for?', 'Need to know!', 'Build it yourself', 'Bring it yellow', 'Bounce in yoga', 'Build it yourself'),
(11, 'What does the fox say?', 'Song lyrics', 'Ring-ding-ding-ding-dingeringeding!', 'woof woof woof woof', 'squeak squeak squeak', 'Ring-ding-ding-ding-dingeringeding!'),
(17, 'Who invented the Newton''s laws?', 'Physics', 'Zackarias Mathew', 'Sir Isiaac Newton', 'Issac Newton', 'Issac Newton'),
(18, 'Cual es el apellido de Daniel?', 'Personal', 'GonzÃ¡lez Viera Petit-Jean', 'Fernandez Herrera', 'RodrÃ­guez MartÃ­nez', 'GonzÃ¡lez Viera Petit-Jean'),
(19, 'Who was Remy?', 'Movies', 'The rich guy who never loved', 'A very young man who wanted a little brother', 'A rat who wanted to cook', 'A rat who wanted to cook'),
(20, 'What is a ferrari?', 'Cars', 'A very fast car', 'A plane', 'A beautiful car', 'A very fast car');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
