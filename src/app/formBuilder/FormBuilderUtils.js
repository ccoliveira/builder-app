import fieldJsonBuilder from './FieldJsonBuilder'

import repositoryService from '../../services/RepositoryService';
import appConfig from '../../services/AppConfigService';

const PATH = appConfig.apiUrl() + '/api/form';

export default {

  generateDefaultFieldDesc: function (fieldDesc) {

    let objectReference = {
      rows: [],
      fields: [],
      filter: {
        brId: '',
        filterDesign: {
          rows: [],
          fields: []
        },
        resultDesign: [],
        resultActions: []
      }
    };

    let objectToReturn = Object.assign({}, objectReference);

    if (fieldDesc.rows) {
      objectToReturn.rows = Object.assign(objectReference.rows, fieldDesc.rows);
    }

    if (fieldDesc.fields) {
      objectToReturn.fields = Object.assign(objectReference.fields, fieldDesc.fields);
    }

    // Alguns formulários salvos anteriormente podem ter campos referenciados
    // dentro de rows.cols.fields sem a entrada correspondente na lista "fields".
    // Reconstrói essa lista para evitar o erro "Field ID not found in fields".
    this.reconcileFields(objectToReturn.rows, objectToReturn.fields);

    if (fieldDesc.filter) {

      if (fieldDesc.filter.brId) {
        objectToReturn.filter.brId = Object.assign(objectReference.filter.brId, fieldDesc.filter.brId);
      }

      if (fieldDesc.filter.filterDesign) {

        if (fieldDesc.filter.filterDesign.rows) {
          objectToReturn.filter.filterDesign.rows = Object.assign(objectReference.filter.filterDesign.rows, fieldDesc.filter.filterDesign.rows);
        }

        if (fieldDesc.filter.filterDesign.fields) {
          objectToReturn.filter.filterDesign.fields = Object.assign(objectReference.filter.filterDesign.fields, fieldDesc.filter.filterDesign.fields);
        }

        this.reconcileFields(objectToReturn.filter.filterDesign.rows, objectToReturn.filter.filterDesign.fields);
      }

      if (fieldDesc.filter.resultDesign) {
        objectToReturn.filter.resultDesign = Object.assign(objectReference.filter.resultDesign, fieldDesc.filter.resultDesign);
      }

      if (fieldDesc.filter.resultActions) {
        objectToReturn.filter.resultActions = Object.assign(objectReference.filter.resultActions, fieldDesc.filter.resultActions);
      }
    }

    return objectToReturn;
  },

  reconcileFields: function (rows, fields) {
    var self = this;
    (rows || []).forEach(function (row) {
      (row.cols || []).forEach(function (col) {
        (col.fields || []).forEach(function (field) {
          var index = self.findFieldIndex(field.id, fields);
          if (index === undefined) {
            fields.push(field);
          }
        });
      });
    });
  },

  generateId: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  addRow: function (rows, quantity) {
    var row = {
      "cols": []
    };
    for (var i = 0; i < quantity; i++) {
      row.cols.push({
        "fields": [],
        "width": Math.floor(12 / quantity)
      });
    }
    rows.push(row);
  },
  findFieldIndex: function (id, fields) {
    var index = _.findIndex(fields, function (o) {
      return o.id == id;
    });
    if (index >= 0) {
      return index;
    }
  },
  findField: function (id, fields) {
    var index = this.findFieldIndex(id, fields);
    if (index != undefined) {
      return fields[index];
    } else {
      console.error("Field ID [" + id + "] not found in fields", fields);
      return {};
    }
  },

  fieldBuildObject: function (field, fields) {

    var currentField = this.findField(field.id, fields);
    var objectToMount = fieldJsonBuilder.build(field);

    if (currentField.id != undefined) {
      var copy = Object.assign(objectToMount, currentField);
      return copy;
    }

    return objectToMount;
  },

  saveFieldDesc: function (payload) {
    let url = PATH + "/updateFieldDesc/" + payload.id;
    return repositoryService.save(url, payload)
  },

  rowRemove: function (rowIndex, rows) {
    var removeAllowed = true;
    var row = rows[rowIndex];
    row.cols.map(function (value) {
      if (value.fields.length > 0) {
        removeAllowed = false;
      }
    });
    if (removeAllowed) {
      rows.splice(rowIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}
