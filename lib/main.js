const fs = require('fs');

function checkRequired(environmentDefinitionFile = 'required.env', optionalReverseCheckVars = []) {

  let lines = fs.readFileSync(environmentDefinitionFile, 'utf-8').split('\r\n').split('\n');

  lines.forEach(line => {
    // Ignore empty lines and lines that start with comments
    if (line && !line.startsWith('#')) {
      // Verify the env variable exists
      if (!process.env[line]) {
        throw new Error(`Missing environment variable ${line}`);
      }
    }
  });

  // Verify that each optionalReverseCheckVars was found
  optionalReverseCheckVars.forEach(toCheck => {
    if (!lines.includes(toCheck)) {
      throw new Error(`${toCheck} is not defined in ${environmentDefinitionFile} as expected`);
    }
  })
}

module.exports.checkRequired = checkRequired;