CREATE TABLE answers (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL ,
  `ownerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `answerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `answer` text utf8_unicode_ci ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
