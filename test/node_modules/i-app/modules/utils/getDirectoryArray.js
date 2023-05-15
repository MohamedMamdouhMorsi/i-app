
function getDirectoryArray(tree,pathD) {

    let ar = [];
    let lastPath =  '' ;

    if(tree.type == "folder"){
        if(tree.name !== '' && tree.name !== 'public'){
        lastPath = pathD +'/'+ tree.name;
    }
   
    for(var c = 0 ; c < tree.children.length; c++){
        if(tree.children[c].type == "folder"){
            const children = getDirectoryArray(tree.children[c] ,lastPath );
                ar = [...ar,...children];
        }else{
            const newPath = lastPath +'/'+ tree.children[c].name;
            ar.push(newPath);
        }
    }

    }else{
        // file case 
            const newPath = pathD +'/'+ tree.name;
            ar.push(newPath);
    }
    
    return ar;
}

module.exports= getDirectoryArray