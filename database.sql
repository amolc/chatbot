-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 24, 2017 at 10:24 PM
-- Server version: 5.5.40
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pravola-chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `quote`
--

CREATE TABLE `quote` (
  `id` int(11) NOT NULL,
  `fromwhere` varchar(200) CHARACTER SET latin1 NOT NULL,
  `fromairport` varchar(200) CHARACTER SET latin1 NOT NULL,
  `whereto` varchar(200) CHARACTER SET latin1 NOT NULL,
  `toairport` varchar(200) CHARACTER SET latin1 NOT NULL,
  `startdate` varchar(200) CHARACTER SET latin1 NOT NULL,
  `startdate` varchar(200) CHARACTER SET latin1 NOT NULL,
  `planetype` varchar(200) CHARACTER SET latin1 NOT NULL,
  `distance` varchar(200) CHARACTER SET latin1 NOT NULL,
  `estimatedhrs` varchar(200) CHARACTER SET latin1 NOT NULL,
  `planecostperhr` varchar(200) CHARACTER SET latin1 NOT NULL,
  `estimatedcost` int(200) NOT NULL,
  `returnboolen` varchar(200) CHARACTER SET latin1 NOT NULL,
  `email` varchar(200) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quote`
--
ALTER TABLE `quote`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `quote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
