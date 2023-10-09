# Canva-web-app
![image](https://github.com/sonu7524/Canva-web-app/blob/master/Screenshot%20(32).png)

## Development

1. Clone the repo

```
git clone [github https url]
```

2. Install packages

First run `npm install node -g` to install node globally (if you haven't already).

Then run- :

```
npm run setup
```

To install node_modules for client and server. After installation, you should now see a `node_modules` folder.

3. Set up your `.env` file inside the server folder.
```
MONGODB_URI=
PORT=

```

## file storage

**This repo can load multiple images**

1. create a `uploads` folder in server, it will contains all the images that are uploaded by frontend.

## Run the app

`npm run dev`- It uses concurrently library to run server and clinet together on different ports.


## Refernces
- Visit [konva](https://konvajs.org/docs/react/index.html)
- Visit [mongodb](https://www.mongodb.com/docs/)
