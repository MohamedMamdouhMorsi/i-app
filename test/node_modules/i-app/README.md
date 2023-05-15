# i-app - 
> BETA  ( javascript , nodejs ) v-1.0.4


### i-app is a full-stack language designed to simplify the development of web applications. It is built with pure JavaScript and can be easily integrated into your project. i-app supports multiple technologies, including JavaScript, Node.js, PHP, and Python.

[![Discord Chat](https://img.shields.io/badge/chat-discord-blue.svg)](https://discord.gg/N5Z7Z8NF)

[![Contribute](https://img.shields.io/badge/help-contribute-551A8B.svg)](https://github.com/MWN-S/i-app)

[<img src="https://i-app.org/img/i-app.gif" width="128"/>](https://i-app.org)



## Welcome To  i-app Revolution
### Build the Future  Build the Next Big Thing
i-app is a revolutionary new full-stack open-source programming language that aims to help developers improve their productivity by providing them with a working environment and a library of tools to build front-end and back-end applications.



# Installation

To install i-app, simply run:
``` bash

npm i @i-app/i-app

```

# Usage

To use i-app in your project, simply import it:

## Front-end usage 
you can easy use i-app cdn

``` html
<script src="cdn.i-app.org" defer sync>
```
## Full-stack usage
``` javascript
const iApp = require('i-app');

```
# configuration
you must be sure is your public folder have i.app file
its basic configer to your app with i-app 
``` javascript
{   
    i_app:true
    id: "1"
    name:"i-app"
    title:"i-app"
    short_name:"i-app"
    description: "New i-app"
    keywords:"i-app webapp"
    version:"0.0.1"
    type:"website"
    domain:"localhost"
    lang: ["en","ar"]
    mode:"dev"
    dir:{
        dir:"/src/"
        start:"start.app"
        icon:"/img/icon/"
        db:"/db/"
        txt:"/txt/"
        script:"/js/"
        css:"/css/"
        style:"/css/style.json"
        colors:"/css/colors.json"
    }
}

```
> ## Easy and Fast use .app

## Learn .app file structure
The structure of the file is similar to a Jison file or a JavaScript object. You can use ',' commas or not as you like. You can also use comments of all known types.

# Examples 

``` javascript
{
    /* No cote ',' or ';'  */ 
    /*you can easy render any componet app by 
    I:"filename" or IRoute:"filename"
    anther keys will return false in that case
    */
    I:"menu"
    /** i: its element key its like id in html but its not
     *  render atterbute for security you can also use 
     *  id: insted for
     *  public use in DOM 
     * */
    i:'app'
    /**
     * or you can use normal id atterbute for public call
    */
   id:'app'

    /**typ: or t if you dont write type key = typ it will back 
    * as default as layout and layout in web version = </div> 
    * return or choose typ:( tx=</p> | ti=</h1> or use html
    *  tag  a | p | b | img etc..) 
    * */
     typ:"ly"
     /**
      * or 
     */
    t:'ly'

     /*
     cls: or c:
     bassic css class
     iapp.min.css
     auto css class 
     B_"colorkey" = background:var(--color)
     P_5 = padding:5px
     F_W = color:#fff
     connected with colors
     1-colors balet 
     colors.json 
     2-theme ballet 
     to switch between dark and light mode 
     style.json  
     */
     cls:["WW","HH","F_W"]
     /*
     or
     */
    c:'WW HH FW '

    /**
      * you can write html style
      * with all it power if you need
      */
     
     style:{
        minWidth:"50px"
    }

     /** txt can be string as next example or it can be array
     * of txt object [{t:"d" d:"hello world"}]
     * and theres a lot of kind of object like auto text
     *  translate or query text and many of anther functions
     *  
     * you can under stand 
     *  from the next code text render before any anther 
     * elm in innerHtml
       */
       
      txt:"hello world"

      /**
       * or
      */

     s:'t.{translate-string-key} v.{value of varibale for public v: key } val.{for input element value and it take id of target element}'
     
     /**
       * 
       * you can easy render anther  elements to make 
       * any your dream app tree 
       */

      elm:[{
        typ:"t"/** t= table */
        elm:[{
            typ:"tr"
            elm:[{
                typ:"th"
                txt:"No"
            },{
                typ:"th"
                txt:"Name"
            },{
                typ:"th"
                txt:"Title"
            }]

        }]
      }]
    

    /** data: you can write a  query  to database 
     * and connect to i-app-server [mysql]
     * */

    data:[
        {
                    a: "get"
                    n: "emploees"
                    s: ["A"]
                    l: 0
                    q: [
                        [
                            [1, 0, "uneq"]
                        ]
                    ]
                }
    ]
   
    before:[{
       
        txt: "element text before render query "
    }]
    /** model: 
     * render your query inside the etement or 
     * anther and you control every index
     *  by q:{s:static string i: index data you chose to key with}
     *  wich generte uniqe i 
     * every model will parse one index data

     * */
    model: [{
        typ: "tr"
        q: {
            s: "id_",
            i: "id"
        },
        elm:[
            {
                typ:"td"
                txt: { t: "d", c: "q", d: "no" }
            }, {
                typ:"td"
                txt: { t: "d", c: "q", d: "name" }
            },
            {
                typ:"td"
                txt: { t: "d", c: "qtx", d: "title" }
            }
        ]
       
    }]
    /** if query back FALSE or [] it will render else */
    
    else:[{
       
        txt: {t:"s",d:"no-data-error" }
    }]
    after:[{
       
        txt: "element text after render query "
    }]

    /** if you insert function it will be default 
     * onclick function you can choose between all function 
     * types */
    fn["fn name"](){}
    }
```
---
## Read More ... https://i-app.org

---



## if You use Vscode For Best development install i-app Extension 
## https://marketplace.visualstudio.com/items?itemName=i-app.i-app
or 
visit 

## https://github.com/MWN-S/i-app-vscode-ex





### License
This extension is licensed under the MIT License. See the LICENSE file for details.