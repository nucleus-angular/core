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
angular.module('nag.core.defaults', [])
.provider('nagDefaults', [
  '$injector',
  function($injector) {
    var optionGetters = {};
    var getDefaultOptions = function(optionItem) {
      return _.clone(defaults[optionItem], true);
    };
    var getOptions = function(optionItem, options) {
      if(_.isFunction(optionGetters[optionItem])) {
        return optionGetters[optionItem](options);
      } else {
        var finalOptions = getDefaultOptions(optionItem);
        angular.extend(finalOptions, options);
        return finalOptions;
      }
    };

    var rootTemplatePath;

    //todo: document
    //figure out the default root template path
    try {
      rootTemplatePath = $injector.get('nag.rootTemplatePath');
    }
    catch(exception) {
      rootTemplatePath = 'components';
    }

    var defaults = {
      grid: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-grid/assets/templates',
        caption: null,
        columnModel: {},
        currentPage: 1,
        data: [],
        displaySettings: false,
        filters: null, //todo: implement
        generateDataUrl: function(){},
        itemsPerPageOptions: [10, 20, 30, 40, 50],
        itemsPerPage: 10,
        maxColumnWidth: 0,
        minColumnWidth: 50,
        remoteDataMethod: 'GET',
        reorderable: false,//todo: implement
        rowMultiSelect: true,
        rowSelectable: false,
        rowSelectableCheckbox: true,
        rowSelectionMode: 'row',
        headerTemplateUrl: 'header.html',
        headerTemplate: null,
        footerTemplateUrl: 'footer.html',
        footerTemplate: null,
        settingsTemplateUrl: 'settings.html',
        settingsTemplate: null,
        loadingTemplateUrl: 'loading.html',
        loadingTemplate: null,
        dataTemplateUrl: 'data.html',
        dataTemplate: null,
        actionsTemplateUrl: 'actions.html',
        actionsTemplate: null,
        rowShiftMultiSelect: false,
        selected: [],
        sort: {},
        sortDirection: 'asc',
        sortMulti: true,
        sortProperty: null,
        totalRecords: 0,
        templateUrl: 'grid.html',
        template: null
      },
      gridColumnModel: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-grid/assets/templates',
        title: null,
        property: null,
        headerTemplateUrl: 'header-data-cell.html',
        headerTemplate: null,
        templateUrl: 'data-cell.html',
        template: null,
        display: true,
        sortable: false,
        resizable: true,
        filterable: false, //todo - implement
        width: 0,
        minWidth: 0,
        maxWidth: 0,
        cssClass: '',
        cssHeaderClass: ''
      },
      tree: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-tree/assets/templates',
        templateUrl: 'tree.html',
        recursionTemplateUrl: 'recursion.html',
        data: []
      },
      extendText: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-extend-text/assets/templates',
        selectOnFocus: false, //whether or not to select the existing text in the input when focusing
        preventSubmitOnEnter: true,
        data: [],
        templateUrl: 'extend-text.html',
        template: null
      },
      extendTextTagOptions: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-extend-text/assets/templates',
        enabled: false,
        allowDuplicates: false,
        selectedTagIndex: null,
        doubleClickEdit: false
      },
      extendTextAutoCompleteOptions: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-extend-text/assets/templates',
        enabled: false,
        display: false,
        url: null,
        variable: 'input',
        variableCache: null, //store the last value that was used to retrieve data in order to prevent querying data when a non-changing key is pressed
        loadCharacterCount: 3, //the number of character that must be entered before data is retrieve from a remote source
        searchDelay: 350, //the number of milliseconds to delay retrieving remote data from the last key press
        cache: false, //todo whether or not to cache the data from the remote server, useful for smaller datasets
        cachedData: [], //todo
        options: [],
        selectedOptionIndex: 0,
        selectOnBlur: false,
        allowFreeForm: false,
        newText: 'New', //todo
        isNew: false,
        generateDataUrl: function() {
          var url = this.options.autoCompleteOptions.url;
          var variableValue = this.getTextAreaValue();
          this.options.autoCompleteOptions.variableCache = this.getTextAreaValue();
          url += (url.indexOf('?') === -1 ? '?' : '&');
          url += this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

          if(this.options.autoCompleteOptions.remoteDataMethod === 'JSONP') {
            url += '&callback=JSON_CALLBACK';
          }

          return url;
        },
        remoteDataMethod: 'GET',
        loadingData: false,

        //callbacks
        responseParser: function(response) {
          var parsedData, x;
          parsedData = [];

          for(x = 0; x < response.length; x += 1) {
            parsedData.push({
              display: response[x].display,
              value: response[x].value
            });
          }

          return parsedData;
        },
        formatVariable: function(variable) {
          return variable;
        },
        filter: function(){} //todo
      },
      tabs: {
        defaultTab: 0
      },
      revealingPanel: {
        rootTemplatePath: '',
        contentTemplateUrl: null,
        position: 'right',
        escapeClose: true,
        hasOverlay: true,
        overlayClickClose: false
      },
      expander: {
        style: null
      },
      inputElement: {
        isPlain: true
      },
      contentPlayer: {
        items: [],
        allowSelection: true,
        allowSeeking: true,
        latestItemCompleted: -1,
        contentStatusProperty: false
      }
    };

    //apply override defaults
    try {
      var defaultOverrides, overrideKeys, x;
      defaultOverrides = $injector.get('nag.defaults');
      overrideKeys = Object.keys(defaultOverrides);

      for(x = 0; x < overrideKeys.length; x += 1) {
        defaults[overrideKeys[x]] = angular.extend(defaults[overrideKeys[x]], defaultOverrides[overrideKeys[x]]);
      }
    }
    catch(exception) {}





    return {
      $get: function() {
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

          /**
           * Builds grid options
           *
           * @todo: add example
           *
           * @method getGridOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getGridOptions: function(options) {
            var gripOptions = _.clone(defaults.grid, true);
            var newOptions = angular.extend(gripOptions, options);

            if(angular.isArray(options.columnModel) && options.columnModel.length > 0) {
              options.columnModel = this.getGridColumnOptions(options.columnModel);
            }

            return newOptions;
          },

          /**
           * Builds grid column options
           *
           * @todo: add example
           *
           * @method getGridColumnOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getGridColumnOptions: function(columnModel) {
            var gridColumnOptions = _.clone(defaults.gridColumnModel, true);

            angular.forEach(columnModel, function(value, key) {
              //todo: research: this breaks without the JSON.parse(angular.toJson()), no idea why
              columnModel[key] = angular.extend(JSON.parse(angular.toJson(gridColumnOptions)), columnModel[key]);
            });

            return columnModel;
          },

          /**
           * Builds tree options
           *
           * @todo: add example
           *
           * @method getTreeOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getTreeOptions: function(options) {
            var treeOptions = _.clone(defaults.tree, true);
            angular.extend(treeOptions, options);
            return treeOptions;
          },

          /**
           * Builds extend text options
           *
           * @todo: add example
           *
           * @method getExtendTextOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getExtendTextOptions: function(options) {
            var extendTextDefaults = _.clone(defaults.extendText, true);
            var extendTextTagDefaults = _.clone(defaults.extendTextTagOptions, true);
            var extendTextAutoCompleteDefaults = _.clone(defaults.extendTextAutoCompleteOptions, true);

            var results = angular.extend(extendTextDefaults, options);

            if(results.tagOptions) {
              results.tagOptions = angular.extend(extendTextTagDefaults, results.tagOptions);
            } else {
              results.tagOptions = defaults.extendTextTagOptions
            }

            if(results.autoCompleteOptions) {
              results.autoCompleteOptions = angular.extend(extendTextAutoCompleteDefaults, results.autoCompleteOptions);
            } else {
              results.autoCompleteOptions = defaults.extendTextAutoCompleteOptions
            }

            return results;
          },

          /**
           * Builds tabs options
           *
           * @todo: add example
           *
           * @method getTabsOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getTabsOptions: function(options) {
            var finalOptions = _.clone(defaults.tabs, true);
            angular.extend(finalOptions, options);
            return finalOptions;
          },

          /**
           * Builds revealing panel options
           *
           * @todo: add example
           *
           * @method getRevealingPanelOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getRevealingPanelOptions: function(options) {
            var finalOptions = _.clone(defaults.revealingPanel, true);
            angular.extend(finalOptions, options);
            return finalOptions;
          },

          /**
           * Builds expander options
           *
           * @todo: add example
           *
           * @method getExpanderOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getExpanderOptions: function(options) {
            var finalOptions = _.clone(defaults.expander, true);
            angular.extend(finalOptions, options);
            return finalOptions;
          },

          /**
           * Builds input element options
           *
           * @todo: add example
           *
           * @method getInputElementOptions
           *
           * @param {object} options Overrides for the default options
           *
           * @returns {object} The default options merged with the passed options
           */
          getInputElementOptions: function(options) {
            var finalOptions = _.clone(defaults.inputElement, true);
            angular.extend(finalOptions, options);
            return finalOptions;
          },

          getOptions: getOptions
        }
      },
      /**
       * # Nag Defaults Provider Component
       *
       * The provider allows you to configure default options
       *
       * @ngservice nagDefaultsProvider
       */
      setOptions: function(optionItem, defaultOptions) {
        defaults[optionItem] = defaultOptions;
      },
      setOptionsGetter: function(optionItem, getter) {
        optionGetters[optionItem] = getter;
      },
      getDefaultOptions: getDefaultOptions,
      getOptions: getOptions
    };
  }
]);
