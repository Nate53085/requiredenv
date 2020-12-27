const fs = require('fs');

function checkRequired(environmentDefinitionFile = 'required.env', optionalReverseCheckVars = []) {

  // TODO: Split on OS indepedent endline
  let lines = fs.readFileSync(environmentDefinitionFile, 'utf-8').split('\n');

  lines.forEach(line => {
    // Ignore empty lines
    if (line) {
      // Verify the line is well formed
      // TODO

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