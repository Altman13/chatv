var http = require('http').Server();
var io=require('socket.io')(http);
var Redis= require('ioredis');

var redis = new Redis();
redis.subscribe('chat-action');
redis.on('message', function (channel, message){
console.log('Message recieved:' + message);
console.log('Channel: ' + channel);
message = JSON.parse(message);
io.emit(channel + ':' +message.event, message.data);
});
http.listen(3000, function () {
    console.log('Прослушиваем порт :3000');
});
