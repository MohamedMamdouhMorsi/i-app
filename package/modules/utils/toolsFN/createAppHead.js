  // This function checks if a global object with the current root name exists and logs it to the console
  const META_TAG = `<meta charset="utf-8"><meta i_app="true"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"/><meta name="full-screen" content="yes"/><meta name="screen-orientation" content="portrait"><link rel="manifest"  href="/manifest.json" ><style id="T_ASS"></style><style id="TC_ASS"></style><style id="C_ASS"></style><style id="F_ASS"></style><style id="F_ASSB"></style><style id="F_ASSC"></style><style id="PASSSTYLE">:root {--W:#fff;--B:#000;--BODYB: #ffffff;--BODYF: #000000;--WH__: 1000px;--WW__: 1000px;}.F_PR {color: var(--BODYF);}.B_PR {background: var(--BODYB);}</style><style id="STYLE_DIR">:root {--DirL: left;--DirR: right;}</style><style id="AUTO_DIR"></style><style> .FWI{color:#ffffff;}.FBI{color:#000000;}</style><link href="https://fonts.googleapis.com/css?family=Cairo:400,900&display=swap"  rel="stylesheet"   type="text/css"  media="print"  onload="this.media='all'" /><link href="https://fonts.googleapis.com/css?family=Mada:400,900&display=swap"   rel="stylesheet"   type="text/css"  media="print"  onload="this.media='all'" /><link href="/icofont.css"   rel="stylesheet"   type="text/css"  media="print"  onload="this.media='all'" /><style id="S_FONT">h1,h2,h3,h4,h5,h6,p,button,input,table,th,td,nav,div,table,a,b,tr,ul,li,tbody,select,svg,textarea,title {font-family: "Lucida Sans Unicode", "Lucida Grande", "Cairo", sans-serif;}</style> `;

  const createAppHead = (app,PR_D,userData)=>{
    
   
   let innerHTML  = '<!DOCTYPE html> <head>';
    innerHTML += `<title>${app.title}</title>`;
    innerHTML += `<meta name="type" content="${app.type}">`;
    innerHTML += `<meta name="description" content="${app.description}">`;
    innerHTML += `<meta name="keywords" content="${app.keywords}">`;
    innerHTML += `<meta name="theme-color" content="${PR_D}">`;
    innerHTML += `<link rel="apple-touch-icon" type="image/png" href="${app.dir.icon}apple-icon.png"/ >`;
    innerHTML += `<link rel="apple-touch-icon" href="${app.dir.icon}apple-icon-120x120.png">`;
    innerHTML += `<link rel="icon" type="image/png" href="${app.dir.icon}favicon-16x16.png" sizes="16x16">`;
    innerHTML += `<link rel="icon" type="image/png" href="${app.dir.icon}favicon-32x32.png" sizes="32x32">`;
    innerHTML += `<link rel="apple-touch-icon" href="${app.dir.icon}apple-icon-120x120.png">`;
    innerHTML += `<link href=${app.mode == "dev" ? "/i-app-basic.css" : "/i-app-basic.min.css"} rel="stylesheet" type="text/css" />`;
    

    innerHTML += `<meta property="og:title" content="${app.title}" />`;
    innerHTML += `<meta property="og:description" content="${app.description}" />`;
    innerHTML += `<meta property="og:type" content="${app.type}" />`;
    innerHTML += `<meta property="og:url" content="${app.domain}" />`;
    innerHTML += `<meta property="og:image" content="${app.dir.icon}favicon-96x96.png" />`;
    innerHTML += META_TAG;
    innerHTML +=`<script type="application/javascript" src=${app.mode == "dev" ? "/i-app-ui.js" : "/i-app-ui.min.js"} async defer ></script>`;
    innerHTML +=`<script type="application/javascript">const userData = ${userData}</script>`;
    innerHTML += `</head> <body></body> </html>`;

    return innerHTML.toString();
  }
  module.exports =createAppHead