const fs = require('fs').promises;
const path = require('path');

const get_directory_path=()=>{
    return './cube_file';
  } 
  
async function get_cube_file(){
    const directoryPath = get_directory_path();
    try {
        const directoryPath = get_directory_path();
        const filePath = path.join(directoryPath, 'model.xml');
        const stats = await fs.stat(filePath);  
        let fileSizeInKB = stats.size / (1024 * 1024);  
        fileSizeInKB= Math.round(fileSizeInKB * 100) / 100;
        fileSizeInKB= fileSizeInKB.toString() + " MB";    
        let datetimestring = stats.birthtime.toLocaleDateString() + ' ' + stats.birthtime.toTimeString()
        return {"filepath":filePath,"file_size":fileSizeInKB,"file_created":datetimestring}
      } catch (err) {
        return {"filepath":null,"file_size":null,"file_created":null}
      }
  }

  module.exports = {
    get_cube_file
}