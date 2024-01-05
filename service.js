var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "servicepos",
  description: "Servicio de comunicacion a central",
  script: "C:\\System\\serverPos\\server.js",
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();