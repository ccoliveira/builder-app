/*
  TODO - Implementar demais regras de validações
   Input Number: Requerido não funciona, pois diz que date não é uma String e ele não pega o tamanho mínimo e máximo;
   Input Date: Requerido não funciona, pois diz que date não é uma String;
   Input Date and Time: Requerido não funciona, pois diz que date não é uma String;
*/

var moment = require('moment');

export default {

  resolveRules: function (attr, rules) {

    if (!rules) {
      throw new Error("cpuUtils > resolveRules > rules undefined");
    }

    rules[attr.columnName] = [];

    if (attr.required) {
      if (attr.type == "text") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "time") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "cnpj") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "cpf") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "email") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "textArea") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
      } else if (attr.type == "association") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'change'});
      } else if (attr.type == "date") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo'});
      } else if (attr.type == "dateTime") {
        rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo'});
      }
    }

    if (attr.type == "composition") {
      rules[attr.columnName].push(
        {required: true, message: 'Por favor, preencha o campo'},
        {type: 'number', message: 'Por favor, preencha o campo'}
      );
    }

    /*if (attr.type == "numeric") {
      rules[attr.columnName].push({type: 'number', message: 'O campo precisa ser numerico', trigger: 'blur'});
    } else if (attr.type == "date") {
     rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
     }  else if (attr.type == "dateTime") {
     rules[attr.columnName].push({required: true, message: 'Por favor, preencha o campo', trigger: 'blur'});
     }*/

    if (attr.minSize > 0) {
      rules[attr.columnName].push({
        min: attr.minSize,
        message: 'Tamanho minimo ' + attr.minSize,
        trigger: 'blur'
      });
    }
    if (attr.maxSize > 0) {
      rules[attr.columnName].push({
        max: attr.maxSize,
        message: 'Tamanho maximo ' + attr.maxSize,
        trigger: 'blur'
      });
    }
  },

  formatField: function(value, type) {

    if (value === undefined) {
      return "";
    }

    let ret = '';

    if(type == 'boolean') {
      ret = value == 'YES' ? 'Sim' : 'Não';
    } else if(type == 'date') {
      let date = new Date(value + " 00:00:00");
      ret = moment(date).format('DD/MM/YYYY');
    } else if(type == 'dateTime') {
      let date = new Date(value);
      ret = moment(date).format('DD/MM/YYYY HH:mm');
    } else if(type == 'time') {
      if(value) {
        let time = value.split(":");
        ret = time[0] + ":" + time[1];
      } else {
        ret = value;
      }
    } else {
      ret = value;
    }

    return ret;
  },

  getPlaceholder: function(attr) {
    return this.getPlaceholder(attr, null);
  },

  getPlaceholder: function(attr, locale) {

    if (attr != undefined && attr.placeholderPt != undefined && attr.placeholderPt != "") {

      let placeholder = attr.placeholderPt;

      if (locale == 'es' && attr.placeholderEs != undefined && attr.placeholderEs != "") {
        placeholder = attr.placeholderEs;
      } else if (locale == 'en' && attr.placeholderEn != undefined && attr.placeholderEn != "") {
        placeholder = attr.placeholderEn;
      }

      return placeholder;
    }

    return ""
  },

  getLabel: function(params) {

    if (!params) {
      return "";
  }

    let attr = params.attr;
    let locale = params.locale;
    let label = params.label ? params.label : "";

    if (attr != undefined && attr.labelPt != undefined && attr.labelPt != "") {

      label = attr.labelPt;

      if (locale == 'es' && attr.labelEs != undefined && attr.labelEs != "") {
        label = attr.labelEs;
      } else if (locale == 'en' && attr.labelEn != undefined && attr.labelEn != "") {
        label = attr.labelEn;
}

      return label;
    }

    return label;
  },

  getHint: function(params) {

    if (!params) {
      return "";
    }

    let attr = params.attr;
    let locale = params.locale;
    let hint = "";

    if (attr != undefined && attr.hintPt != undefined && attr.hintPt != "") {

      hint = attr.hintPt;

      if (locale == 'es' && attr.hintEs != undefined && attr.hintEs != "") {
        hint = attr.hintEs;
      } else if (locale == 'en' && attr.hintEn != undefined && attr.hintEn != "") {
        hint = attr.hintEn;
      }

      return hint;
    }

    return hint;
  }
}
