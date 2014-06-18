function checkRSVP(rsvp) {
  if (rsvp === 'true') {
    return true;
  } else if (rsvp === 'false') {
    return false;
  }
  return undefined;
}

module.exports = function(server) {
  
  server.route({
    path: '/api/ping',
    method: 'GET',
    handler: function(request, reply) {
      
      reply({ _ts: Date.now() });
      
    }
  });
  
  server.route({
    path: '/api/whoami',
    method: 'GET',
    handler: function(request, reply) {
      
      reply({ user: request.state.user || false });
      
    }
  });
  
  server.route({
    path: '/api/signin',
    method: 'GET',
    handler: function(request, reply) {
      
      var user = 'jedwatson';
      
      reply.state('user', user);
      reply({ user: user });
      
    }
  });
  
  server.route({
    path: '/api/signout',
    method: 'GET',
    handler: function(request, reply) {
      
      reply.state('user', false);
      reply({ user: false });
      
    }
  });
  
  server.route({
    path: '/api/rsvp/{rsvp}',
    method: 'GET',
    handler: function(request, reply) {
      
      if (request.params.rsvp === 'check') {
        return reply({
          rsvp: checkRSVP(request.state.rsvp)
        });
      }
      
      (request.params.rsvp === 'true') ? true : false;
      
      var rsvp = checkRSVP(request.params.rsvp);
      
      reply.state('rsvp', ''+rsvp);
      reply({ rsvp: rsvp });
      
    }
  });
  
}
