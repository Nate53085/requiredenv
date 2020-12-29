# requiredenv

## motivation

Often, especially in multi-user projects, we forget to document new environment variables. Ultimately this results in other team members not setting this ENV and as a result developers see unexpected failures.

With dotenv for inspiration, allow a user to define what environment variables are expected and force an exception EARLY at runtime rather than wait for whatever unexpected behavior happens by that variable being missing.

## installation

```bash
npm install dotenv
```

## basic usage

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

## integration with dotenv

By passing the output of dotenv to requiredenv you can also make sure that all items that are defined in .env are also defined in require.env. This is useful to enforce that the definition file is kept up to date.

```javascript
let parsed = require('dotenv').config().parsed();
require('requiredenv').checkRequired(parsed);
```

You are also able to take advantage of this behavior without dotenv by defining the variables you are expecting to find.:

```javascript
let expected = {VAR1 : 'UNUSED VALUE', VAR2 : 'UNUSED VALUE', VAR3: 'UNUSED VALUE'}
require('requiredenv').checkRequired(expected);
```

*NOTE: For this check, values are ignored and can be set to any value*