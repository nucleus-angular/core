describe('Helper', function(){
  var nagHelper;

  beforeEach(module('nag.core'));

  beforeEach(inject(function($injector) {
    nagHelper = $injector.get('nagHelper');

    //pre load needed templates as right now $httpBackend does not have the passThrough() method (might be a bug)
    nagHelper.getAsyncTemplate('/base/tree.html');
    nagHelper.getAsyncTemplate('/base/recursion.html');
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
});
