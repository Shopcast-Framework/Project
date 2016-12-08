const core = require("./core");
const gui = require("./interface");

// Init the app
core.init();
gui.init();

// Launch the main loop of the core and the interface
core.run();
gui.run();