CREATE TABLE usersApps (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appName` varchar(255) COLLATE utf8_unicode_ci NOT NULL UNIQUE,
  `description` varchar(255) COLLATE utf8_unicode_ci ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

