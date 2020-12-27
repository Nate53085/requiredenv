const tap = require('tap');
const requiredEnv = require('../lib/main');

tap.doesNotThrow('basic single required.env parses without throwing', test => {
  requiredEnv.checkRequired('tests/test_files/single.env');
});

tap.throws(function () {
  requiredEnv.checkRequired('tests/test_files/single_missing.env');
}, new Error('Missing environment variable MISSING'), 'An Error should be thrown with the missing environment variable');

tap.doesNotThrow('single checking that variable exists in requiredenv works', test => {
  process.env.TO_CHECK = "foo";
  requiredEnv.checkRequired('tests/test_files/simple_check_works.env', ['TO_CHECK']);
});
