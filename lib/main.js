const fs = require('fs');

const NEWLINES_MATCH = /\n|\r|\r\n/

function checkRequired( { environmentDefinition = 'required.env', checkInRequiredEnv = {} } = {} ) {

  let lines = fs.readFileSync(environmentDefinition, 'utf-8').split(NEWLINES_MATCH);

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
  Object.keys(checkInRequiredEnv).forEach(toCheck => {
    if (!lines.includes(toCheck)) {
      throw new Error(`${toCheck} is not defined in ${environmentDefinition} as expected`);
    }
  })
}

module.exports.checkRequired = checkRequired;