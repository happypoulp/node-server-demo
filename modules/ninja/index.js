var http = require("http"),
    util = require("util"),
    Controller = require('./controller'),
    router = require('./router');

var NjServer = function()
{
    this.conf = null;
    this.router = null;
    this.controller = null;

    this.init = function(conf, routes, controllers)
    {
        this.conf = conf;
        this.router = router.new(conf);
        this.controller = Controller.new(conf);

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
        if (!this.conf || !this.router || !this.controller)
        {
            console.log('UNABLE TO START SERVER : MISSING conf, Routes or Controllers...');
            return;
        }

        http.createServer(function(request, response)
        {
            this.router.handle(request);

            var controllerName = this.router.getControllerName(); // console.log(controllerName);

            this.controller.setControllerName(controllerName);
            this.controller.run(request, response);
        }.bind(this)).listen(this.conf.serverPort);

        util.puts('Server running at http://' + this.conf.serverHost + ':' + this.conf.serverPort);
    }
}

module.exports.new = function()
{
    return new NjServer();
};
