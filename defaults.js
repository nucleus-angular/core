angular.module('nag.core.defaults', [])
.factory('nagDefaults', [
  '$injector',
  function($injector) {
    var rootTemplatePath;

    //figure out the default root template path
    try {
      rootTemplatePath = $injector.get('nag.rootTemplatePath');
    }
    catch(exception) {
      rootTemplatePath = '/components';
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
        remoteDataMethod: 'JSONP',
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
      tooltip: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-tooltip/assets/templates',
        verticalPosition: 'bottom', //top, middle, bottom
        horizontalPosition: 'right', //left, middle, right
        sticky: false
      },
      extendText: {
        rootTemplatePath: rootTemplatePath + '/nucleus-angular-extend-text/assets/templates',
        hiddenInputName: null,
        visibleInputName: null,
        selectOnFocus: false, //whether or not to select the existing text in the input when focusing
        preventSubmitOnEnter: true,
        data: [],
        ngModel: null,
        autoFocus: false,
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
        useFilter: null, //todo
        selectedOptionIndex: 0,
        generateDataUrl: function() {
          var url = this.options.autoCompleteOptions.url;
          var variableValue = this.getTextAreaValue();
          this.options.autoCompleteOptions.variableCache = this.getTextAreaValue();
          url += (url.indexOf('?') === -1 ? '?' : '&');
          url += this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

          return url + '&callback=JSON_CALLBACK';
        },
        remoteDataMethod: 'JSONP',
        loadingData: false,

        //callbacks
        dataParser: function(data) {
          var parsedData, x;
          parsedData = [];

          for(x = 0; x < data.length; x += 1) {
            parsedData.push({
              display: data[x].username,
              value: data[x].id
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
      getRootTemplatePath: function() {
        return rootTemplatePath;
      },

      getGridOptions: function(options) {
        var gripOptions = _.clone(defaults.grid);
        var newOptions = angular.extend(gripOptions, options);

        if(angular.isArray(options.columnModel) && options.columnModel.length > 0) {
            options.columnModel = this.getGridColumnOptions(options.columnModel);
        }

        return newOptions;
      },

      getGridColumnOptions: function(columnModel) {
        var gridColumnOptions = _.clone(defaults.gridColumnModel);

        angular.forEach(columnModel, function(value, key) {
          //todo: research: this breaks without the JSON.parse(angular.toJson()), no idea why
          columnModel[key] = angular.extend(JSON.parse(angular.toJson(gridColumnOptions)), columnModel[key]);
        });

        return columnModel;
      },

      getTreeOptions: function(options) {
        var treeOptions = _.clone(defaults.tree);
        angular.extend(treeOptions, options);
        return treeOptions;
      },

      getTooltipOptions: function(options) {
        var tooltipOptions = _.clone(defaults.tooltip);
        angular.extend(tooltipOptions, options);
        return tooltipOptions;
      },

      getExtendTextOptions: function(options) {
        var extendTextDefaults = _.clone(defaults.extendText);
        var extendTextTagDefaults = _.clone(defaults.extendTextTagOptions);
        var extendTextAutoCompleteDefaults = _.clone(defaults.extendTextAutoCompleteOptions);

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

      getTabsOptions: function(options) {
        var finalOptions = _.clone(defaults.tabs);
        angular.extend(finalOptions, options);
        return finalOptions;
      },

      getRevealingPanelOptions: function(options) {
        var finalOptions = _.clone(defaults.revealingPanel);
        angular.extend(finalOptions, options);
        return finalOptions;
      },

      getExpanderOptions: function(options) {
        var finalOptions = _.clone(defaults.expander);
        angular.extend(finalOptions, options);
        return finalOptions;
      }
    }
  }
]);
