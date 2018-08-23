// Require Module
var http = require ('http');
var url = require ('url');
var path = require ('path');
var fs = require ('fs');

//Array of Mime Types
var mimeType = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpeg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css"
};

/**@description create server
 * @param req.url is the request url
 * @param process.cwd returns the current working directory of the process
 * @param req is request
 * @param res is respond
 */
http.createServer (function(req, res){
    var uri = url.parse(req.url). pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading' + uri);
    var stats;
//Check if the file name exists else return 404 
    try{
        stats = fs.lstatSync(filename)
    }catch(e) {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    //Check if it is a file/directory
    //if file redirect successful
    if(stats.isFile()){
        var mimeType = mimeTypes [path.extname(filename).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type': mimeType})

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    }//else if a directoty redirect to homepage 
    else if (stats.isDirectory()){
        res.writeHead(302, {
            'Location' : "index.html"
        });
        res.end();
    }//else return internal server error 
    else {
        res.writeHead (500, {"Content-type": "text/plain"})
        res.write ("500 Internal Error");
        res.end();
    }
}).listen(3000);