module.exports = function(server) {

  // Common Views

  server.route({
    path: '/',
    method: 'GET',
    handler: { view: 'server/views/index.html' }
  });
  
  // Polymer Views

  server.route({
    path: '/polymer/{view?}',
    method: 'GET',
    handler: function(request, reply) {
      reply.view('polymer/' + (request.params.view || 'index') + '.html');
    }
  });

  server.route({
      path: '/polymer/elements/{path*}',
      method: 'GET',
      handler: {
          directory: {
              path: './polymer/elements',
              listing: false,
              index: false
          }
      }
  });
  
  // Component Views
  
  ['index','rsvp'].forEach(function(view) {
    server.route({
        path: '/component/' + view + '/build/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: './component/' + view + '/build',
                listing: false,
                index: false
            }
        }
    });
    
  });

  server.route({
    path: '/component/{view?}',
    method: 'GET',
    handler: function(request, reply) {
      reply.view('component/' + (request.params.view || 'index') + '/index.html');
    }
  });

  // API Endpoints

  require('./api')(server);

  // Bower Components

  server.route({
      path: '/bower_components/{path*}',
      method: 'GET',
      handler: {
          directory: {
              path: './bower_components',
              listing: false,
              index: false
          }
      }
  });

  // Other Public Files

  server.route({
      path: '/{path*}',
      method: 'GET',
      handler: {
          directory: {
              path: './server/public',
              listing: false,
              index: false
          }
      }
  });
  
};
