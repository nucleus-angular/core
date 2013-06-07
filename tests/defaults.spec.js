describe('Defaults', function(){
  var nagDefaults;

  beforeEach(module('nag.core'));

  beforeEach(inject(function($injector) {
    nagDefaults = $injector.get('nagDefaults');
  }));

  it('should have correct default root template path', function() {
    expect(nagDefaults.getRootTemplatePath()).toEqual('/components');
  });

  it('should have correct defaults for grid', function() {
    var expected = {
      rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-grid/assets/templates',
      caption: null,
      columnModel: {},
      currentPage: 1,
      data: [],
      displaySettings: false,
      filters: null,
      generateDataUrl: function(){},
      itemsPerPageOptions: [10, 20, 30, 40, 50],
      itemsPerPage: 10,
      maxColumnWidth: 0,
      minColumnWidth: 50,
      remoteDataMethod: 'JSONP',
      reorderable: false,
      rowMultiSelect: true,
      rowSelectable: false,
      rowSelectableCheckbox: true,
      rowSelectionMode: 'row',
      headerTemplateUrl: 'grid/header/header.html',
      headerTemplate: null,
      footerTemplateUrl: 'grid/footer/footer.html',
      footerTemplate: null,
      settingsTemplateUrl: 'grid/settings/settings.html',
      settingsTemplate: null,
      loadingTemplateUrl: 'grid/loading/loading.html',
      loadingTemplate: null,
      dataTemplateUrl: 'grid/data/data.html',
      dataTemplate: null,
      actionsTemplateUrl: 'grid/actions/actions.html',
      actionsTemplate: null,
      rowShiftMultiSelect: false,
      selected: [],
      sort: {},
      sortDirection: 'asc',
      sortMulti: true,
      sortProperty: null,
      totalRecords: 0,
      templateUrl: 'grid/grid.html',
      template: null
    }
    var actual = nagDefaults.getGridOptions({});

    expect(_.isFunction(actual['generateDataUrl'])).toBe(true);

    delete actual['generateDataUrl'];
    delete expected['generateDataUrl'];

    expect(actual).toEqual(expected);
  });

  it('should have correct defaults for grid column', function() {
    var expected = {
      test: {
        rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-grid/assets/templates',
        title: null,
        property: null,
        headerTemplateUrl: 'grid/header-data-cell/header-data-cell.html',
        headerTemplate: null,
        templateUrl: 'grid/data-cell/data-cell.html',
        template: null,
        display: true,
        sortable: false,
        resizable: true,
        filterable: false,
        width: 0,
        minWidth: 0,
        maxWidth: 0,
        cssClass: '',
        cssHeaderClass: ''
      }
    };
    expect(nagDefaults.getGridColumnOptions({'test': {}})).toEqual(expected);
  });

  it('should have correct defaults for grid column with multiple items', function() {
    var expected = {
      test: {
        rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-grid/assets/templates',
        title: null,
        property: null,
        headerTemplateUrl: 'grid/header-data-cell/header-data-cell.html',
        headerTemplate: null,
        templateUrl: 'grid/data-cell/data-cell.html',
        template: null,
        display: true,
        sortable: false,
        resizable: true,
        filterable: false,
        width: 0,
        minWidth: 0,
        maxWidth: 0,
        cssClass: '',
        cssHeaderClass: ''
      },
      test2: {
        rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-grid/assets/templates',
        title: null,
        property: null,
        headerTemplateUrl: 'grid/header-data-cell/header-data-cell.html',
        headerTemplate: null,
        templateUrl: 'grid/data-cell/data-cell.html',
        template: null,
        display: true,
        sortable: false,
        resizable: true,
        filterable: false,
        width: 0,
        minWidth: 0,
        maxWidth: 0,
        cssClass: '',
        cssHeaderClass: ''
      }
    };
    expect(nagDefaults.getGridColumnOptions({test: {}, test2: {}})).toEqual(expected);
  });

  it('should have correct defaults for tree', function() {
    var expected = {
      rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-tree/assets/templates',
      templateUrl: 'tree.html',
      recursionTemplateUrl: 'recursion.html',
      data: []
    }
    expect(nagDefaults.getTreeOptions({})).toEqual(expected);
  });

  it('should have correct defaults for tooltip', function() {
    var expected = {
      rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-tooltip/assets/templates',
      verticalPosition: 'bottom', //top, middle, bottom
      horizontalPosition: 'right', //left, middle, right
      sticky: false
    }
    expect(nagDefaults.getTooltipOptions({})).toEqual(expected);
  });

  it('should have correct defaults for extend text', function() {
    var expected = {
      rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
      hiddenInputName: null,
      visibleInputName: null,
      selectOnFocus: false,
      preventSubmitOnEnter: true,
      data: [],
      ngModel: null,
      autoFocus: false,
      templateUrl: 'extend-text.html',
      template: null,
      tagOptions: {
        rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
        enabled: false,
        allowDuplicates: false,
        selectedTagIndex: null,
        doubleClickEdit: false
      },
      autoCompleteOptions: {
        rootTemplatePath: nagDefaults.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
        enabled: false,
        display: false,
        url: null,
        variable: 'input',
        variableCache: null,
        loadCharacterCount: 3,
        searchDelay: 350,
        cache: false,
        cachedData: [],
        options: [],
        useFilter: null,
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
      }
    }

    var actual = nagDefaults.getExtendTextOptions({});

    expect(_.isFunction(actual['autoCompleteOptions']['generateDataUrl'])).toBe(true);
    expect(_.isFunction(actual['autoCompleteOptions']['dataParser'])).toBe(true);
    expect(_.isFunction(actual['autoCompleteOptions']['formatVariable'])).toBe(true);
    expect(_.isFunction(actual['autoCompleteOptions']['filter'])).toBe(true);

    delete actual['autoCompleteOptions']['generateDataUrl'];
    delete actual['autoCompleteOptions']['dataParser'];
    delete actual['autoCompleteOptions']['formatVariable'];
    delete actual['autoCompleteOptions']['filter'];
    delete expected['autoCompleteOptions']['generateDataUrl'];
    delete expected['autoCompleteOptions']['dataParser'];
    delete expected['autoCompleteOptions']['formatVariable'];
    delete expected['autoCompleteOptions']['filter'];

    expect(actual).toEqual(expected);
  });

  it('should have correct defaults for tabs', function() {
    var expected = {
      defaultTab: 0
    }
    expect(nagDefaults.getTabsOptions({})).toEqual(expected);
  });
});
