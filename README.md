
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start  http://192.168.0.78:8360/login```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

```
运行前修改IP   www/static/js/socketEvent.js
             src/common/config/config.js
```