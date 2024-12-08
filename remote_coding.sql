-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 08, 2024 at 07:32 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `remote_coding`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `action` varchar(50) NOT NULL,
  `userID` int(11) NOT NULL,
  `adminID` int(11) NOT NULL,
  `changes` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`action`, `userID`, `adminID`, `changes`) VALUES
('EDIT_USER', 1004, 1001, '{\"username\":\"testDeleteEdit\",\"email\":\"test@delete.com\",\"role\":\"student\"}'),
('EDIT_USER', 1004, 1001, '{\"username\":\"testDeleteEditTwo\",\"email\":\"test@delete.com\",\"role\":\"student\"}'),
('EDIT_USER', 1004, 1001, '{\"username\":\"testDelete\",\"email\":\"test@delete.com\",\"role\":\"student\"}'),
('EDIT_USER', 1001, 1001, '{\"username\":\"testadmin\",\"email\":\"admin@test.com\",\"role\":\"admin\"}'),
('EDIT_USER', 1001, 1008, '{\"username\":\"testadmin\",\"email\":\"admin@test.com\",\"role\":\"Admin\"}'),
('EDIT_USER', 1004, 1008, '{\"username\":\"testDelete\",\"email\":\"test@delete.com\",\"role\":\"Student\"}'),
('EDIT_USER', 1008, 1001, '{\"username\":\"testAdmin1234\",\"email\":\"testing@test.com\",\"role\":\"Admin\"}'),
('EDIT_USER', 1010, 1001, '{\"username\":\"testAdd\",\"email\":\"test@test2.com\",\"role\":\"Student\"}'),
('EDIT_USER', 1010, 1001, '{\"username\":\"testAdd\",\"email\":\"testadd@test.com\",\"role\":\"Student\"}'),
('EDIT_USER', 1011, 1001, '{\"username\":\"addUser\",\"email\":\"testuser@test.com\",\"role\":\"Student\"}'),
('EDIT_USER', 1011, 1001, '{\"username\":\"editUser\",\"email\":\"edit@edit.com\",\"role\":\"Student\"}'),
('EDIT_USER', 1014, 1001, '{\"username\":\"testDelete\",\"email\":\"testing@delete.com\",\"role\":\"Student\"}');

-- --------------------------------------------------------

--
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
  `cardID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `topicID` int(11) NOT NULL,
  `question` varchar(300) NOT NULL,
  `answer` varchar(300) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flashcards`
--

