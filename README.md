# requiredenv

## Motivation

Often, especially in multi-user projects, we forget to document new environment variables. Ultimately this results in other team members not setting this ENV and and seeing unexpected failures, sometimes far away from where the variable was used.

With dotenv for inspiration, allow a user to define what environment variables are expected and force an exception EARLY at runtime rather than wait for whatever unexpected behavior happens by that variable being missing.

## Installation

```bash
npm install dotenv
```

## Basic Usage

- Create a file in the root of your project called required.env
- List environment variables by name that your care about (one per line) without values

For example:

```dosini
VAR1
VAR2
VAR3
```

Then, early in your program, do the following:

```javascript
require('requiredenv').checkRequired()
```

If an environment variable that is listed in required.env is not defined in process.env, this will throw an exception

## Alternate File for Requirements

If you wish, you can specify a specific file to be parsed rather than the default 'required.env'

```javascript
require('requiredenv').checkRequired({ environmentDefinition : "path/to/file" });
```

## Integration with dotenv

By passing the output of dotenv to requiredenv you can also make sure that all items that are defined in .env are also defined in require.env. This is useful to enforce that the definition file is kept up to date.

```javascript
let parsed = require('dotenv').config().parsed();
require('requiredenv').checkRequired({ checkInRequiredEnv : parsed });
```

You are also able to take advantage of this behavior without dotenv by defining the variables you are expecting to find.:

```javascript
let expected = {VAR1 : 'UNUSED VALUE', VAR2 : 'UNUSED VALUE', VAR3: 'UNUSED VALUE'}
require('requiredenv').checkRequired({ checkInRequiredEnv : expected });
```

*NOTE: For this check, values are ignored and can be set to any value*

## Comments in required.env

If a line starts with a '#' character it is ignored as a comment. This is useful to add documentation to required.env

```dosini
# The port that this service will be hosted on
PORT
# The user the service will run as
USER
# Secret key that should never be checked into source but needs to exist in process.env
SECRET_1
```
