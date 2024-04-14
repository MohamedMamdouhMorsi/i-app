CREATE TABLE usersSubscriptions (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` INT(11) NOT NULL,
  `typeId` INT(11) NOT NULL,
  `payment_method` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM ('active', 'inactive') NOT NULL DEFAULT 'active',
   FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;