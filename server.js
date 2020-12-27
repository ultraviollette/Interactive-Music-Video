let express = require('express');
let app = express();

// Set up the server
let server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Application is running at http://localhost:' + port);
}

app.use(express.static('public'));