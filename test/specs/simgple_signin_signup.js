var assert = require('assert');

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function () {
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
        .addValue('#password', 'nic')
        .submitForm('#passwordForm')
        .waitUntil(function() {
          return browser.getUrl().then(function(url) {
            return url.indexOf('/signin/success')>= 0;
          });
        });
    });
});
