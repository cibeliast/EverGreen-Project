-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2025 at 06:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rpl`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `nominal` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `student_id`, `teacher_id`, `nominal`, `date`, `note`) VALUES
(1, 1, 1, 50000.00, '2025-05-01', 'Paid for 1 session'),
(2, 1, 1, 100000.00, '2025-05-08', 'Paid for 2 sessions'),
(3, 2, 2, 50000.00, '2025-05-03', 'Paid for 1 session'),
(4, 3, 1, 50000.00, '2025-05-04', 'Paid for 1 session'),
(5, 2, 2, 50000.00, '2025-05-10', 'Paid for another session');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `quiz_link` text NOT NULL,
  `result_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `topic_id`, `teacher_id`, `quiz_link`, `result_link`) VALUES
(1, 1, 1, 'https://forms.gle/quiz1', 'https://sheets.google.com/results1'),
(2, 2, 1, 'https://forms.gle/quiz2', 'https://sheets.google.com/results2'),
(3, 3, 2, 'https://forms.gle/quiz3', 'https://sheets.google.com/results3');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) NOT NULL,
  `day` varchar(10) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `student_id`, `teacher_id`, `day`, `time`) VALUES
(1, NULL, 1, 'Monday', '10:00:00'),
(2, NULL, 1, 'Wednesday', '14:00:00'),
(3, 1, 1, 'Tuesday', '09:00:00'),
(4, 2, 2, 'Thursday', '11:00:00'),
(5, 3, 1, 'Friday', '13:00:00'),
(6, 11, 1, 'Friday', '17:00:00'),
(7, 11, 2, 'Thursday', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `total_meetings` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `email`, `username`, `password`, `phone_number`, `address`, `total_meetings`) VALUES
(1, 'Rina Putri', 'rina@student.com', 'rina123', 'pass123', '089876543210', 'Jl. Anggrek No.5', 3),
(2, 'Dina Laras', 'dina@student.com', 'dinal', 'pass123', '089812345678', 'Jl. Melati No.8', 2),
(3, 'Toni Setiawan', 'toni@student.com', 'tonis', 'pass123', '089876543211', 'Jl. Kamboja No.3', 1),
(4, NULL, 'ketty@example.com', 'kettyuiop', '$2b$10$BDF0.XV6lh7.aPYLCFpD/et6UKYOEVXQrV4YHx.P1790RVGUlPN5m', NULL, NULL, NULL),
(5, NULL, 'kettyiuop@email.com', 'poiuy', '$2b$10$Ys0r3myOMsHlGaAfsPasD.y2/NGLkJLaBy9erw32uHHvOlc9Cmmr6', NULL, NULL, NULL),
(6, NULL, 'kipli@gmail.com', 'kipliy', '$2b$10$zBqtxT2SpVNJKDFyqBpaDOkNLnTg19zTgszBXIiXD09tCEG5HVtlW', NULL, NULL, NULL),
(7, NULL, 'kettyuiop@email.com', 'kiplii', '$2b$10$GIhaTSDr458ttbCXz31Xw.oJoZqHa.lvdBOBRK1RH27Nc.BpQtFea', NULL, NULL, NULL),
(10, NULL, 'evergreen@example.com', 'evergreen', '$2b$10$kIrg5wSTHVCT3n1yf2SblOO4g04iDbUig/VwiGe/QFc/O5bgz6KmO', NULL, NULL, NULL),
(11, 'Kitibella', 'kibel@email.com', 'kibel', '$2b$10$gXzu9ZWiDNisPSwawnPOQeY/7soGU4uhRmypvbD/qk/iXr2qzsPOy', '', 'Jl. Jalan Yukk', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `student_schedule_view`
-- (See below for the actual view)
--
CREATE TABLE `student_schedule_view` (
`student_id` int(11)
,`day` varchar(10)
,`time` time
,`teacher_name` varchar(40)
);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `name`, `email`, `username`, `password`, `phone_number`, `address`) VALUES
(1, 'Ari', 'ari@teacher.com', 'ariww', 'pass123', '081234567890', 'Jl. Merdeka No.1'),
(2, 'Santo', 'santo@teacher.com', 'santow', 'santo123', '081234567891', 'Jl. Mawar No, 2'),
(5, NULL, 'teacher@gmail.com', 'Teacher', '$2b$10$e0EYMZuChPedjLQZgtRUx.6BCh1A.HzrFQj9TWRPoY6aTCwXwQ03O', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `topic_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`topic_id`, `name`, `description`) VALUES
(1, 'Tenses', 'Basic to advanced English tenses.'),
(2, 'Vocabulary', 'Daily vocabulary enrichment.'),
(3, 'Speaking', 'Improve speaking confidence.');

-- --------------------------------------------------------

--
-- Structure for view `student_schedule_view`
--
DROP TABLE IF EXISTS `student_schedule_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_schedule_view`  AS SELECT `s`.`student_id` AS `student_id`, `s`.`day` AS `day`, `s`.`time` AS `time`, `t`.`name` AS `teacher_name` FROM (`schedules` `s` join `teachers` `t` on(`s`.`teacher_id` = `t`.`teacher_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payment_student` (`student_id`),
  ADD KEY `fk_payment_teacher` (`teacher_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `fk_quiz_topic` (`topic_id`),
  ADD KEY `fk_quiz_teacher` (`teacher_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_schedule_teacher` (`teacher_id`),
  ADD KEY `fk_schedule_student` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`topic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payment_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `fk_payment_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `fk_quiz_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`),
  ADD CONSTRAINT `fk_quiz_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_schedule_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `fk_schedule_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
