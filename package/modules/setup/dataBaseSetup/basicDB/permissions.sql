CREATE TABLE permissions (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(255) COLLATE utf8_unicode_ci NOT NULL UNIQUE,
  `description` varchar(255) COLLATE utf8_unicode_ci ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
