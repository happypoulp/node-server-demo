var View = require('./view'),
    StaticView = require('./staticview');

/*************************************************
 *
 * CONTROLLER CLASS
 *
**************************************************/
var Controller = function(conf)
{
    this.controllers = {};
    this.conf = conf;

    this.setControllers = function(controllers)
    {
        this.controllers = controllers;

        return this;
    }

    this.setControllerName = function(name)
    {
        this.name = name;

        return this;
    }

    this.run = function(request, response)
    {
        this.handler = this.controllers[this.name] || this.controllers['_404Controller'];

        response.on('render', function(controllerDatas)
        {
            if (this.name != '_staticController')
            {
                var CONFDatas = {};

                controllerDatas.datas = controllerDatas.datas ? controllerDatas.datas : {};

                for (key in CONFDatas)
                {
                    controllerDatas.datas[key] = CONFDatas[key];
                }

                View.new(this.conf).init(controllerDatas, response).render();
            }
            else
            {
                StaticView.new(this.conf).init(controllerDatas, response).render();
            }
        }.bind(this));

        this.handler(request, response);
    };
}

module.exports.new = function(conf)
{
    return new Controller(conf);
};

