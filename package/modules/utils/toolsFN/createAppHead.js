// 1. REFACTORED CONSTANTS
// Removed the viewport tag from here to generate it dynamically in the function for better control.
// Added specific CSS for "display: none" on the structured data script to prevent layout shifts.
const STATIC_STYLES = `
<style id="T_ASS"></style><style id="TC_ASS"></style><style id="C_ASS"></style><style id="F_ASS"></style><style id="F_ASSB"></style><style id="F_ASSC"></style>
<style id="PASSSTYLE">:root {--W:#fff;--B:#000;--BODYB: #ffffff;--BODYF: #000000;--WH__: 1000px;--WW__: 1000px;}.F_PR {color: var(--BODYF);}.B_PR {background: var(--BODYB);}</style>
<style id="STYLE_DIR">:root {--DirL: left;--DirR: right;}</style><style id="AUTO_DIR"></style>
<style> .FWI{color:#ffffff;}.FBI{color:#000000;}</style>
<style id="S_FONT">h1,h2,h3,h4,h5,h6,p,button,input,table,th,td,nav,div,table,a,b,tr,ul,li,tbody,select,svg,textarea,title {font-family: "Lucida Sans Unicode", "Lucida Grande", "Cairo", sans-serif;}</style>
`;

// 2. MAIN GENERATOR FUNCTION
const createAppHead = (app, PR_D) => {
  const devMode = app.mode && app.mode === "dev";
  
  // Logic: Language and Direction (Auto-detect RTL)
  let defaultLang = "en";
  if (app.defLang) {
    defaultLang = app.defLang;
  } else if (!app.defLang && app.lang && app.lang.length > 0) {
    defaultLang = app.lang[0];
  }
  
  // Check for RTL languages (Arabic, Hebrew, Persian, Urdu) to set document direction
  const isRtl = ['ar', 'he', 'fa', 'ur'].includes(defaultLang);
  const dirAttribute = isRtl ? 'rtl' : 'ltr';

  // Logic: Image Overlay (kept from your original code)
  let imgBody = "";
  if (app.imgSrc) {
    imgBody = `<div class="WW HH TT_0 LL_0 T_C POS_AB overHide" id="generalHolderImg"><img src="${app['imgSrc']}" class="imgCoverAll" alt="App Loading Screen" /></div>`;
  }

  // Logic: Dynamic Robots (Don't index dev sites)
  const robotsContent = devMode ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  // Logic: Structured Data (Schema.org) - CRITICAL FOR MODERN SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": app.title,
    "url": app.domain,
    "description": app.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "contentUrl": `${app.dir.icon}favicon-96x96.png`
    }
  };
  
  // --- START HTML GENERATION ---
  let innerHTML = `<!DOCTYPE html>
<html lang="${defaultLang}" dir="${dirAttribute}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <!-- ACCESSIBILITY & VIEWPORT -->
    <!-- Updated: user-scalable=yes is required for WCAG accessibility compliance -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    
    <!-- SEO ESSENTIALS -->
    <title>${app.title}</title>
    <meta name="description" content="${app.description}">
    <meta name="robots" content="${robotsContent}">
    <link rel="canonical" href="${app.domain}">
    <meta name="keywords" content="${app.keywords}">
    
    <!-- APP CAPABILITIES -->
    <meta i_app="true">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="full-screen" content="yes">
    <meta name="screen-orientation" content="portrait">
    <meta name="theme-color" content="${PR_D}">
    
    <!-- PERFORMANCE: PRECONNECT (Speed up font loading) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Cairo:400,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Mada:400,900&display=swap" rel="stylesheet">
    <link href="/icofont.css" rel="stylesheet" media="print" onload="this.media='all'">
    
    <!-- MANIFEST & ICONS -->
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="${app.dir.icon}apple-icon-120x120.png">
    <link rel="icon" type="image/png" href="${app.dir.icon}favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="${app.dir.icon}favicon-16x16.png" sizes="16x16">

    <!-- OPEN GRAPH (Facebook/LinkedIn) -->
    <meta property="og:site_name" content="${app.title}">
    <meta property="og:title" content="${app.title}">
    <meta property="og:description" content="${app.description}">
    <meta property="og:type" content="${app.type || 'website'}">
    <meta property="og:url" content="${app.domain}">
    <meta property="og:image" content="${app.dir.icon}favicon-96x96.png">
    
    <!-- TWITTER CARD (New addition) -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${app.title}">
    <meta name="twitter:description" content="${app.description}">

    <!-- STRUCTURED DATA (JSON-LD) -->
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd)}
    </script>

    <!-- STYLES -->
    <link href=${devMode ? "/i-app-basic.css" : "/i-app-basic.min.css"} rel="stylesheet" type="text/css" />
    ${STATIC_STYLES}

    <!-- SCRIPTS -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    ${app.faceapi ? `<script src="/face-api.min.js" defer></script>` : ''}
    ${app.fcm ? `<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase.js"></script>` : ''}
    ${app.three ? `<script type="importmap">{"imports": {"three": "./three.js"}}</script>` : ''}
    
    <script>const appData = ${JSON.stringify(app)};</script>
    <script id="i-app-ui" src=${devMode ? "/i-app-ui.js" : "/i-app-ui.min.js"} async defer></script>
</head>
<body>${imgBody}</body>
</html>`;

  return innerHTML;
}

module.exports = createAppHead;