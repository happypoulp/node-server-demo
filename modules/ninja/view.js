var path = require("path"),
    swig = require("swig"),
    fs = require("fs");

swig.init({
    allowErrors: false,
    autoescape: true,
    encoding: 'utf8',
    filters: {},
    root: '/',
    tags: {},
    extensions: {},
    tzOffset: 0
});

/*************************************************
 *
 * VIEW CLASS
 *
**************************************************/
var View = function(conf)
{
    this.conf = conf;

    this.init = function(controllerDatas, response)
    {
        this.templateDatas = controllerDatas.datas;
        this.response = response;
        this.status = controllerDatas.status;
        this.template = controllerDatas.template;
        this.context = controllerDatas.context;

        return this;
    }

    this.onError = function()
    {
        this.response.writeHead(404, {"Content-Type": "text/plain"});
        this.response.end("404 Not Found!");
    };

    this.render = function()
    {
        var filename = path.join(process.cwd(), this.conf.templateDir + this.template);

        path.exists(filename, function(exists)
        {
            if(!exists)
            {
                return this.onError();
            }

            this.renderByReadfile(filename);

        }.bind(this));
    };

    this.renderByReadfile = function(filename)
    {
        fs.readFile(filename, "utf8", function(err, file)
        {
            if(err)
            {
                return this.onError();
            }

            var output = swig.compile(file)(this.templateDatas);

            this.response.writeHead(this.status, {
                "Content-Type": "text/html",
                'Content-Length': Buffer.byteLength(output, 'utf8')
            });
            this.response.end(output, "utf8");
        }.bind(this));
    };
}

module.exports.new = function(conf)
{
    return new View(conf);
};
