import { promises as fs } from 'fs';

// fs.mkdir('./avatar').then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })

fs.readFile('./avatar/test.txt','utf-8').then(res=>{
    console.log(res);
})

