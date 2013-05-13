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

reporters = ['dots'];

autoWatch = false;

browsers = ['Chrome', 'Firefox', 'IE', 'Opera'];

singleRun = true;
