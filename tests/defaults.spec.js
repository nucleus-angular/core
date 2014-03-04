describe('Defaults', function(){
  var nagDefaults;

  beforeEach(module('overridingDefaults', 'nag.core', function() {}));

  beforeEach(inject(function($injector) {
    nagDefaults = $injector.get('nagDefaults');
  }));

  it('should have correct default root template path', function() {
    expect(nagDefaults.getRootTemplatePath()).toEqual('/components');
  });

  it('should be able to set options and get options', function() {
    nagDefaults.setOptions('test1', {
      one: 1,
      two: 2,
      three: 3
    });

    var options = {};
    options = nagDefaults.getOptions('test1', options);

    expect(options.one).toBe(1);
    expect(options.two).toBe(2);
    expect(options.three).toBe(3);
  });

  it('should properly override settings when given', function() {
    nagDefaults.setOptions('test1', {
      one: 1,
      two: 2,
      three: 3
    });

    var options = {
      one: 'one'
    };
    options = nagDefaults.getOptions('test1', options);

    expect(options.one).toBe('one');
    expect(options.two).toBe(2);
    expect(options.three).toBe(3);
  });

  it('should not override the stored defaults when retrieving defaults', function() {
    nagDefaults.setOptions('test1', {
      one: 1,
      two: 2,
      three: 3
    });

    nagDefaults.getOptions('test1', {
      one: 'one'
    });
    var options2 = nagDefaults.getOptions('test1', {});

    expect(options2.one).toBe(1);
  });

  it('should be able to define a custom get function for a certain item', function() {
    nagDefaults.setOptions('test1', {
      one: 1,
      two: 2,
      three: 3,
      stuff: []
    });
    nagDefaults.setOptions('test2', {
      four: 4,
      five: 5,
      six: 6
    });
    nagDefaults.setOptionsGetter('test1', function(options) {
      var finalOptions = nagDefaults.getDefaultOptions('test1');
      finalOptions = angular.extend(finalOptions, options);

      if(angular.isArray(finalOptions.stuff) && finalOptions.stuff.length > 0) {
        finalOptions.stuff = nagDefaults.getOptions('test2', finalOptions.stuff);
      }

      return finalOptions;
    });
    nagDefaults.setOptionsGetter('test2', function(options) {
      var stuffOptions = nagDefaults.getDefaultOptions('test2');

      angular.forEach(options, function(value, key) {
        //todo: research: this breaks without the JSON.parse(angular.toJson()), no idea why
        options[key] = angular.extend(JSON.parse(angular.toJson(stuffOptions)), options[key]);
      });

      return options;
    });

    var options = {
      stuff: [{

      }, {

      }, {

      }]
    };
    options = nagDefaults.getOptions('test1', options);

    expect(options.stuff[0].four).toBe(4);
    expect(options.stuff[0].five).toBe(5);
    expect(options.stuff[0].six).toBe(6);
  });

  it('should be able to set global overrides', function() {
    nagDefaults.setOptions('overrideTest', {
      templateUrl: 'default.html'
    });

    var options = {};
    options = nagDefaults.getOptions('overrideTest', options);

    expect(options.templateUrl).toBe('global.html');
  });
});
