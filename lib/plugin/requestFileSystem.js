var FileError = require('cordova/plugin/FileError'),
    exec = require('cordova/exec');

/**
 * Request a file system in which to store application data.
 * @param type  local file system type
 * @param size  indicates how much storage space, in bytes, the application expects to need
 * @param successCallback  invoked with a FileSystem object
 * @param errorCallback  invoked if error occurs retrieving file system
 */
var requestFileSystem = function(type, size, successCallback, errorCallback) {
  if (type < 0 || type > 3) {
    if (typeof errorCallback === "function") {
      errorCallback(new FileError(FileError.SYNTAX_ERR));
    }
  } else {
    // if successful, return a FileSystem object
    var success = function(file_system) {
      var result;
      if (file_system) {
        // grab the name from the file system object
        result = {
          name: file_system.name || null   
        };

        // create Entry object from file system root
        result.root = new require('cordova/plugin/DirectoryEntry')(file_system.root);          
        successCallback(result);
      } 
      else {
        // no FileSystem object returned
        errorCallback(new FileError(FileError.NOT_FOUND_ERR));
      }
    };
    exec(success, errorCallback, "File", "requestFileSystem", [type, size]);
  }
};

module.exports = requestFileSystem;