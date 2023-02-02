var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'servicepos',
  description: 'The nodejs.org example web server.',
  script: 'C:\\Users\\eder\\Documents\\superq\\servicePOS\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();