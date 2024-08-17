import http from 'http'
import app from './bin/api/Server.js'
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT;


const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server up and running');
})