const path = require('path');
const fs = require('fs');
function searchFiles(tree, fileName) {
 
 
    if (tree.type === 'file' && tree.name === fileName) {
     return tree;
    }
    
    if (tree.children && tree.children.length > 0) {
      for (var k = 0 ; k < tree.children.length; k++) {
            
        const child = tree.children[k];

              if(child.name === fileName){
                  return child;
                }else{
                  if(child.children  && child.children.length > 0){
                      const searchTest =   searchFiles(child,fileName)
                        if(searchTest){
                            return searchTest;
                        } 
                  }
                }
        }
    }
  
      return false
  }
  module.exports = searchFiles