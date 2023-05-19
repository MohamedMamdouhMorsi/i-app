const crypto = require('crypto')

const  creatAUTH = (x)=> {
      const salt = "app";
      const salt1 = "be";
      const salt2 = "gh";
      const salt3 = "vt";
      const salt4 = "sd";
      
      let supercode = "";
    
      let mdfcode1 = crypto.createHash('md5').update(x).digest('hex');
      let sha1code1 = crypto.createHash('sha1').update(mdfcode1).digest('hex');
      let cryptcode1 = crypto.createHmac('sha256', salt).update(sha1code1).digest('hex');
    
      let mdfcode2 = crypto.createHash('md5').update(cryptcode1).digest('hex');
      let sha1code2 = crypto.createHash('sha1').update(mdfcode2).digest('hex');
      let cryptcode2 = crypto.createHmac('sha256', salt1).update(sha1code2).digest('hex');
    
      let mdfcode3 = crypto.createHash('md5').update(cryptcode2).digest('hex');
      let sha1code3 = crypto.createHash('sha1').update(mdfcode3).digest('hex');
      let cryptcode3 = crypto.createHmac('sha256', salt2).update(sha1code3).digest('hex');
    
      let mdfcode4 = crypto.createHash('md5').update(cryptcode3).digest('hex');
      let sha1code4 = crypto.createHash('sha1').update(mdfcode4).digest('hex');
      let cryptcode4 = crypto.createHmac('sha256', salt3).update(sha1code4).digest('hex');
    
      let mdfcode5 = crypto.createHash('md5').update(cryptcode4).digest('hex');
      let sha1code5 = crypto.createHash('sha1').update(mdfcode5).digest('hex');
      let cryptcode5 = crypto.createHmac('sha256', salt4).update(sha1code5).digest('hex');
    
      let mdfcode6 = crypto.createHash('md5').update(cryptcode5).digest('hex');
      let sha1code6 = crypto.createHash('sha1').update(mdfcode6).digest('hex');
      let cryptcode6 = crypto.createHmac('sha256', salt).update(sha1code6).digest('hex');
      mdfcode6 = crypto.createHash('md5').update(cryptcode6).digest('hex');
      
      supercode = "I-app-" + mdfcode6;
      return supercode;
       }
module.exports = creatAUTH