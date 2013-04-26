basePath = '..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/underscore/underscore.js',
  'components/jquery/jquery.js',
  'components/unstable-angular-complete/angular.js',
  'components/unstable-angular-complete/angular-mocks.js',
  'tests/libraries/mocker.js',
  '*.js',
  {
    pattern: '**/*.html', included: false
  }
];

autoWatch = false;

browsers = ['Chrome'/*, 'Firefox', 'Safari', 'Opera'*/];

singleRun = true;
