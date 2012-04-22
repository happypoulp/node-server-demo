/*************************************************
 *
 * ADVANCED SERVER DEMO by Classtar,
 * Based on NodeJS.
 *
**************************************************/

var cookie = require("./modules/cookie-node"),
    NjServer = require("./modules/ninja"); // My custom server


/*************************************************
 *
 * GLOBAL CONFIGURATION
 *
**************************************************/
var CONF = {
    serverHost: '127.0.0.1',
    serverPort: 8000,
    serverURL: this.serverHost + ':' + this.serverPort,
    templateDir: 'templates/'
};


/*************************************************
 *
 * ALL ROUTES - MAPPING BETWEEN "URI" AND CORRESPONDING "CONTROLLER NAME"
 *
**************************************************/
var ROUTES = {
    '/': 'index',
    '/other': 'other',
    '/last': 'last'
};


/*************************************************
 *
 * CONTROLLER HANDLERS - MAPPING BETWEEN "CONTROLLER NAME" AND CORRESPONDING "CONTROLLER FUNCTION"
 *
**************************************************/
var CONTROLLERS = {
    index : function(request, response)
    {
        // Do some stuff here...
        response.setCookie("last_page_visited", 'index', {expires: new Date().getTime() + (1000*60*60*24*365)});

        response.emit('render', {
            'status': 200,
            'template': 'index.html',
            'datas': {
                value: 'a useless string'
            }
        });
    },
    other : function(request, response)
    {
        // Do some stuff here...

        response.emit('render', {
            'status': 200,
            'template': 'other.html',
            'datas': {}
        });
    },
    last : function(request, response)
    {
        // Do some stuff here...

        response.emit('render', {
            'status': 200,
            'template': 'last.html',
            'datas': {}
        });
    },
    _404Controller: function(request, response)
    {
        response.emit('render', {
            'status': 404,
            'template': '404.html',
            'datas': {}
        });
    },
    _staticController: function(request, response)
    {
        response.emit('render', {
            'status': 200,
            'ressourcePath': request.url
        });
    }
};


NjServer.new().init(CONF, ROUTES, CONTROLLERS).start();





// ROUTER TEST
// var Router = require("./modules/ninja/router");
// console.log(Router);
// var r = Router.new(CONF);
// r.setRoutes(ROUTES);
// console.log(r);
// r.handle({url:'/other'});
// console.log(r.getControllerName());

// CONTROLLER TEST
// var Controller = require("./modules/ninja/controller");
// console.log(Controller);
// var c = Controller.new(CONF);
// console.log(c);
// c.setControllerName(r.getControllerName());

