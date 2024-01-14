{
    c:'WW'
    e:[
        {
            t:'h2'
            s:'Logo / App Icon'
        }
    {
        t:'p'
        s:'You can simply change the app logo and generate the required measurements to fit all devices once you choose the new logo'
    }
        {
            t:'img'
            c:'W_100'
            i:'imgLogoRes'
            src:'icon/apple-icon.png'
        }
        {
            t:'lb'
            e:[
                {
                    t:'in'
                    c:'W_10'
                    i:'imgLogoSrc'
                    attr:{
                        accept:'image/*'
                        type:'file'
                    }
                      a:{
                            e:'change'
                            fn:{
                                         const input = _.E_I_S('imgLogoSrc');
                                       
                                        const file = input.files[0];
                                    const iconsSizes = [
                                                {
                                                "src":"android-icon-36x36.png",
                                                "sizes":"36x36",
                                                "type":"image\/png",
                                                "density":"0.75"
                                                },{
                                                "src":"android-icon-48x48.png",
                                                "sizes":"48x48",
                                                "type":"image\/png",
                                                "density":"1.0"
                                                },{
                                                "src":"android-icon-72x72.png",
                                                "sizes":"72x72",
                                                "type":"image\/png",
                                                "density":"1.5"
                                                },{
                                                "src":"android-icon-96x96.png",
                                                "sizes":"96x96",
                                                "type":"image\/png",
                                                "density":"2.0"
                                                },{
                                                "src":"android-icon-144x144.png",
                                                "sizes":"144x144",
                                                "type":"image\/png",
                                                "density":"3.0"
                                                },{
                                                "src":"android-icon-192x192.png",
                                                "sizes":"192x192",
                                                "type":"image\/png",
                                                "density":"4.0"
                                                },{
                                                "src":"apple-icon-57x57.png",
                                                "sizes":"57x57",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-60x60.png",
                                                "sizes":"60x60",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-76x76.png",
                                                "sizes":"76x76",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-114x114.png",
                                                "sizes":"114x114",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-120x120.png",
                                                "sizes":"120x120",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-144x144.png",
                                                "sizes":"144x144",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-152x152.png",
                                                "sizes":"152x152",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-180x180.png",
                                                "sizes":"180x180",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-precomposed.png",
                                                "sizes":"192x192",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-precomposed.png",
                                                "sizes":"192x192",
                                                "type":"image\/png",
                                                "purpose":"maskable"
                                                },{
                                                "src":"maskable.png",
                                                "sizes":"512x512",
                                                "type":"image\/png",
                                                "purpose":"any maskable"
                                                },{
                                                "src":"icon-512x512.png",
                                                "type":"image\/png",
                                                "sizes":"512x512",
                                                "purpose":"any"
                                                },{
                                                "src":"favicon-16x16.png",
                                                "sizes":"16x16",
                                                "type":"image\/png"
                                                },{
                                                "src":"favicon.ico",
                                                "sizes":"16x16",
                                                "type":"image\/ico"
                                                },{
                                                "src":"favicon-32x32.png",
                                                "sizes":"32x32",
                                                "type":"image\/png"
                                                },{
                                                "src":"favicon-96x96.png",
                                                "sizes":"96x96",
                                                "type":"image\/png"
                                                },{
                                                "src":"ms-icon-70x70.png",
                                                "sizes":"70x70",
                                                "type":"image\/png"
                                                },{
                                                "src":"ms-icon-144x144.png",
                                                "sizes":"144x144",
                                                "type":"image\/png"
                                                },{
                                                "src":"ms-icon-150x150.png",
                                                "sizes":"150x150",
                                                "type":"image\/png"
                                                },{
                                                "src":"ms-icon-310x310.png",
                                                "sizes":"310x310",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon-72x72.png",
                                                "sizes":"72x72",
                                                "type":"image\/png"
                                                },{
                                                "src":"apple-icon.png",
                                                "sizes":"182x192",
                                                "type":"image\/png"
                                                }

                                                
                                                
                                        ]
                                        if (!file) {
                                            alert('Please select an image file.');
                                            return;
                                        }
                                    const imagesAr = [];
                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                            const img = new Image();
                                            _.E_I_S('imgLogoRes').src =  event.target.result;
                                            img.src = event.target.result;
                                            img.onload = function () {
                                              for(var i = 0 ; i < iconsSizes.length; i++){
                                                const sizeE = iconsSizes[i];
                                                const sizeA = sizeE.sizes.split("x");
                                                const sizeIs = sizeA[0];
                                                const maxWidth = sizeIs; // Set your desired width
                                                const maxHeight = sizeIs; // Set your desired height
                                                const canvas = _.CE_('canvas');
                                                canvas.width = maxWidth;
                                                canvas.height = maxHeight;
                                                canvas.background = 'transparent';
                                                const ctx = canvas.getContext('2d');
                                                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
                                                   const resizedImageData = canvas.toDataURL('image/png', 1); 
                                                        imagesAr.push({ image: resizedImageData , src:sizeE.src });
                                              }
                                              let isD = 0;
                                              const uploadIcons =(imgSrcIndex)=>{
                                                    const callback = (res)=>{
                                                        if(res.res){
                                                           
                                                            if(isD < imagesAr.length){
                                                                
                                                                uploadIcons(isD);
                                                                isD = isD + 1;
                                                            }
                                                        
                                                        }
                                                    }
                                                    const imgSrc = imagesAr[imgSrcIndex];
                                                    _._POST('/api',{order:'uploadIcons',icon:imgSrc},callback);
                                              }
                                                uploadIcons();
                                            };
                                        };
                                        reader.readAsDataURL(file);
                            }
                        }
                }
                {
                    t:'icon'
                    c:'ICO-camera F_S_30 pointer F_PR'
                
                
                }
            ]
            
        }
     
    ]
}