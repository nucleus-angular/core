angular.module('nag.core.helpers', [])
.factory('nagHelper', [
  '$templateCache',
  'nagDefaults',
  function($templateCache, nagDefaults) {
    return {
      getAsyncTemplate: function(templateUrl, options) {
        //todo: figure out if there is a way to using $http instead of jQuery $.ajax with async false without having the render of initial load
        /*$http.get(template, {cache: $templateCache}).success(function(html) {
            element.append($compile(html)(scope));
        });*/

        templateUrl = this.resolveTemplatePath(templateUrl, options);
        var html = $templateCache.get(templateUrl);

        if(!html) {
          html = $.ajax({
            type: "GET",
            url: templateUrl,
            async: false
          }).responseText;
          $templateCache.put(templateUrl, html);
        }

        return html;
      },

      generateId: function(prefix) {
        return prefix + ($('[id^=' + prefix + ']').length + 1);
      },

      getTemplateString: function(options, templateUrlProperty, templateNameProperty) {
        templateNameProperty = templateNameProperty || 'template';
        templateUrlProperty = templateUrlProperty || 'templateUrl';

        if(angular.isString(options[templateNameProperty]) && options[templateNameProperty].length > 0) {
          return options[templateNameProperty];
        } else if (angular.isString(options[templateUrlProperty]) && options[templateUrlProperty].length > 0) {
          return this.getAsyncTemplate(options[templateUrlProperty], options);
        } else {
          return '';
        }
      },

      resolveTemplatePath: function(templatePath, options) {
        return (templatePath.indexOf('./') !== 0 && templatePath.indexOf('/') !== 0
        ? (options ? options.rootTemplatePath : nagDefaults.getRootTemplatePath()) + '/' + templatePath
        : templatePath);
      }
    }
  }
]);
