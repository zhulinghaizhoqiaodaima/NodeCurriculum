let username = document.querySelector('#username')
let password = document.querySelector('#password')
let login = document.querySelector('#login')
let loginpost = document.querySelector('#loginpost')

login.onclick = ()=>{
    // console.log(username.value,password.value);
    fetch(`/api/login?username=${username.value}&password=${password.value}`).then(res=>res.json()).then(res=>{
        console.log(res);
    })
}

loginpost.onclick = ()=>{
    // console.log(username.value,password.value);
    fetch(`/api/loginpost`,{
        method:'POST',
        body:JSON.stringify({
            username:username.value,
            password:password.value
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json()).then(res=>{
        console.log(res);
    })
}
