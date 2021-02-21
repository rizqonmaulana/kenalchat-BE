-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2021 at 10:29 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kenal_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id_from` int(11) NOT NULL,
  `user_id_to` int(11) NOT NULL,
  `chat_content` text NOT NULL,
  `chat_status` tinyint(1) NOT NULL,
  `chat_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat_room`
--

CREATE TABLE `chat_room` (
  `chat_room_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_1` int(11) NOT NULL,
  `user_2` int(11) NOT NULL,
  `room_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `room_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `friend_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_friend_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_bio` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_key` varchar(255) DEFAULT NULL,
  `user_status` tinyint(1) DEFAULT NULL,
  `user_pic` varchar(255) DEFAULT NULL,
  `user_lat` varchar(255) DEFAULT NULL,
  `user_lng` varchar(255) DEFAULT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_bio`, `user_password`, `user_key`, `user_status`, `user_pic`, `user_lat`, `user_lng`, `user_created_at`, `user_updated_at`) VALUES
(1, 'Rizqon Maulana', 'rizqonmaulana@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 08:10:27', NULL),
(2, 'Abdi', 'abdi@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:09:53', NULL),
(3, 'Sutejo', 'sutejo@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:10:14', NULL),
(4, 'arka', 'arka@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:10:29', NULL),
(5, 'lulu', 'lulu@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:10:40', NULL),
(6, 'nana', 'nana@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:10:58', NULL),
(7, 'tiara', 'tiara@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:11:07', NULL),
(8, 'sunda', 'sunda@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-20 19:11:17', NULL),
(9, 'sunda', 'sunda1@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-21 08:33:43', NULL),
(10, 'sunda', 'sunda11@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-21 08:34:11', NULL),
(13, 'Rizqon Maul', 'rizqonmaulana5@gmail.com', '0123456789', 'hiduplah seperti larry, tanpa rasa takut', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, '-1.2434372999999999', '116.8960269', '2021-01-21 08:41:38', '2021-02-21 12:21:33'),
(15, 'bmasd', 'maulanasblog123@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-23 22:26:46', NULL),
(16, 'maulana', 'maulanasblog11@gmail.com', NULL, '', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, NULL, NULL, '2021-01-23 22:28:06', NULL),
(17, 'alex', 'catataniko@gmail.com', '01234567890', 'hiduplah walaupun tidak berguna', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, '-1.2353536', '116.8211968', '2021-01-25 07:56:45', '2021-01-25 23:02:29'),
(18, 'alan lana', 'rizqon@gmail.com', '0123456789', 'hiduplah seperti larry, tanpa rasa takut', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '', 1, NULL, '-1.2434372999999999', '116.8960269', '2021-01-21 08:41:38', '2021-02-20 00:29:51'),
(20, 'Maulanaaa', 'maulanasblog@gmail.com', '123344555', 'akun baru', '$2b$10$8CBQuJjeuxuxXs7/cgreke2fjFrncFjNXvnK3.lo3YSYRtz7DGvvu', '7b5f07eb6f4cc73c608fc2e727e4b3a555c177d1', 1, NULL, NULL, NULL, '2021-02-21 12:30:15', '2021-02-21 12:48:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `chat_room`
--
ALTER TABLE `chat_room`
  ADD PRIMARY KEY (`chat_room_id`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`friend_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_room`
--
ALTER TABLE `chat_room`
  MODIFY `chat_room_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `friend_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
