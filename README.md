## Available Scripts

In the project directory, you can run:

### `npm install --s`

install node packages

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `cd backend && npm install && cp .env.example .env`
Install backend packages, then put your MongoDB connection string in `backend/.env` as `MONGO_URI`.

### `cd backend && node Server.js`
Runs the API server on port 3002 (the frontend proxies `/items` to it).
