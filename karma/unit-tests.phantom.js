module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '..',
    frameworks: ['jasmine'],
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
      '*.js',
      'tests/*.js',
      {
        pattern: 'tests/files/*.html', served: true, watched: false, included: false
      }
    ]
  });
};
