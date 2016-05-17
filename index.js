var server = require('./server');
var port = process.env.port || 8080;

server.listen(port, function(){
    console.log('Now running on port ' + port);
});