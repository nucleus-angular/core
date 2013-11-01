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

    //figure out the default root template path
    var rootTemplatePath = $injector.has('nag.rootTemplatePath') ? $injector.get('nag.rootTemplatePath') : 'components';

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
      getOptions: getOptions,
      getRootTemplatePath: function() {
        return rootTemplatePath;
      }
    };
  }
]);
