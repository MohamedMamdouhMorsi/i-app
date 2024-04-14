CREATE TABLE answers (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `userId` int(11) NOT NULL ,
  `ownerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `answerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `answer` text  COLLATE utf8_unicode_ci  NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
