var http = require("http"),
    util = require("util"),
    Controller = require('./controller'),
    router = require('./router');

var NjServer = function()
{
    this.router = null;
    this.controller = null;

    this.init = function(routes, controllers)
    {
        this.router = router.new();
        this.controller = Controller.new();

        this.router.setRoutes(routes);
        this.controller.setControllers(controllers);

        return this;
    }

    /*************************************************
     *
     * SERVER
     *
    **************************************************/
    this.start = function()
    {
        if (!global.CONF || !this.router || !this.controller)
        {
            console.log('UNABLE TO START SERVER : MISSING global.CONF, Routes or Controllers...');
            return;
        }

        http.createServer(function(request, response)
        {
            this.router.handle(request);

            var controllerName = this.router.getControllerName(); // console.log(controllerName);

            this.controller.setControllerName(controllerName);
            this.controller.run(request, response);
        }.bind(this)).listen(CONF.serverPort);

        util.puts('Server running at http://' + CONF.serverHost + ':' + CONF.serverPort);
    }
}

module.exports.new = function()
{
    return new NjServer();
};
