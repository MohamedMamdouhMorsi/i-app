CREATE TABLE usersApps (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;