var express = require('express');
var app = express();
//app.use(express.static('src'));
app.get('*',function(req,res){
    res.sendFile( __dirname + req.url);
});

app.listen(8888,'127.0.0.1',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('成功启动服务器');
    }
});
