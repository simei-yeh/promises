/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');

var writeGithubFile = function (filePath, info) {
  // TODO
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, info, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }
    );
  });
};

var fetchProfileAndWriteToFile = function (GithubFile, fileToWriteTo) {
  return promiseConstructor.pluckFirstLineFromFileAsync(GithubFile)
    .then(function (currentUser) {
      return promisification.getGitHubProfileAsync(currentUser);
    })
    .then(function (text) {
      let newStr = JSON.stringify(text);
      return writeGithubFile(fileToWriteTo, newStr);
    });
};



// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
