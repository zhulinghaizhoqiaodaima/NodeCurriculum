import { createReadStream } from "fs";

const rs = createReadStream('./test.txt')
rs.on('data',(chunk)=>{
    console.log(chunk.toString('utf-8'));

})
rs.on('end',()=>{
    console.log('end');
})
rs.on('error',(err)=>{
    console.log(err);
})
 