<h1 align="center">ExpressJS - Kenal (web-based realtime chat application)</h1>

<p align="center">
    <a href="https://github.com/rizqonmaulana/kenalchat-BE/issues">Report Bug</a>
    ·
    <a href="https://github.com/rizqonmaulana/kenalchat-BE/issues">Request Feature</a>
  </p>

Kenal is a web-based realtime chat application, with Kenal we can make friends with other people and chat with them. kenal built with Express JS, Vue JS and MySQL. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name startup_coffee, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/8213807/TW6uppWE)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost
DB_NAME=kenal_db
DB_USER=root
DB_PASS=
DB_TIMEZONE=UTC
PORT=3000
URL=https://kenal.netlify.app
MAIL_NAME= please use your email
MAIL_PASS= please use your email password

```

## License

© [Rizqon Maulana](https://github.com/rizqonmaulana/)
