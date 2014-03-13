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
    })).to.equal('/test');
  });

  it('should resolve template path starting with ./ as itself', function() {
    expect(nagHelper.resolveTemplatePath('./test', {
      rootTemplatePath: '/whatever'
    })).to.equal('./test');
  });

  it('should resolve template path by adding rootTemplatePath to the beginning', function() {
    expect(nagHelper.resolveTemplatePath('test', {
      rootTemplatePath: '/whatever'
    })).to.equal('/whatever/test');
  });

  it('should return empty string from get template string when nothing passed', function() {
    expect(nagHelper.getTemplateString({})).to.equal('');
  });

  it('should get template string from template property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>'
    })).to.equal('<div>test</div>');
  });

  it('should get template string from custom template property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>',
      customTemplate: '<div>custom</div>'
    }, null, 'customTemplate')).to.equal('<div>custom</div>');
  });

  it('should get template string from custom template property regardless of template url property', function() {
    expect(nagHelper.getTemplateString({
      template: '<div>test</div>',
      customTemplate: '<div>custom</div>',
      templateUrl: '/base/tests/files/test/html'
    }, null, 'customTemplate')).to.equal('<div>custom</div>');
  });

  it('should get template string from template property', function() {
    expect(nagHelper.getTemplateString({
      templateUrl: '/base/tests/files/test.html'
    })).to.equal('<div>test-url</div>');
  });

  it('should get template string from custom template property', function() {
    expect(nagHelper.getTemplateString({
      templateUrl: '/base/tests/files/test.html',
      customTemplateUrl: '/base/tests/files/custom.html',
    }, 'customTemplateUrl', null)).to.equal('<div>custom-url</div>');
  });

  //todo: break up into independent tests
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
    expect(nagHelper.getTemplatePath('componentName')).to.equal('/some/path/to/component.html');
    
    expect(nagHelper.getTemplatePath('componentNameRelative')).to.equal('/components/some/path/to/component-relative.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRoot')).to.equal('/some/path/to/component-root.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRootRelative')).to.equal('/some/path/to/root/some/path/to/component-root-relative.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: '/some/path/to/template.html'
    })).to.equal('/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: '/some/path/to/template.html'
    })).to.equal('/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: 'some/path/to/template.html'
    })).to.equal('/components/some/path/to/template.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: 'some/path/to/template.html'
    })).to.equal('/some/path/to/root/some/path/to/template.html');

    expect(nagHelper.getTemplatePath('componentName', 'test')).to.equal('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath('componentNameRelative', 'test')).to.equal('/components/some/path/to/test-component-relative.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRoot', 'test')).to.equal('/some/path/to/test-component-root.html');
    
    expect(nagHelper.getTemplatePath('componentNameWithRootRelative', 'test')).to.equal('/some/path/to/root/some/path/to/test-component-root-relative.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: '/some/path/to/template.html',
      testTemplateUrl: '/some/path/to/test-component.html'
    }, 'test')).to.equal('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: '/some/path/to/template.html',
      testTemplateUrl: '/some/path/to/test-component.html'
    }, 'test')).to.equal('/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      templateUrl: 'some/path/to/template.html',
      testTemplateUrl: 'some/path/to/test-component.html'
    }, 'test')).to.equal('/components/some/path/to/test-component.html');
    
    expect(nagHelper.getTemplatePath({
      rootTemplatePath: '/some/path/to/root',
      templateUrl: 'some/path/to/template.html',
      testTemplateUrl: 'some/path/to/test-component.html'
    }, 'test')).to.equal('/some/path/to/root/some/path/to/test-component.html');
  });
});
