# todo

A very simple TODO application build on Node.js.

## Install

```bash
$ make install

# or on windows:
$ npm install --registry=http://r.cnpmjs.org
```

## Run

```bash
$ node app.js
```

## Project Directory

```bash
$ tree -I node_modules
.
├── Makefile
├── README.md
├── app.js
├── config.js
├── controllers
│   ├── home.js
│   └── task.js
├── models
│   ├── db.js
│   ├── index.js
│   └── task.js
├── package.json
├── public
│   ├── images
│   │   ├── doing.gif
│   │   └── finished.jpg
│   └── styles
│       ├── index
│       │   ├── images
│       │   │   ├── bg_1.png
│       │   │   ├── email.png
│       │   │   ├── home.png
│       │   │   ├── msn.png
│       │   │   ├── ok.gif
│       │   │   ├── qq.png
│       │   │   └── website.png
│       │   └── style.css
│       └── reset.css
├── routes.js
└── views
    ├── error.html
    ├── index.html
    ├── layout.html
    └── task
        └── edit.html

9 directories, 26 files
```
