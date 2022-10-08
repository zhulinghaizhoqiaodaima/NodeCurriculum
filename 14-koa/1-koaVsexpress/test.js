async function  test1(){
    console.log(1111);
    await test2()
    console.log(2222);
}

async function test2(){
    console.log(3333);
    await delay(1000)
    console.log(4444);
}

function delay(time){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,1000)
    })
}

test1()