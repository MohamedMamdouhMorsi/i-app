function getUserAgent(req) {
  return req.headers['user-agent'] || '';
}

function getIP(req) {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  return ip || false;
}

function getOS(userAgent) {
  const osArray = [
    { regex: /windows nt 10/i, value: 'Windows 10' },
    { regex: /windows nt 6.3/i, value: 'Windows 8.1' },
    { regex: /windows nt 6.2/i, value: 'Windows 8' },
    { regex: /windows nt 6.1/i, value: 'Windows 7' },
    { regex: /windows nt 6.0/i, value: 'Windows Vista' },
    { regex: /windows nt 5.2/i, value: 'Windows Server 2003/XP x64' },
    { regex: /windows nt 5.1/i, value: 'Windows XP' },
    { regex: /windows xp/i, value: 'Windows XP' },
    { regex: /windows nt 5.0/i, value: 'Windows 2000' },
    { regex: /windows me/i, value: 'Windows ME' },
    { regex: /win98/i, value: 'Windows 98' },
    { regex: /win95/i, value: 'Windows 95' },
    { regex: /win16/i, value: 'Windows 3.11' },
    { regex: /macintosh|mac os x/i, value: 'Mac OS X' },
    { regex: /mac_powerpc/i, value: 'Mac OS 9' },
    { regex: /linux/i, value: 'Linux' },
    { regex: /ubuntu/i, value: 'Ubuntu' },
    { regex: /iphone/i, value: 'iPhone' },
    { regex: /ipod/i, value: 'iPod' },
    { regex: /ipad/i, value: 'iPad' },
    { regex: /android/i, value: 'Android' },
    { regex: /blackberry/i, value: 'BlackBerry' },
    { regex: /webos/i, value: 'Mobile' },
  ];

  for (const os of osArray) {
    if (os.regex.test(userAgent)) {
      return os.value;
    }
  }

  return 'Unknown OS Platform';
}

function getBrowser(userAgent) {
  const browserArray = [
    { regex: /msie/i, value: 'Internet Explorer' },
    { regex: /Trident/i, value: 'Internet Explorer' },
    { regex: /firefox/i, value: 'Firefox' },
  
    { regex: /chrome/i, value: 'Chrome' },
    { regex: /edge/i, value: 'Edge' },
    { regex: /opera/i, value: 'Opera' },
    { regex: /netscape/i, value: 'Netscape' },
    { regex: /maxthon/i, value: 'Maxthon' },
    { regex: /konqueror/i, value: 'Konqueror' },
    { regex: /ubrowser/i, value: 'UC Browser' },
    { regex: /mobile/i, value: 'Handheld Browser' },
    { regex: /safari/i, value: 'Safari' },
  ];

  for (const browser of browserArray) {
    if (browser.regex.test(userAgent)) {
      return browser.value;
    }
  }

  return 'Unknown Browser';
}

function getDevice(userAgent) {
  const mobileAgents = [
    'tablet',
    'ipad',
    'playbook',
    'android',
    'up.browser',
    'up.link',
    'mmp',
    'symbian',
    'smartphone',
    'midp',
    'wap',
    'phone',
    'iemobile',
  ];

  const mobileUa = userAgent.toLowerCase().substring(0, 4);

  if (mobileAgents.some((agent) => userAgent.toLowerCase().includes(agent))) {
    return 'Mobile';
  }

  if (/opera mini/i.test(userAgent)) {
    if (/tablet|ipad|playbook|android/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Mobile';
    }
  }

  return 'Computer';
}
 function getDeviceInfo(req) {
  const userAgent = getUserAgent(req);
  const ip = getIP(req);
  const os = getOS(userAgent);
  const browser = getBrowser(userAgent);
  const device = getDevice(userAgent);
  const fingerPrint = `${userAgent}-${os}-${browser}-${device}`;
  return {
    userAgent,
    ip,
    os,
    browser,
    device,
    fingerPrint,
  };
};

module.exports = getDeviceInfo