describe('Helper', function(){
  var nagHelper, nagDefaults;

  beforeEach(module('nag.core'));

  beforeEach(inject(function($injector) {
    nagHelper = $injector.get('nagHelper');
    nagDefaults = $injector.get('nagDefaults');

    //pre load needed templates as right now $httpBackend does not have the passThrough() method (might be a bug)
    nagHelper.getAsyncTemplate('/base/tests/files/custom.html');
    nagHelper.getAsyncTemplate('/base/tests/files/test.html');
  }));

  it('should resolve template path starting with / as itself', function() {
    expect(nagHelper.resolveTemplatePath('/test', {
      rootTemplatePath: '/whatever'
    })).toEqual('/test');
  });

  it('should resolve template path starting with ./ as itself', function() {
    expect(nagHelper.resolveTemplatePath('./test', {
      rootTemplatePath: '/whatever'
    })).toEqual('./test');
  });

  it('should resolve template path by adding rootTemplatePath to the beginning', function() {
    expect(nagHelper.resolveTemplatePath('test', {
      rootTemplatePath: '/whatever'
    })).toEqual('/whatever/test');
  });

  it('should return empty string from get template string when nothing passed', function() {
    expect(nagHelper.getTemplateString({})).toEqual('');
  });

  it('should get template string from template property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>'
    })).toEqual('<div>test</div>');
  });

  it('should get template string from custom template property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>',
      customTemplate: '<div>custom</div>'
    }, null, 'customTemplate')).toEqual('<div>custom</div>');
  });

  it('should get template string from custom template property regardless of template url property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>',
      customTemplate: '<div>custom</div>',
      templateUrl: '/base/tests/files/test/html'
    }, null, 'customTemplate')).toEqual('<div>custom</div>');
  });

  it('should get template string from template property', function() {
    expect(nagHelper.getTemplateString({
      templateUrl: '/base/tests/files/test.html'
    })).toEqual('<div>test-url</div>');
  });

  it('should get template string from custom template property', function() {
    expect(nagHelper.getTemplateString({
      templateUrl: '/base/tests/files/test.html',
      customTemplateUrl: '/base/tests/files/custom.html',
    }, 'customTemplateUrl', null)).toEqual('<div>custom-url</div>');
  });

  it('should get the template path', function() {
    nagDefaults.setOptions('componentName', {
      templateUrl: '/some/path/to/component.html',
      testTemplateUrl: '/some/path/to/test-component.html'
    });
    nagDefaults.setOptions('componentNameRelative', {
      templateUrl: 'some/path/to/component-relative.html',
      testTemplateUrl: 'some/path/to/test-component-relative.html'
    });
    nagDefaults.setOptions('componentNameWithRoot', {
      rootTemplatePath: '/some/path/to/root',
      templateUrl: '/some/path/to/component-root.html',
      testTemplateUrl: '/some/path/to/test-component-root.html'
    });
    nagDefaults.setOptions('componentNameWithRootRelative', {
      rootTemplatePath: '/some/path/to/root',
      templateUrl: 'some/path/to/component-root-relative.html',
      testTemplateUrl: 'some/path/to/test-component-root-relative.html'
    });
    expect(nagHelper.getTemplatePath('componentName')).toEqual('/some/path/to/component.html');
    
    expect(nagHelper.getTemplatePath('componentNameRelative')).toEqual('/components/some/path/to/component-relative.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRoot')).toEqual('/some/path/to/component-root.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRootRelative')).toEqual('/some/path/to/root/some/path/to/component-root-relative.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: '/some/path/to/template.html'
    })).toEqual('/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: '/some/path/to/template.html'
    })).toEqual('/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: 'some/path/to/template.html'
    })).toEqual('/components/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: 'some/path/to/template.html'
    })).toEqual('/some/path/to/root/some/path/to/template.html');

    expect(nagHelper.getTemplatePath('componentName', 'test')).toEqual('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath('componentNameRelative', 'test')).toEqual('/components/some/path/to/test-component-relative.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRoot', 'test')).toEqual('/some/path/to/test-component-root.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRootRelative', 'test')).toEqual('/some/path/to/root/some/path/to/test-component-root-relative.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: '/some/path/to/template.html',
      testTemplateUrl: '/some/path/to/test-component.html'
    }, 'test')).toEqual('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: '/some/path/to/template.html',
      testTemplateUrl: '/some/path/to/test-component.html'
    }, 'test')).toEqual('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: 'some/path/to/template.html',
      testTemplateUrl: 'some/path/to/test-component.html'
    }, 'test')).toEqual('/components/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: 'some/path/to/template.html',
      testTemplateUrl: 'some/path/to/test-component.html'
    }, 'test')).toEqual('/some/path/to/root/some/path/to/test-component.html');
  });
});
