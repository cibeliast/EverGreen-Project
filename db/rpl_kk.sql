-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2025 at 03:56 PM
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
(5, 2, 2, 50000.00, '2025-05-10', 'Paid for another session'),
(6, 11, 5, 100000.00, '2025-06-23', 'Paid for 2 session'),
(7, 3, 5, 50000.00, '2025-06-23', 'Paid for 1 session');

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
(3, 3, 2, 'https://forms.gle/quiz3', 'https://sheets.google.com/results90'),
(4, 1, 5, 'hai', 'a'),
(5, 1, 5, 'a', 'a'),
(6, 1, 5, 'battt', 'aaa'),
(7, 1, 5, 'nambah', 'neng'),
(8, 2, 5, 'a', 'a'),
(9, 2, 5, 'b', 'b'),
(10, 2, 5, 'halo', 'ftom the other side'),
(11, 3, 5, 'h', 'a'),
(12, 3, 5, 'coba', 'add quiz'),
(13, 3, 5, 'ciba', 'adele'),
(15, 4, 5, 'ternak sapi', 'hehe'),
(16, 5, 5, 'eating', 'sugar'),
(17, 5, 5, 'halo', 'halo'),
(18, 5, 5, 'ke mana', 'hey'),
(19, 5, 5, 'a', 'a'),
(20, 5, 5, 'a', 'a'),
(21, 1, 5, 'a', 'a'),
(23, 4, 5, 'a', 'a'),
(24, 4, 5, 'bisa dong', 'busa'),
(25, 4, 5, 'a', 'a'),
(26, 4, 5, 'a', 'a'),
(30, 2, 5, 'hy', 'hehe');

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
(1, 11, 1, 'Monday', '10:00:00'),
(2, 11, 1, 'Wednesday', '14:00:00'),
(3, NULL, 1, 'Tuesday', '09:00:00'),
(4, 11, 2, 'Thursday', '11:00:00'),
(5, 11, 1, 'Friday', '13:00:00'),
(6, 1, 1, 'Friday', '17:00:00'),
(7, 3, 2, 'Thursday', '17:00:00');

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
(5, 'guru', 'teacher@gmail.com', 'Teacher', '$2b$10$e0EYMZuChPedjLQZgtRUx.6BCh1A.HzrFQj9TWRPoY6aTCwXwQ03O', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `topic_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`topic_id`, `name`, `description`, `picture`) VALUES
(1, 'Tenses', 'Basic to advanced English tenses.', '/assets/book.png'),
(2, 'Vocabulary', 'Daily vocabulary enrichment.', 'https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHxWb2NhYnVsYXJ5fGVufDB8fHx8MTc1MDYwNDQxNHww&ixlib=rb-4.1.0&q=80&w'),
(3, 'Speaking', 'Improve speaking confidence.aaaaaaku anak yang baik namaku ketty teemn cibel. kmu syp???', '/assets/quizzes.png'),
(4, 'bird', 'sheep and cows', 'https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHxiaXJ8ZW58MHx8fHwxNzUwNjY5MTM1fDA&ixlib=rb-4.1.0&q=80&w=400'),
(5, 'eating with gusto', 'eat morning', 'https://images.unsplash.com/photo-1600832501609-0ba64370e7ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHxlYXRpbmclMjB3aXRoJTIwZ3VzdG98ZW58MHx8fHwxNzUwOTQ2MTA0fDA&ixlib=');

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
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
