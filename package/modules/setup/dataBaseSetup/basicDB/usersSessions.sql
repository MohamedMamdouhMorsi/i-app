CREATE TABLE usersSessions (
  `userId` int(11) NOT NULL ,
  `userToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deviceToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `scureToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `connectToken` text  COLLATE utf8_unicode_ci  NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
