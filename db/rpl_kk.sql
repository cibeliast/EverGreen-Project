-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2025 at 07:48 AM
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
-- Database: `rpl_kk`
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
(6, 11, 5, 500000.00, '2025-06-23', 'Paid for 10 session'),
(7, 11, 5, 300000.00, '2025-06-23', 'Paid for 6 session'),
(9, 11, 5, 300000.00, '2025-07-01', 'Paid for 6 session'),
(10, 1, 5, 50000.00, '2025-06-30', 'Paid for 1 session'),
(11, 3, 5, 150000.00, '2025-07-01', 'Paid for 3 session'),
(12, 3, 5, 350000.00, '2025-06-30', 'Paid for 7 session'),
(13, 2, 5, 250000.00, '2025-07-01', 'Paid for 5 session'),
(14, 2, 5, 150000.00, '2025-06-30', 'Paid for 3 session'),
(15, 2, 5, 50000.00, '2025-06-23', 'Paid for 1 session');

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
(38, 10, 5, 'https://forms.gle/5YevGnbXHjmMryNY8', 'https://docs.google.com/spreadsheets/d/1f2ulzbFhDnqwMgIyz7VWmuSQz3_GVEhBU_WloVKIcWA/edit?usp=sharing'),
(39, 8, 5, 'https://forms.gle/8DEhEn56UphF92ct7', 'https://docs.google.com/spreadsheets/d/1BD1pqqt6baTtBygasczxE8VIlZb7MyaJ26ZoBPT6xOA/edit?usp=sharing'),
(40, 8, 5, 'https://forms.gle/8DEhEn56UphF92ct7', 'https://docs.google.com/spreadsheets/d/1BD1pqqt6baTtBygasczxE8VIlZb7MyaJ26ZoBPT6xOA/edit?usp=sharing'),
(41, 8, 5, 'https://forms.gle/8DEhEn56UphF92ct7', 'https://docs.google.com/spreadsheets/d/1BD1pqqt6baTtBygasczxE8VIlZb7MyaJ26ZoBPT6xOA/edit?usp=sharing'),
(42, 10, 5, 'https://forms.gle/5YevGnbXHjmMryNY8', 'https://docs.google.com/spreadsheets/d/1f2ulzbFhDnqwMgIyz7VWmuSQz3_GVEhBU_WloVKIcWA/edit?usp=sharing'),
(43, 10, 5, 'https://forms.gle/5YevGnbXHjmMryNY8', 'https://docs.google.com/spreadsheets/d/1f2ulzbFhDnqwMgIyz7VWmuSQz3_GVEhBU_WloVKIcWA/edit?usp=sharing'),
(44, 10, 5, 'https://forms.gle/5YevGnbXHjmMryNY8', 'https://docs.google.com/spreadsheets/d/1f2ulzbFhDnqwMgIyz7VWmuSQz3_GVEhBU_WloVKIcWA/edit?usp=sharing');

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
(3, 3, 1, 'Tuesday', '09:00:00'),
(4, 11, 2, 'Thursday', '11:00:00'),
(5, 11, 1, 'Friday', '13:00:00'),
(6, NULL, 1, 'Friday', '17:00:00'),
(7, 2, 2, 'Thursday', '17:00:00'),
(8, 11, 5, 'Monday', '09:00:00'),
(9, 2, 5, 'Thursday', '09:00:00'),
(12, 3, 5, 'Wednesday', '08:00:00'),
(13, 3, 5, 'Friday', '11:00:00'),
(15, 3, 5, 'Tuesday', '09:00:00'),
(16, 11, 5, 'Monday', '10:00:00'),
(17, 2, 5, 'Monday', '08:00:00'),
(18, NULL, 5, 'Monday', '12:00:00'),
(19, NULL, 5, 'Thursday', '10:00:00'),
(20, 3, 5, 'Saturday', '14:00:00'),
(24, 2, 5, 'Tuesday', '12:00:00');

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
  `total_meetings` int(10) DEFAULT NULL,
  `last_online` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `email`, `username`, `password`, `phone_number`, `address`, `total_meetings`, `last_online`) VALUES
(1, 'Rina Putri', 'rina@student.com', 'rina123', 'pass123', '089876543210', 'Jl. Anggrek No.5', 0, NULL),
(2, 'Dina Laras', 'dina@student.com', 'dinal', 'pass123', '089812345678', 'Jl. Melati No.8', 4, NULL),
(3, 'Toni Setiawan', 'toni@student.com', 'tonis', 'pass123', '089876543211', 'Jl. Kamboja No.3', 5, NULL),
(11, 'Kitibella', 'xintinkoink@gmail.com', 'kibel', '$2b$10$QLGEjZRQt5WUnXmp.dnPt.D4ngFGDC8XIz5Psw1B5g5ipl9mrNb8O', '017232058', 'Flamboyan', 6, '2025-07-01 12:02:49'),
(14, 'Jae', 'jae@email.com', 'jae12', '$2b$10$zQe98X3QZnHpl6WFIkl4nuHbtcI2ijFKegvmjzOjEWhNtZM1xy7OG', NULL, NULL, 0, '2025-07-01 12:47:15');

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
(1, 'Mr Ari', 'ari@teacher.com', 'ariww', 'pass123', '081234567890', 'Jl. Merdeka No.1'),
(2, 'Mr Santo', 'santo@teacher.com', 'santow', 'santo123', '081234567891', 'Jl. Mawar No, 2'),
(5, 'Ms Marvel', 'teacher@gmail.com', 'Teacher', '$2b$10$e0EYMZuChPedjLQZgtRUx.6BCh1A.HzrFQj9TWRPoY6aTCwXwQ03O', '125467', 'jogja'),
(6, 'nora', 'nora@email.com', 'nora12', '$2b$10$YH9Q91PiI/lyxz8w6pyokOvcHEUZ6hoKs5hBr4iy08zqhCIV10vFi', NULL, NULL);

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
(8, 'Modals', 'Modals are helping verbs used to show ability, possibility, or necessity.', 'https://images.unsplash.com/photo-1590239662565-4274532102c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHxwb3NpYmlsaXR5fGVufDB8fHx8MTc1MTMzNjA0OXww&ixlib=rb-4.1.0&q=80&w'),
(10, 'Past Tense', 'Past Tense is used to describe actions or events that happened in the past.', 'https://images.unsplash.com/photo-1597392582469-a697322d5c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHx3b3Jkc3xlbnwwfHx8fDE3NTEzNDA4Mjl8MA&ixlib=rb-4.1.0&q=80&w=400'),
(11, 'Gerunds & Infinitive', 'Gerunds and infinitives are verb forms used as nouns in a sentence.', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NjM0Mjd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nfGVufDB8fHx8MTc1MTMzNjk3M3ww&ixlib=rb-4.1.0&q=80&w=400');

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
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  ADD CONSTRAINT `fk_quiz_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`) ON DELETE CASCADE;

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
