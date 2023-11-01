CREATE TABLE usersSessions (
  `userId` int(11) NOT NULL ,
  `deviceToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `scureToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `connectToken` text utf8_unicode_ci 
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
