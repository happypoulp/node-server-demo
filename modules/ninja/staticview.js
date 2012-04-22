var path = require("path"),
    fs = require("fs");

/*************************************************
 *
 * STATICVIEW CLASS
 *
**************************************************/
var StaticView = function()
{
    this.init = function(controllerDatas, response)
    {
        this.response = response;
        this.status = controllerDatas.status;
        this.ressourcePath = controllerDatas.ressourcePath;

        return this;
    }

    this.onError = function()
    {
        this.response.writeHead(404, {"Content-Type": "text/plain"});
        this.response.end("404 Not Found!");
    };

    this.render = function()
    {
        this.filename = path.join(CONF.staticRoot, this.ressourcePath);
        
        path.exists(this.filename, function(exists)
        {
            if(!exists)
            {
                return this.onError();
            }

            var readStream = fs.createReadStream(this.filename, {
                encoding: 'utf8'
            });

            readStream.on('error', this.onError);

            readStream.once('open', function ()
            {
                var contentType = {'css': 'text/css', 'js': 'text/javascript', 'png': 'image/png', 'jpg': 'image/jpg', 'gif': 'image/gif'}[this.filename.replace(/.+\.([a-z]+)$/, '$1')] || 'text/html';

                this.response.writeHead(200, {
                    "Content-Type": contentType
                });

            }.bind(this));

            readStream.pipe(this.response);

        }.bind(this));
    };
}

module.exports.new = function()
{
    return new StaticView();
};
