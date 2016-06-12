var assert = require('assert');

describe('geiaus', function() {
    it('successfully signup and signin', function () {
      browser
        .url('/signup')
        .addValue('#username', 'nic')
        .addValue('#password', 'nic')
        .submitForm('#signupForm')
        .waitUntil(function() {
          return browser.getUrl().then(function(url) {
            return url.indexOf('/signup/success')>= 0;
          });
        });
      browser
        .url('/signin')
        .addValue('#username', 'nic')
        .submitForm('#signinForm')
        .addValue('#password', 'wrongpassword')
        .submitForm('#passwordForm')
        // TODO: assert password mismatch error shown
        .addValue('#password', 'nic')
        .submitForm('#passwordForm')
        .waitUntil(function() {
          return browser.getUrl().then(function(url) {
            return url.indexOf('/signin/success')>= 0;
          });
        });
    });
    it('should show error when account is not found', function() {
      browser
        .url('/signin')
        .addValue('#username', 'nonexistaccount')
        .submitForm('#signinForm')
        .waitForText('.error', 'Account not found.');
    });
});
