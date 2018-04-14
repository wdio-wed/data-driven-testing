const expect = require('chai').expect;

const inputs = [
  {
    value: 'short',
    expectedError: 'Must be at least 8 characters long.'
  },
  {
    value: 'NOLOWERCASE',
    expectedError: 'Must contain a lowercase letter.'
  },
  {
    value: 'nottooshort',
    expectedError: 'Must contain an uppercase letter.'
  },
  {
    value: 'Nottooshort',
    expectedError: 'Must contain a number or special character.'
  },
  {
    value: 'N0tt00sh0rt'
  },
  {
    value: 'Spec!alchar'
  }
];

describe('Password input validation', function () {
  inputs.forEach(function (input) {
    let testName = input.value;

    if (input.expectedError) {
      testName += ` should show error: ${input.expectedError}`;
    } else {
      testName += ` should pass validation`;
    }

    it(testName, function () {
      browser.url('./');

      browser.frame($('#result').value);

      $('[name="password"]').setValue(input.value);

      const errorMessages = $('.helper-text').getText();
      if (input.expectedError) {
        expect(errorMessages).to.contain(input.expectedError);
      } else {
        expect(errorMessages).to.equal('');
      }
    })
  })
})