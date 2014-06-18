var request = require('superagent');

request.get('/api/ping', function(res){
  document.getElementById('timestamp').innerHTML = JSON.stringify(res.body);
});
