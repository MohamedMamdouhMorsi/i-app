# i-app 
>nodejs 

## i-app is a full-stack language designed to simplify the development of web applications. It is built with pure JavaScript and can be easily integrated into your project. i-app supports multiple technologies, including JavaScript, Node.js, PHP, and Python.

[![Discord Chat](https://img.shields.io/badge/chat-discord-blue.svg)](https://discord.gg/N5Z7Z8NF)

[![Contribute](https://img.shields.io/badge/help-contribute-551A8B.svg)](https://github.com/MWN-S/i-app)

[<img src='https://i-app.org/img/i-app.gif' width='128'/>](https://i-app.org)



## Welcome To  i-app Revolution .
### Build the Future  Build the Next Big Thing
i-app is a revolutionary new full-stack open-source programming language that aims to help developers improve their productivity by providing them with a working environment and a library of tools to build front-end and back-end applications.



# Installation

To install i-app, simply run:
``` bash

npm install -g i-app-create

```
# Quick Start

## i-app  CLI  
 The i-app CLI (Command Line Interface) is a powerful tool designed to streamline the application development process for developers. It simplifies the setup and configuration of i-app projects by creating a comprehensive copy of the necessary files and folders required for any project utilizing the i-app framework. This automation significantly reduces the initial setup time and effort, allowing developers to focus more on the actual development of their web applications. By providing a standardized and organized project structure, the i-app CLI empowers developers to quickly start building front-end and back-end applications with ease, ultimately enhancing productivity and efficiency in the development process. 
## Start easy
> go to your workspace
and open your command 
Now just run >

``` bash

> i-app-create <your-app-name>

```
i-app will create your Project folder 
and will install needed dependencies 
Now you are ready
Enter your project directory and start coding
``` bash

> cd <your-app-name>

> npm start

```

# Happy Coding :)
## or
# Simply add i-app to your project

if you didn't install -g

> go to your workspace
and open your command 
Now just run >

``` bash

npm i @i-app/i-app

```


# configuration
> ## Easy and Fast use .app

you must be sure is your public folder have i.app file
its basic configer to your app with i-app 

``` javascript
{   
    i_app:true
    id: '1'
    name:'i-app'
    title:'i-app'
    short_name:'i-app'
    description: 'New i-app'
    keywords:'i-app webapp'
    version:'0.0.1'
    te:'website'
    domain:'localhost'
    port: 5000 
    lang:[ 'ar' 'en']
    pwa: true 
    users: true 
    mode: 'dev' 
        dir: { 
            src: '/src/' 
            start: 'home.app' 
            icon: '/img/icon/' 
            db: '/db/' 
            s: '/s/' 
            script: '/js/' 
            css: '/css/' 
            img: '/img/' 
            style: '/css/style.json' 
            colors: '/css/colors.json'
        }
}

```

# Usage

To use i-app in your project, simply import it:

``` javascript
const iApp = require('i-app');
iApp.start();

```
## Learn .app file structure
The structure of the file is similar to a Jison file or a JavaScript object. You can use ',' commas or not as you like. You can also use comments of all known tes.

# Examples 

``` javascript
{
    /* No cote ',' or ';'  */ 
    /*you can easy integrate and render any component app by I:'filename' anther keys will inject the  a new copy from your component , you can pass any information insted the i: key and some anther private key   
    */
    I:'menu'
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

    /**t: or t if you dont write te key t it will back 
    * as default as layout and layout in web version = </div> 
    * return or choose t:( tx=</p> | ti=</h1> or use html
    *  tag  a | p | b | img etc..) 
    * */
    t:'ly'
    /**
     * v: key
     * shared data virable changed synctacly with objects
     * you can use from and where you want at the app
     * 
    */
    v:{
        data:{
            key:value
        }
        id:1
        state:false
        /**/
    }
     /*
     c:
     bassic css class
     iapp.min.css
     auto css class 
     B_'colorkey' = background:var(--color)
     P_5 = padding:5px
     F_W = color:#fff
     connected with colors
     1-colors balet 
     colors.json 
     2-theme ballet 
     to switch between dark and light mode 
     style.json  
     */
  
    c:'WW HH FW'

    /**
      * you can write html style
      * with all it power if you need
      */
     
    style:{
        minWidth:'50px'
    }

     /** s can be string as next example or it can be array
     * and theres a lot of kind of object like auto text
     *  translate or query text and many of anther functions
     *  
     * you can under stand 
     *  from the next code text render before any anther 
     * e in innerHtml
       */
       
    s:'hello world'

      /**
       * or
      */

    s:'t.{translate-string-key} v.{value of varibale for public v: key } val.{for input element value and it take id of target element}'
     
     /**
       * 
       * you can easy render anther  elements to make 
       * any your dream app tree 
       */

    e:[{
        t:'t'/** t= table */
        e:[{
            t:'tr'
            e:[{
                t:'th'
                s:'No'
            }
            {
                t:'th'
                s:'Name'
            }
            {
                t:'th'
                s:'Title'
            }]

        }]
      }]
    

    /** data: you can write a  query  to database 
     * and connect to i-app-server [mysql]
     * */

    data:[
            {
                a: 'get'        /* query actions 
                                    get = SELECT ,
                                    getJ = SELECT and JOIN , 
                                    del = DELETE , 
                                    up = UPDATE 
                                */
                n: 'emploees'   // table-name
                s: ['A']        //All columns or select column name ['id' 'username'...]
                l: 0            //limit
                q: [
                    //OR>> the q:[0] is the OR index you can push many OR 
                    [
                        //AND>> q:[*][*] is the AND index you can push many AND under OR condition
                        [
                            1 /* or */ 'coulmn-name'
                            
                            0 /* value*/
                            'uneq' /* condition relation */
                            /**
                            eq:'='
                            uneq:'!='
                            gr:'>'
                            greq:'>='
                            le:'<'
                            leeq:'<='
                            like:'LIKE'
                            */
                        ]
                    ]
                ]
            }
    ]
   
    before:[{
       
        s: 'element text before render query '
    }]

    /** model: 
     * render your query inside the etement or 
     * anther and you control every index
     *  by q:{s:static string i: index data you chose to key with}
     *  wich generte uniqe i 
     * every model will parse one index data

     * */
    model: [{
        t: 'tr'
        q: {
            s: 'id_'
            i: 'id'
        },
        e:[
            {
                t:'td'
                s:'q.{no}'
            }
            {
                t:'td'
                s: 'q.{name}'
            }
            {
                t:'td'
                s: 'qt.{title}'
            }
        ]
       
    }]

    /** if query back FALSE or [] it will render else */
    
    else:[{
       
        s: 'no-data-error' 
    }]

    after:[{
       
        s: 'element text after render query '
    }]

    /*
        Actions 
        with event listner
        use key a:
        to open new action listner
        event will be default as click event
        theres anther custom event 'auto'
        it will rrun your action after 300 ms as a default 
        you cab use it as set time out function it you set time:1000 key with your Nunmber of ms
    */
    a:{
        e:'blur'
        time:1000
        fn:{
            // by default you will recive inside that function 2 var
            //-1  v   its shared object data 
            //-2  Q   Query object injected with start new element  In this case, information is inherited from each parent to his child and anther way to use 
            //-3  _    its easy way to use a huge tools libary
            // of funcation make  you build and control easy
            //for more understand read i-app-tools
            // try _.CL('Hello World') = console.log('Hello World')
            /* 
                or CR(
                    {
                    i:'elementName'
                    e:[
                        // some elements
                    ]
                    },
                    'some-parent',
                    {queryValue:'Hello world'}
                    );
            */
        }
    }
  
   
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