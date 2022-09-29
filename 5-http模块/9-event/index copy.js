import EventEmitter from 'events'

const event = new EventEmitter()
event.on('play',(data)=>{
    console.log('事件触发了',data);

})
event.emit('play')
setTimeout(()=>{
    event.emit('play','6666')
},2000)
