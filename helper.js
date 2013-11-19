/**
 * # Nucleus Angular Helper
 *
 * Provide general helper functionality that is used in several Nucleus Angular components.
 *
 * @module nag.core
 * @ngservice nagHelper
 */
angular.module('nag.core.helpers', [])
.factory('nagHelper', [
  '$templateCache',
  'nagDefaults',
  function($templateCache, nagDefaults) {
    var idGeneratorNumber = 0;
    return {
      /**
       * Retrieves a template
       *
       * @todo: add example
       *
       * NOTE: Right now this is using jQuery in an sync manor because of issues with the template not being ready when the data is (like in the grid component)
       * so we need to take a look at this to see if it is something that can be changes
       *
       * @method getAsyncTemplate
       *
       * @param {string} templateUrl Remote path to the template file
       * @param {object} options Options object
       *
       * @returns {string} Template HTML
       */
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

      /**
       * Generates a unique id
       *
       * @todo: add example
       *
       * @method generateId
       *
       * @param {string} [prefix=''] String to prefix the id
       *
       * @returns {string} Unique id
       */
      generateId: function(prefix) {
        prefix = prefix || '';
        idGeneratorNumber += 1;
        return prefix + idGeneratorNumber;
      },

      /**
       * Retrieves a template string using either the template or templateUrl property of a component's options object
       *
       * @todo: add example
       *
       * @method
       *
       * @param {objects} options Options object
       * @param {string} [templateUrlProperty='template'] Property name in which the template HTML would live
       * @param {string} [templateNameProperty='templateUrl'] Property name in which the template file url would live
       *
       * @returns {*} Template HTML
       */
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

      /**
       * Resolves the template path
       *
       * @method resolveTemplatePath
       *
       * @param {string} templatePath Template file url
       * @param {object} options Options object
       *
       * @returns {string} Resolved template file url
       */
      resolveTemplatePath: function(templatePath, options) {
        var rootPath = (options ? options.rootTemplatePath : nagDefaults.getRootTemplatePath());

        if(rootPath !== '') {
            rootPath += '/';
        }

        return (templatePath.indexOf('./') !== 0 && templatePath.indexOf('/') !== 0
        ? rootPath + templatePath
        : templatePath);
      },

      /**
       * A default function that can be used to pull template urls from attributes, used as the templateUrl function for directives
       *
       * @method templateUrl
       *
       * @param {object} element DOM element
       * @param {object} attributes Element's attributes
       */
      templateUrl: function(element, attributes) {
        if(!attributes.template) {
          throw new Error("This directive must have a template defined with the data-template attribute");
        }
        return attributes.template;
      }
    }
  }
]);
