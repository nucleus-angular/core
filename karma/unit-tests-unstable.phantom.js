basePath = '..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/lodash/dist/lodash.legacy.js',
  'components/jquery/jquery.js',
  'components/unstable-angular-complete/angular.js',
  'components/unstable-angular-complete/angular-mocks.js',
  'tests/libraries/mocker.js',
  '*.js',
  'tests/*.js',
  {
    pattern: '**/*.html', included: false
  }
];

preprocessors = {
  '**/*.js': 'coverage'
};

reporters = ['dots', 'coverage'];

autoWatch = false;

browsers = ['PhantomJS'];

singleRun = true;
