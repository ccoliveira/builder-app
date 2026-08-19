export default {

  build: function (field) {

    var type = field.type;

    if (type == 'header') {
      return this.header(field);
    } else if (type == 'text') {
      return this.text(field);
    } else if (type == 'numeric') {
      return this.numeric(field)
    } else if (type == 'date') {
      return this.date(field)
    } else if (type == 'dateTime') {
      return this.dateTime(field)
    } else if (type == 'time') {
      return this.time(field)
    } else if (type == 'textArea') {
      return this.textArea(field)
    } else if (type == 'cnpj') {
      return this.cnpj(field)
    } else if (type == 'cpf') {
      return this.cpf(field)
    } else if (type == 'currency') {
      return this.currency(field)
    } else if (type == 'email') {
      return this.email(field)
    } else if (type == 'boolean') {
      return this.boolean(field)
    } else if (type == 'select') {
      return this.select(field)
    } else if (type == 'composition') {
      return this.composition(field)
    } else if (type == 'association') {
      return this.association(field)
    } else if (type == 'filterText') {
      return this.filterText(field)
    } else if (type == 'filterBoolean') {
      return this.filterBoolean(field)
    } else if (type == 'button') {
      return this.button(field)
    } else if (type == 'errorList') {
      return this.errorList(field)
    } else if (type == 'password') {
      return this.password(field)
    } else if (type == 'phone') {
      return this.phone(field)
    } else if (type == 'collapse') {
      return this.collapse(field)
    } else if (type == 'file') {
      return this.file(field)
    } else if (type == 'image') {
      return this.image(field)
    } else if (type == 'hidden') {
      return this.hidden(field)
    } else if (type == 'dashboard') {
      return this.dashboard(field)
    } else if (type == 'label') {
      return this.label(field)
    } else if (type == 'grid') {
      return this.grid(field)
    } else if (type == 'filterNumeric') {
      return this.filterNumeric(field)
    } else if (type == 'filterDate') {
      return this.filterDate(field)
    } else if (type == 'map') {
      return this.map(field)
    } else if (type == 'charges') {
      return this.charges(field)
    } else if (type == 'dealership') {
      return this.dealership(field)
    } else if (type == 'buttonReport') {
      return this.buttonReport(field)
    } else if (type == 'inputCSV') {
      return this.inputCSV(field)
    } else if (type == 'textEditor') {
      return this.textEditor(field)
    } else if (type == 'float') {
      return this.float(field)
    } else if (type == 'buttonForm') {
      return this.buttonForm(field);
    } else if (type == 'buttonPrint') {
      return this.buttonPrint(field);
    } else if (type == 'buttonPDF') {
      return this.buttonPDF(field);
    } else if (type == 'customComponent') {
      return this.customComponent(field);
    }

    return {};
  },

  commons: function (field) {
    return {
      id: field.id,
      type: field.type,
      name: '',
      showInDetails: true,
      showInForm: true,
      hideOnPrint: false,
      hideOnFilter: false
    }
  },

  columnName: function () {
    return {
      columnName: ''
    }
  },

  dbCommons: function () {
    var obj = Object.assign({}, this.columnName());

    obj = Object.assign(obj, {
      persistent: true
    });

    return obj;
  },

  filterCommons: function () {
    return {
      criterion: ''
    }
  },

  commonsLabel: function () {
    return {
      labelPt: '',
      labelEs: '',
      labelEn: ''
    }
  },

  commonsHint: function () {
    return {
      hintPt: '',
      hintEs: '',
      hintEn: ''
    }
  },

  commonsPlaceholder: function () {
    return {
      placeholderPt: '',
      placeholderEs: '',
      placeholderEn: ''
    }
  },

  buildPrefix: function () {
    return {
      prefix: ''
    }
  },

  buildSufix: function () {
    return {
      sufix: ''
    }
  },

  buildMask: function () {
    return {
      mask: ''
    }
  },

  buildRequired: function () {
    return {
      required: true
    }
  },

  buildMinSize: function () {
    return {
      minSize: 0
    }
  },

  buildMaxSize: function () {
    return {
      maxSize: 0
    }
  },

  buildRegex: function () {
    return {
      regex: ''
    }
  },

  buildMinValue: function () {
    return {
      minValue: 0
    }
  },

  buildMaxValue: function () {
    return {
      maxValue: 0
    }
  },

  buildInputData: function () {
    return {
      formId: '',
      columnValue: '',
      columnLabel: '',
      columnLabelEs: '',
      columnLabelEn: '',
      preFilter: '',
      columnsToShow: [],
      columnsToShowEs: [],
      columnsToShowEn: [],
      uriFilterList: [],
      uriFilterListEs: [],
      uriFilterListEn: [],
      dependsOfSource: '',
      dependsOfTarget: ''
    }
  },
  buildEventOnClick: function () {
    return {
      eventOnClick: ''
    }
  },
  buildForm: function () {
    return {
      formId: ''
    }
  },
  buildEventOnChange: function () {
    return {
      eventOnChange: ''
    }
  },
  buildEventOnBlur: function () {
    return {
      eventOnBlur: ''
    }
  },
  buildEventOnFocus: function () {
    return {
      eventOnFocus: ''
    }
  },
  buildIcon: function () {
    return {
      icon: ''
    }
  },

  basicCommons: function (field) {
    return {
      id: field.id,
      type: field.type,
      name: ''
    }
  },

  buildMargin: function (field) {
    return {
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0
    }
  },

  buildFontSize: function (field) {
    return {
      fontSize: ''
    }
  },

  buildBusinessRule: function () {
    return {
      businessRule: ''
    }
  },

  buildDisableField: function () {
    return {
      disableField: false
    }
  },

  buildAlignButton: function () {
    return {
      alingButton: false
    }
  },

  /////

  header: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildIcon());
    obj = Object.assign(obj, this.buildFontSize());
    obj = Object.assign(obj, this.columnName());

    return obj;
  },

  collapse: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.buildIcon());
    obj = Object.assign(obj, this.columnName());

    obj = Object.assign(obj, {
      open: true,
    });

    return obj;
  },

  text: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildPrefix());
    obj = Object.assign(obj, this.buildSufix());
    obj = Object.assign(obj, this.buildMask()); // TODO - Precisa fazer a máscara
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildMinSize());
    obj = Object.assign(obj, this.buildMaxSize());
    obj = Object.assign(obj, this.buildRegex()); // TODO - Precisa implementar o Regex
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  numeric: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildPrefix());
    obj = Object.assign(obj, this.buildSufix());
    obj = Object.assign(obj, this.buildMinValue());
    obj = Object.assign(obj, this.buildMaxValue());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  date: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildRegex()); // TODO - Precisa implementar o Regex
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  dateTime: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  time: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  textArea: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildMinSize());
    obj = Object.assign(obj, this.buildMaxSize());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  cnpj: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  cpf: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  currency: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildPrefix());
    obj = Object.assign(obj, this.buildMask()); // TODO - Precisa fazer a máscara
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildMinValue());
    obj = Object.assign(obj, this.buildMaxValue());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  email: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildPrefix());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildRegex()); // TODO - Precisa implementar o Regex
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  boolean: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildDisableField());

    obj = Object.assign(obj, {
      inListHideIfNull: false
    });

    return obj;
  },

  select: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    return obj;
  },

  composition: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildInputData());
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildBusinessRule());
    obj = Object.assign(obj, {columnValue: 'id'});
    obj = Object.assign(obj, {criterion: 'equal'});
    obj = Object.assign(obj, this.buildDisableField());
    obj = Object.assign(obj, this.columnName());
    return obj;
  },

  association: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildInputData());
    obj = Object.assign(obj, this.buildEventOnChange());
    obj = Object.assign(obj, this.buildBusinessRule());
    obj = Object.assign(obj, {criterion: 'equal'});
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  button: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildEventOnClick());
    obj = Object.assign(obj, this.columnName());
    obj = Object.assign(obj, this.buildDisableField());
    obj = Object.assign(obj, this.buildAlignButton());
    return obj;
  },

  errorList: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, {'property': ''});
    return obj;
  },

  filterText: function (field) {
    var obj = Object.assign({}, this.text(field));
    obj = Object.assign(obj, this.filterCommons());
    obj.required = false;
    return obj;
  },

  filterBoolean: function (field) {
    var obj = Object.assign({}, this.text(field));
    obj = Object.assign(obj, this.filterCommons());
    obj.required = false;
    obj.criterion = "equal";
    return obj;
  },

  password: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildMinSize());
    obj = Object.assign(obj, this.buildMaxSize());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  phone: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  file: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildDisableField());
    /*obj = Object.assign(obj, {totalFiles: 0}); TODO - Descomentar quando for usar*/
    return obj;
  },

  image: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.buildMargin());

    obj = Object.assign(obj, {
      url: '',
      height: ''
    });

    return obj;
  },

  hidden: function (field) {
    var obj = Object.assign({}, this.basicCommons(field));
    obj = Object.assign(obj, this.dbCommons());
    return obj;
  },

  dashboard: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.buildMargin());

    obj = Object.assign(obj, {
      columnName: '',
      businessRuleId: '',
      timer: 0
    });

    return obj;
  },

  label: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.buildIcon());
    obj = Object.assign(obj, this.buildFontSize());

    obj = Object.assign(obj, {
      columnName: ''
    });

    return obj;
  },

  grid: function (field) {
    var obj = Object.assign({}, this.commons(field));

    obj = Object.assign(obj, {
      columnName: '',
      headers: [],
      actions: [],
      color: '',
      multipleSelect: ''
    });

    return obj;
  },

  filterNumeric: function (field) {
    var obj = Object.assign({}, this.numeric(field));
    obj = Object.assign(obj, this.filterCommons());
    obj.criterion = "equal";
    return obj;
  },

  filterDate: function (field) {
    var obj = Object.assign({}, this.date(field));
    obj = Object.assign(obj, {'dateType': ''});
    obj = Object.assign(obj, {'criterion': ''});
    obj = Object.assign(obj, {'required': false});
    return obj;
  },

  map: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, {'height': ''});
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    return obj;
  },

  charges: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  dealership: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  buttonReport: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildForm());
    obj = Object.assign(obj, this.buildAlignButton());
    obj = Object.assign(obj, this.columnName());
    obj = Object.assign(obj, this.buildDisableField());
    return obj;
  },

  inputCSV: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildDisableField());

    return obj;
  },

  textEditor: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildRequired());
    return obj;
  },

  float: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.dbCommons());
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.commonsPlaceholder());
    obj = Object.assign(obj, this.buildPrefix());
    obj = Object.assign(obj, this.buildRequired());
    obj = Object.assign(obj, this.buildEventOnBlur());
    obj = Object.assign(obj, this.buildEventOnFocus());
    obj = Object.assign(obj, this.buildDisableField());

    obj = Object.assign(obj, {
      totalDigits: '',
      decimalDigits: '',
      decimalSeparator: '',
      thousandsSeparator: ''
    });

    return obj;
  },

  buttonForm: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildAlignButton());
    obj = Object.assign(obj, this.columnName());
    obj = Object.assign(obj, this.buildDisableField());

    obj = Object.assign(obj, {
      formId: ''
    });

    return obj;
  },

  buttonPrint: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildAlignButton());
    obj = Object.assign(obj, this.columnName());
    obj = Object.assign(obj, this.buildDisableField());

    return obj;
  },

  buttonPDF: function (field) {
    var obj = Object.assign({}, this.commons(field));
    obj = Object.assign(obj, this.commonsLabel());
    obj = Object.assign(obj, this.commonsHint());
    obj = Object.assign(obj, this.buildBusinessRule());
    obj = Object.assign(obj, this.buildAlignButton());
    obj = Object.assign(obj, this.columnName());
    obj = Object.assign(obj, this.buildDisableField());

    return obj;
  },

  customComponent: function (field) {
    var obj = Object.assign({}, this.commons(field));

    obj = Object.assign(obj, {
      columnName: '',
      script: '',
      template: ''
    });

    return obj;
  }
}
