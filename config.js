// Container for environments
var environments = {};

// Dev environment
environments.dev = {
  'httpPORT': 3000,
  'HOSTNAME': 'localhost',
  'yaml_dir': 'D:\\api\\react_flow_api\\yaml_files\\',
  'backup_path':'D:\\api\\react_flow_api\\backup\\',
  'envName': 'development'  
};

environments.production = {
  'httpPORT': 3000,
  'HOSTNAME': '0.0.0.0',
  'yaml_dir': '/app/nodejs/cgeditdemo/model/cubes/',
  'backup_path':'/app/nodejs/cube_api/backup/',
  'envName': 'production'
};

var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Export the environment
var environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.dev;

// Export environments module
module.exports = environmentToExport;