var url = require("url"),
    querystring = require("querystring");


/*************************************************
 *
 * ROUTER CLASS
 *
**************************************************/
var Router = function(conf)
{
    this.routes = {};
    this.conf = conf;

    this.setRoutes = function(routes)
    {
        this.routes = routes;

        return this;
    }

    this.handle = function(request)
    {
        // Request parameters
        request.OBJ = this.requestObject = url.parse(request.url);
        request.GETS = this.requestGets = querystring.parse(this.requestObject.query);
        request.PATHNAME = this.requestPathname = this.requestObject.pathname;

        // Routing infos
        this.isStaticRessource = this.requestPathname.match(/^\/statics\//);
    }

    this.getControllerName = function()
    {
        return this.isStaticRessource ? '_staticController' : this.routes[this.requestPathname];
    };
}

module.exports.new = function(conf)
{
    return new Router(conf);
};
