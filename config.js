// Container for environments
var environments = {};

// Dev environment
environments.dev = {
  'httpPORT': 3000,
  'HOSTNAME': 'localhost',
  'envName': 'development'
};

environments.production = {
  'httpPORT': 5000,
  'HOSTNAME': '0.0.0.0',
  'envName': 'production'
};

var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Export the environment
var environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.dev;

// Export environments module
module.exports = environmentToExport;