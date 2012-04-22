var path = require("path"),
    swig = require("swig"),
    fs = require("fs");

swig.init({
    allowErrors: true,
    autoescape: true,
    encoding: 'utf8',
    filters: {},
    root: global.CONF ? CONF.templateRoot : '/',
    tags: {},
    extensions: {},
    tzOffset: 0
});

/*************************************************
 *
 * VIEW CLASS
 *
**************************************************/
var View = function()
{
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
        var output = swig.compileFile(this.template).render(this.templateDatas);

        this.response.writeHead(this.status, {
            "Content-Type": "text/html",
            'Content-Length': Buffer.byteLength(output, 'utf8')
        });
        this.response.end(output, "utf8");
    };
}

module.exports.new = function()
{
    return new View();
};
