
// let params = new URLSearchParams('name=zhulinhai&age=18&face=handsome');
// console.log(params);
// console.log(params.get('name'));
// console.log(params.toString());


import { unescape } from 'node:querystring'
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = unescape(str)
console.log(unescaped)