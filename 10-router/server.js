import { readFileSync } from 'fs';
import http from 'http'
import router from './router.js';

function startServer(){
    http.createServer((req, res) => {
       
        // console.log();
        router(req,res)
    }).listen(5000, () => {
        console.log('server start');
    })
}

export default startServer;