var path = require("path"),
    tmpl = require("../tmpl-node"),
    fs = require("fs");


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

    this.render = function()
    {
        var filename = path.join(process.cwd(), this.conf.templateDir + this.template);

        path.exists(filename, function(exists)
        {
            if(!exists)
            {
                this.response.writeHead(404, {"Content-Type": "text/plain"});
                this.response.write("404 Not Found!");
                this.response.end();
                return;
            }

            fs.readFile(filename, "utf8", function(err, file)
            {
                if(err)
                {
                    this.response.writeHead(404, {"Content-Type": "text/html"});
                    this.response.write("404 Not Found!");
                    this.response.end();
                    return;
                }

                var output = tmpl.compile(file)({'D': this.templateDatas || {}});
                // output = "hello world!\nnew line";
                console.log(output);

                this.response.writeHead(this.status, {
                    "Content-Type": "text/html"
                    // 'Content-Length': Buffer.byteLength(output, 'utf8')
                });
                // this.response.write(output, "utf8");
                this.response.end(output, "utf8");
            }.bind(this));
        }.bind(this));
    };
}

module.exports.new = function(conf)
{
    return new View(conf);
};
