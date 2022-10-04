import { createReadStream, createWriteStream } from 'fs';
import http from 'http';
import zlib from 'zlib'
const gzip = zlib.createGzip()
http.createServer((req,res)=>{
    const readStream = createReadStream('./test.txt')
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Content-Encoding':'gzip'})
    readStream.pipe(gzip).pipe(res)


}).listen(5000,()=>{
    console.log('serve start');
})