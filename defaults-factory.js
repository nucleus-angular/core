/**
 * # Nucleus Angular Defaults
 *
 * This service is responsible for make sure that other Nucleus Angular components will be supplemented with default configuration values when not explicitly provided.
 *
 * @todo: move all default setup (setting the defaults and custom getter functions) to the compoments themselves
 *
 * @module nag.core
 * @ngservice nagDefaults
 */
var x = 0;
angular.module('nag.core')
.factory('nagDefaults', [
  '$injector',
  function($injector) {
    var optionGetters = {};
    var getDefaultOptions = function(optionItem) {
      return defaults[optionItem] ? _.clone(defaults[optionItem], true) : {};
    };
    var getOptions = function(optionItem, options) {
      if(_.isFunction(optionGetters[optionItem])) {
        return optionGetters[optionItem](options);
      } else {
        var finalOptions = getDefaultOptions(optionItem);

        if(options && options.$attr) {
          temp = {};

          _.forEach(finalOptions, function(value, key) {
            if(options[key] === 'true' || options[key] === 'false') {
              temp[key] = options[key] === 'true' ? true : false;
            } else if(!isNaN(parseFloat(options[key]))) {
              temp[key] = parseFloat(options[key]);
            } else if(options[key] !== undefined) {
              temp[key] = options[key];
            }
          });

          options = temp;
        }

        angular.extend(finalOptions, options);
        return finalOptions;
      }
    };

    //figure out the default root template path
    var rootTemplatePath = $injector.has('nag.rootTemplatePath') ? $injector.get('nag.rootTemplatePath') : '/components';
    var defaults = {};
    var defaultOverrides = {};

    //see if we have overrides to load up
    if($injector.has('nagOverridingDefaults')) {
      defaultOverrides = $injector.get('nagOverridingDefaults');
    }

    return {
      /**
       * Retrieves the configured root template path
       *
       * @todo: add example
       *
       * @method getRootTemplatePath
       *
       * @returns {string} Root template path
       */
      getRootTemplatePath: function() {
        return rootTemplatePath;
      },
      getOptions: getOptions,
      setOptions: function(optionItem, defaultOptions) {
        var optionDefaultOverrides = defaultOverrides[optionItem] || {};
        defaults[optionItem] = _.extend(defaultOptions, optionDefaultOverrides);
      },
      setOptionsGetter: function(optionItem, getter) {
        optionGetters[optionItem] = getter;
      },
      getDefaultOptions: getDefaultOptions,
      getRootTemplatePath: function() {
        return rootTemplatePath;
      }
    };
  }
]);
