// Initialise Hapi Server

var Hapi = require("hapi");

var server = new Hapi.Server(8080, "localhost", {
  state: {
    cookies: {
      parse: true
    }
  }
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: './'
});

require('./server/routes')(server);

// Start the Server

server.start(function() {
    console.log("Web Components are ready @", server.info.uri);
});
