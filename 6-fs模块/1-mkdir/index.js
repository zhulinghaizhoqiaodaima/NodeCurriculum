
import { mkdir, rename, rmdir, writeFile, appendFile,readFile,unlink,
    readdir,
    unlinkSync
} from 'fs';
//创建文件夹
// mkdir('./avatar',(err)=>{
//     if(err&&err.code==='EEXIST') {
//         console.log('目录已经存在');
//     }
// })

//重命名文件夹
// rename('./avatar','./avatar2',(err)=>{
//     if(err &&err.code==='ENOENT') { // enoent
//         console.log('目录不存在');
//     }
// })

//移除空文件夹
// rmdir('./avatar2', (err) => {
//     if (err && err.code === 'ENOENT') { // enoent
//         console.log('目录不存在');
//     }
// })

//写入
// writeFile('./avatar/test.txt','hellow world',err=>{
//     console.log(err);
// })

//追加写入
// appendFile('./avatar/test.txt', `你的好爹地 
// hhhhhh
// world`, err => {
//     console.log(err);
// })

//读取文件
// readFile('./avatar/test.txt','utf-8',(err,data)=>{
//     if(!err) {
//         console.log(data);
//     }
// })


//删除文件
// unlink('./avatar/test.txt',(err)=>{
//     if(err.code === 'ENOENT') {
//         console.log('文件已删除');

//     }
// })
//删除不为空的文件夹

readdir('./avatar',(err,data)=>{
    if(!data) {
        return;
    }
    if(!err){
        console.log(data);
    }
    data.forEach(item=>{
        unlinkSync(`./avatar/${item}`,(err)=>{
        })
    })
    rmdir('./avatar',(err)=>{
        console.log(err);
    })
})
