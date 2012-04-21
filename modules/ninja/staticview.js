var path = require("path"),
    fs = require("fs");


/*************************************************
 *
 * STATICVIEW CLASS
 *
**************************************************/
var StaticView = function(conf)
{
    this.conf = conf;

    this.init = function(controllerDatas, response)
    {
        this.response = response;
        this.status = controllerDatas.status;
        this.ressourcePath = controllerDatas.ressourcePath;

        return this;
    }

    this.render = function()
    {
        var filename = path.join(process.cwd(), this.ressourcePath);

        path.exists(filename, function(exists)
        {
            if(!exists)
            {
                this.response.writeHead(404, {"Content-Type": "text/plain"});
                this.response.write("404 Not Found!");
                this.response.end();
                return;
            }

            fs.readFile(filename, "binary", function(err, file)
            {
                if(err)
                {
                    this.response.writeHead(404, {"Content-Type": "text/html"});
                    this.response.write("404 Not Found!");
                    this.response.end();
                    return;
                }

                var contentType = {'css': 'text/css', 'js': 'text/javascript', 'png': 'image/png', 'jpg': 'image/jpg', 'gif': 'image/gif'}[filename.replace(/.+\.([a-z]+)$/, '$1')] || 'text/html';

                this.response.writeHead(200, {
                    "Content-Type": contentType,
                });
                this.response.write(file, "binary");
                this.response.end();
            }.bind(this));
        }.bind(this));
    };
}

module.exports.new = function(conf)
{
    return new StaticView(conf);
};
