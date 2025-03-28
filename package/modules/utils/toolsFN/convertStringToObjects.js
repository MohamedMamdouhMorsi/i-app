   const newStringOb = (str)=>{
           if(typeof str === 'string'){

            const strAr      = str.split("");
            var Laststr      = "";
            const prag       = [];

            
            var isObject     = false;
            var cutAndUp     = false;
            var stateType    = 'free'; 
            var objectKey = "";
            var recordObject = false;
            var recordObjectStart = 0;
            for(var i = 0 ; i < strAr.length; i++){

                var pushedToprag       = false;
                const alpha      = strAr[i];
                if(isObject && alpha === '}'){
                    isObject = false;
                    Laststr = Laststr+'}';
                    
                    prag.push({t: stateType , s:`${ Laststr }`});
                    pushedToprag       = true;

                    if(recordObject){

                        if(langOB[objectKey]){
                            processed[objectKey] = true;
                            recordObject = false;
                            objectKey = "";
                        }
                    }
                    Laststr = "";
                    stateType = 'free';
                }else{
                    if(isObject ){
                        Laststr = `${Laststr}${alpha}`;
                    }else{

                        var isKey_ = isKey(i,str);

                        if(stateType == 'free' && isKey_ ){
                            // if key for transalate start to record it 
                            if(isKey_ == "t" || isKey_ == "qt" || isKey_ == "vt"){
                                recordObject = true;
                                if(isKey_ == "t"){
                                    recordObjectStart = 2;
                                }else{
                                    recordObjectStart = 3;
                                }
                            }

                                isObject    = true;
                                prag.push({t: stateType , s:`${ Laststr }`});
                                pushedToprag       = true;
                                Laststr     = ""; 
                                Laststr     = alpha; 
                        }
                    }
                }
                
                
             


                if(isObject && alpha !== '}' && recordObject){

                    if(recordObjectStart > 0){

                        recordObjectStart = recordObjectStart - 1;

                    }else{
                        objectKey += alpha;
                    }

                }

                    

                    if(!pushedToprag && i == strAr.length - 1){

                        prag.push({t: stateType , s:`${ Laststr }`});

                    }

             

            }
                    var newStr = "";
                    console.log(prag)                  
                    for(var i = 0 ; i < prag.length; i++){
                        if(prag[i].t == 'free'){

                            const isStringExist_            = isStringExist(prag[i].s);

                            if(isStringExist_){

                                newStr += `t.{${isStringExist_}}`;
                                processed[isStringExist_] = true;
                            }else{

                                const isStr                  = prag[i].s.replace(/[^a-z]/g, '');

                                if(isStr !== ''){

                                    const shortName          = makeShortName(prag[i].s);
                                    
                                    langOB[shortName]        = prag[i].s;
                                    newStr                 += `t.{${shortName}}` ;
                                    processed[shortName] = true;
                                }else{
                                    lastStr += prag[i].s ;
                                }
                            }
                        
                        }else{
                            lastStr += prag[i].s ;
                        }
                    }
                 
                return lastStr;
            }else{
                return str;
            }
        }