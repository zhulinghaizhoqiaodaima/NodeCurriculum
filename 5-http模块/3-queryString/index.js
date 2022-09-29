import querystring from 'querystring'
import { URL } from 'url';
let params;
params = new URLSearchParams('name=zhulinhai&age=18&face=handsome');
console.log(params);
console.log(params.get('user'));
console.log(params.toString());
