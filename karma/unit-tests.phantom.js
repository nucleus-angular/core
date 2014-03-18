module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '..',
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: ['PhantomJS'],
    singleRun: true,
    preprocessors: {},
    files: [
      'components/lodash/dist/lodash.js',
      'components/jquery/dist/jquery.js',
      'components/angular/angular.js',
      'components/angular-mocks/angular-mocks.js',
      'tests/libraries/global-defaults.js',
      'tests/libraries/mocker.js',
      'module.js',
      'values.js',
      'helper-factory.js',
      'defaults-factory.js',
      'tests/*.js',
      {
        pattern: 'tests/files/*.html', served: true, watched: false, included: false
      }
    ]
  });
};