INSERT INTO `flashcards` (`cardID`, `userID`, `topicID`, `question`, `answer`, `level`, `created_at`, `updated_at`) VALUES
(3001, 1002, 7001, 'What are opening and closing tags?', '<html> = open, </html> = closed', 5, '2024-09-30 08:33:40', '2024-09-30 08:33:40'),
(3002, 1002, 7001, 'how many h sizes are there?', '6 sizes - h1 to h6', 5, '2024-09-30 20:24:59', '2024-09-30 20:24:59'),
(3003, 1002, 7001, 'What is the correct format for leaving an HTML comment?', '<!-- leave a comment -->', 3, '2024-10-07 19:03:39', '2024-10-07 19:03:39'),
(3004, 1002, 7001, 'How do you add a link in HTML?', 'anchor tags\r\n<a href=\"http://linkhere\">text for link here</a>', 4, '2024-10-07 19:05:04', '2024-10-07 19:05:04'),
(3005, 1002, 7001, 'What does HTML stand for?', 'Hypertext Markup Language', 3, '2024-10-07 19:07:34', '2024-10-07 19:07:34'),
(3006, 1002, 7001, 'How to add an image in HTML', '<img src=\"link\"> (no closing tag needed for img)', 2, '2024-10-07 19:08:21', '2024-10-07 19:08:21'),
(3007, 1003, 7001, 'test student 2', 'answer 2', 1, '2024-10-07 20:11:03', '2024-10-07 20:11:03'),
(3008, 1002, 7002, 'what does CSS stand for?', 'Cascading StyleSheets', 2, '2024-10-13 15:52:18', '2024-10-13 15:52:18'),
(3009, 1002, 7004, 'Is React a framework or a library?', 'React is a library. It lets you put components together, but it doesn’t prescribe how to do routing and data fetching. ', 3, '2024-10-13 18:14:06', '2024-10-13 18:14:06'),
(3010, 1002, 7004, 'Is React a framework or a library?', 'React is a library. It lets you put components together, but it doesn’t prescribe how to do routing and data fetching. ', 4, '2024-10-13 18:16:10', '2024-10-13 18:16:10'),
(3011, 1002, 7005, 'testing a question', ' in python', 2, '2024-10-13 18:20:45', '2024-10-13 18:20:45'),
(3012, 1002, 7005, 'how did python get its name?', 'Not from the snake! The creator was a fan of Monty Python.', 2, '2024-10-13 18:26:38', '2024-10-13 18:26:38'),
(3013, 1002, 7005, 'testing q', 'answer testing - edit added', 2, '2024-10-13 18:30:35', '2024-10-13 18:30:35'),
(3014, 1002, 7005, 'testing3', 'test answer 3 edit add\r\n', 1, '2024-10-13 18:31:37', '2024-10-13 18:31:37'),
(3015, 1002, 7005, 'testing 4', 'test again - edit added', 2, '2024-10-13 18:32:26', '2024-10-13 18:32:26'),
(3023, 1002, 7001, 'testing edit', 'test -editing added', 1, '2024-11-04 18:50:31', '2024-11-04 18:50:31'),
(3025, 1002, 7005, 'testing 5', 'testing answer', 2, '2024-11-20 18:12:32', '2024-11-20 18:12:32'),
(3026, 1002, 7005, 'test1234', 'test234', 2, '2024-11-20 18:17:37', '2024-11-20 18:17:37'),
(3029, 1003, 7005, 'test', 'testing', 2, '2024-11-27 18:46:32', '2024-11-27 18:46:32'),
(3031, 1011, 7005, 'test', 'test this edit', 2, '2024-12-04 20:10:07', '2024-12-04 20:10:07'),
(3032, 1002, 7005, 'new flashcard', 'new answer', 2, '2024-12-08 12:38:07', '2024-12-08 12:38:07'),
(3033, 1002, 7005, 'test', 'test', 1, '2024-12-08 12:45:30', '2024-12-08 12:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `LoginLog`
--

CREATE TABLE `LoginLog` (
  `loginID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `loginTime` datetime NOT NULL,
  `logoutTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LoginLog`
--

INSERT INTO `LoginLog` (`loginID`, `userID`, `loginTime`, `logoutTime`) VALUES
(1, 1002, '2024-10-21 19:25:30', NULL),
(2, 1002, '2024-10-21 19:49:55', NULL),
(3, 1002, '2024-10-21 20:02:26', NULL),
(4, 1002, '2024-10-21 20:03:59', NULL),
(5, 1002, '2024-10-21 20:07:25', NULL),
(6, 1002, '2024-10-21 20:10:32', NULL),
(7, 1002, '2024-10-21 20:11:33', NULL),
(8, 1002, '2024-10-21 20:14:10', NULL),
(9, 1002, '2024-10-21 20:15:34', NULL),
(10, 1002, '2024-10-21 20:19:21', NULL),
(11, 1002, '2024-10-21 20:27:36', NULL),
(12, 1001, '2024-10-21 20:27:52', NULL),
(13, 1001, '2024-10-21 20:29:16', NULL),
(14, 1002, '2024-10-21 20:42:16', NULL),
(15, 1002, '2024-10-21 20:46:44', '2024-10-21 20:46:54'),
(16, 1002, '2024-10-21 20:50:39', '2024-10-21 20:50:52'),
(17, 1001, '2024-10-21 20:51:20', '2024-10-21 20:51:36'),
(18, 1001, '2024-10-23 18:28:06', '2024-10-23 18:31:03'),
(19, 1002, '2024-10-23 18:31:12', '2024-10-23 18:39:20'),
(20, 1001, '2024-10-23 18:39:28', '2024-10-23 18:40:52'),
(21, 1002, '2024-10-30 20:56:36', NULL),
(22, 1002, '2024-11-03 15:08:54', NULL),
(23, 1002, '2024-11-03 15:15:11', NULL),
(24, 1002, '2024-11-03 15:20:54', NULL),
(25, 1002, '2024-11-03 15:22:01', NULL),
(26, 1002, '2024-11-03 15:26:01', NULL),
(27, 1002, '2024-11-03 15:30:18', NULL),
(28, 1002, '2024-11-03 15:33:08', NULL),
(29, 1002, '2024-11-03 15:37:16', '2024-11-03 15:41:33'),
(30, 1002, '2024-11-03 15:41:57', NULL),
(31, 1002, '2024-11-03 15:45:48', NULL),
(32, 1002, '2024-11-03 15:49:04', NULL),
(33, 1002, '2024-11-03 15:54:46', NULL),
(34, 1002, '2024-11-04 18:14:48', NULL),
(35, 1002, '2024-11-04 18:25:44', NULL),
(36, 1002, '2024-11-04 18:30:35', NULL),
(37, 1002, '2024-11-04 18:32:13', '2024-11-04 18:50:07'),
(38, 1002, '2024-11-04 18:50:20', '2024-11-04 18:51:56'),
(39, 1001, '2024-11-04 18:52:13', '2024-11-04 18:52:42'),
(40, 1002, '2024-11-04 18:53:52', '2024-11-04 18:55:12'),
(41, 1002, '2024-11-04 19:10:56', '2024-11-04 19:11:17'),
(42, 1002, '2024-11-11 18:15:10', NULL),
(43, 1002, '2024-11-11 18:27:47', '2024-11-11 18:31:31'),
(44, 1001, '2024-11-11 18:31:40', '2024-11-11 18:43:10'),
(45, 1001, '2024-11-11 18:43:32', NULL),
(46, 1001, '2024-11-11 18:52:07', '2024-11-11 18:52:44'),
(47, 1001, '2024-11-11 18:58:59', NULL),
(48, 1001, '2024-11-11 19:01:48', '2024-11-11 19:04:11'),
(49, 1001, '2024-11-11 19:04:30', NULL),
(50, 1001, '2024-11-11 19:07:16', '2024-11-11 19:08:42'),
(51, 1001, '2024-11-11 19:09:00', NULL),
(52, 1001, '2024-11-11 19:12:45', '2024-11-11 19:19:24'),
(53, 1002, '2024-11-11 19:25:30', '2024-11-11 19:26:01'),
(54, 1001, '2024-11-11 19:26:08', '2024-11-11 19:27:48'),
(55, 1002, '2024-11-11 19:28:38', '2024-11-11 20:02:48'),
(56, 1002, '2024-11-11 20:36:37', '2024-11-11 20:42:01'),
(57, 1001, '2024-11-11 20:42:18', NULL),
(58, 1001, '2024-11-13 18:02:51', '2024-11-13 18:03:00'),
(59, 1002, '2024-11-13 18:03:07', '2024-11-13 18:03:28'),
(60, 1002, '2024-11-13 18:10:47', NULL),
(61, 1002, '2024-11-13 18:15:33', '2024-11-13 18:17:17'),
(62, 1002, '2024-11-13 18:18:02', '2024-11-13 18:20:33'),
(63, 1001, '2024-11-13 18:20:47', '2024-11-13 18:23:59'),
(64, 1002, '2024-11-18 18:20:37', NULL),
(65, 1002, '2024-11-18 18:25:26', NULL),
(66, 1002, '2024-11-18 18:39:08', NULL),
(67, 1002, '2024-11-18 18:46:30', NULL),
(68, 1002, '2024-11-18 18:47:49', NULL),
(69, 1002, '2024-11-18 18:54:48', NULL),
(70, 1002, '2024-11-18 18:58:07', NULL),
(71, 1002, '2024-11-18 19:06:27', NULL),
(72, 1002, '2024-11-18 19:13:06', NULL),
(73, 1002, '2024-11-18 19:17:32', NULL),
(74, 1002, '2024-11-18 19:21:15', '2024-11-18 19:23:14'),
(75, 1002, '2024-11-18 19:23:23', '2024-11-18 19:23:31'),
(76, 1002, '2024-11-18 19:23:43', NULL),
(77, 1002, '2024-11-18 19:27:12', NULL),
(78, 1002, '2024-11-18 19:28:17', NULL),
(79, 1002, '2024-11-18 19:31:22', NULL),
(80, 1002, '2024-11-18 19:31:45', NULL),
(81, 1002, '2024-11-18 19:33:12', NULL),
(82, 1002, '2024-11-18 19:35:43', NULL),
(83, 1002, '2024-11-18 19:39:15', NULL),
(84, 1002, '2024-11-18 19:39:35', NULL),
(85, 1002, '2024-11-18 19:49:42', NULL),
(86, 1002, '2024-11-18 20:07:42', '2024-11-18 20:12:00'),
(87, 1002, '2024-11-18 20:12:11', '2024-11-18 20:12:32'),
(88, 1002, '2024-11-18 20:20:07', NULL),
(89, 1002, '2024-11-18 20:43:38', NULL),
(90, 1002, '2024-11-18 20:44:29', NULL),
(91, 1002, '2024-11-18 20:46:10', NULL),
(92, 1002, '2024-11-18 20:47:29', NULL),
(93, 1002, '2024-11-18 20:48:03', NULL),
(94, 1002, '2024-11-18 20:49:40', NULL),
(95, 1002, '2024-11-18 20:51:44', NULL),
(96, 1002, '2024-11-18 20:52:43', NULL),
(97, 1002, '2024-11-18 20:54:17', NULL),
(98, 1002, '2024-11-18 20:59:35', NULL),
(99, 1002, '2024-11-20 18:02:46', NULL),
(100, 1002, '2024-11-20 18:10:30', '2024-11-20 18:12:51'),
(101, 1002, '2024-11-20 18:13:09', NULL),
(102, 1002, '2024-11-20 18:17:07', NULL),
(103, 1002, '2024-11-20 18:21:50', NULL),
(104, 1002, '2024-11-20 18:23:07', NULL),
(105, 1002, '2024-11-20 18:23:38', NULL),
(106, 1002, '2024-11-20 18:27:27', NULL),
(107, 1002, '2024-11-20 18:30:08', NULL),
(108, 1002, '2024-11-20 18:31:16', NULL),
(109, 1002, '2024-11-20 18:32:10', NULL),
(110, 1002, '2024-11-20 18:34:52', '2024-11-20 18:36:16'),
(111, 1001, '2024-11-20 18:36:25', '2024-11-20 18:48:21'),
(112, 1002, '2024-11-20 18:58:04', '2024-11-20 18:58:06'),
(113, 1001, '2024-11-20 18:58:11', NULL),
(114, 1001, '2024-11-20 19:04:58', NULL),
(115, 1001, '2024-11-20 19:06:40', NULL),
(116, 1001, '2024-11-20 19:07:43', NULL),
(117, 1001, '2024-11-20 19:08:50', '2024-11-20 19:13:39'),
(118, 1001, '2024-11-20 19:25:56', '2024-11-20 19:26:11'),
(119, 1002, '2024-11-20 20:10:50', '2024-11-20 20:12:43'),
(120, 1001, '2024-11-20 20:12:50', '2024-11-20 20:12:53'),
(121, 1001, '2024-11-20 20:13:00', NULL),
(122, 1001, '2024-11-20 20:13:27', '2024-11-20 20:20:05'),
(123, 1008, '2024-11-20 20:20:10', '2024-11-20 20:21:14'),
(124, 1002, '2024-11-20 20:21:51', '2024-11-20 20:23:59'),
(125, 1002, '2024-11-27 18:35:15', '2024-11-27 18:35:22'),
(126, 1002, '2024-11-27 18:38:14', NULL),
(127, 1002, '2024-11-27 18:43:03', '2024-11-27 18:43:43'),
(128, 1001, '2024-11-27 18:44:03', '2024-11-27 18:45:00'),
(129, 1002, '2024-11-27 18:45:06', '2024-11-27 18:45:50'),
(130, 1003, '2024-11-27 18:46:18', '2024-11-27 18:46:41'),
(131, 1002, '2024-11-27 18:47:07', '2024-11-27 18:49:23'),
(132, 1001, '2024-12-04 18:32:50', NULL),
(133, 1001, '2024-12-04 18:34:03', NULL),
(134, 1001, '2024-12-04 18:45:52', NULL),
(135, 1001, '2024-12-04 18:50:34', '2024-12-04 18:55:56'),
(136, 1001, '2024-12-04 18:56:12', '2024-12-04 18:56:29'),
(137, 1001, '2024-12-04 19:16:14', '2024-12-04 19:18:13'),
(138, 1002, '2024-12-04 19:18:19', '2024-12-04 19:18:47'),
(139, 1001, '2024-12-04 19:18:54', NULL),
(140, 1001, '2024-12-04 19:34:36', NULL),
(141, 1001, '2024-12-04 19:39:47', '2024-12-04 19:40:03'),
(142, 1001, '2024-12-04 19:41:03', '2024-12-04 19:45:19'),
(143, 1001, '2024-12-04 19:45:32', NULL),
(144, 1001, '2024-12-04 19:47:22', NULL),
(145, 1001, '2024-12-04 19:55:45', '2024-12-04 19:58:56'),
(146, 1002, '2024-12-04 19:59:10', NULL),
(147, 1001, '2024-12-04 20:04:51', '2024-12-04 20:05:16'),
(148, 1002, '2024-12-04 20:06:40', '2024-12-04 20:06:45'),
(149, 1001, '2024-12-04 20:06:53', '2024-12-04 20:09:04'),
(150, 1001, '2024-12-04 20:09:18', '2024-12-04 20:09:52'),
(151, 1011, '2024-12-04 20:09:57', '2024-12-04 20:10:29'),
(152, 1010, '2024-12-04 20:11:14', '2024-12-04 20:11:17'),
(153, 1011, '2024-12-04 20:11:47', '2024-12-04 20:12:48'),
(154, 1001, '2024-12-08 11:03:00', '2024-12-08 11:28:01'),
(155, 1002, '2024-12-08 11:28:11', '2024-12-08 11:41:18'),
(156, 1001, '2024-12-08 12:12:03', '2024-12-08 12:17:29'),
(157, 1001, '2024-12-08 12:21:48', '2024-12-08 12:24:23'),
(158, 1002, '2024-12-08 12:24:29', '2024-12-08 12:31:15'),
(159, 1002, '2024-12-08 12:37:14', '2024-12-08 12:39:09'),
(160, 1001, '2024-12-08 12:39:17', '2024-12-08 12:40:22'),
(161, 1002, '2024-12-08 12:45:20', '2024-12-08 12:45:34'),
(162, 1001, '2024-12-08 19:03:32', '2024-12-08 19:11:53'),
(163, 1001, '2024-12-08 19:12:56', '2024-12-08 19:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `topicID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`topicID`, `name`, `description`) VALUES
(7001, 'HTML', 'Hypertext Markup language. The building block for front end web development.'),
(7002, 'CSS', 'Cascading Stylesheets. Provides style for web pages.'),
(7003, 'JavaScript', 'Provides interactivity for webpages. Base language for many frameworks.'),
(7004, 'React', 'JavaScript Framework. Components, State, routes.'),
(7005, 'Python', 'Can be used for frontend and backend development. Used for AI development.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `last_login` datetime NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `user_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `email`, `password_hash`, `last_login`, `role`, `user_created`, `user_updated`) VALUES
(1001, 'testadmin', 'admin@test.com', 'testing1234hash', '2024-12-08 19:12:56', 'Admin', '2024-11-11 05:39:38', '2024-11-20 07:20:26'),
(1002, 'testStudent1', 'testStudent1@test.com', 'testing1234', '2024-12-08 12:45:20', 'Student', '2024-11-11 05:39:38', '2024-11-11 05:39:38'),
(1003, 'testStudent2', 'testStudent2@test.com', 'testingtesting', '2024-11-27 18:46:18', 'Student', '2024-11-11 05:39:38', '2024-11-11 05:39:38'),
(1008, 'testAdmin1234', 'testing@test.com', 'test', '2024-11-20 20:20:10', 'Admin', '2024-11-20 07:19:52', '2024-11-27 05:44:25'),
(1010, 'testAdd', 'testadd@test.com', 'testing', '2024-12-04 20:11:14', 'Student', '2024-12-03 17:56:07', '2024-12-04 06:57:23'),
(1011, 'editUser', 'edit@edit.com', 'testing', '2024-12-04 20:11:47', 'Student', '2024-12-03 18:09:38', '2024-12-07 23:39:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`cardID`),
  ADD UNIQUE KEY `id` (`cardID`),
  ADD KEY `topicID` (`topicID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `LoginLog`
--
ALTER TABLE `LoginLog`
  ADD PRIMARY KEY (`loginID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`topicID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flashcards`
--
ALTER TABLE `flashcards`
  MODIFY `cardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3034;

--
-- AUTO_INCREMENT for table `LoginLog`
--
ALTER TABLE `LoginLog`
  MODIFY `loginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topicID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7006;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1015;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD CONSTRAINT `flashcards_ibfk_2` FOREIGN KEY (`topicID`) REFERENCES `topics` (`topicID`),
  ADD CONSTRAINT `flashcards_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `LoginLog`
--
ALTER TABLE `LoginLog`
  ADD CONSTRAINT `loginlog_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
