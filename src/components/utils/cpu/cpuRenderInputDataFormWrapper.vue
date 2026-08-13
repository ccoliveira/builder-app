<script>

  import cpuRenderInputData from './cpuRenderInputData.vue';
  import utils from 'src/app/module/FormBuilderUtils.js';
  import moduleUtils from 'src/app/module/ModuleUtils';

  export default {
    props: [
      "attr", "fieldValue", "formIdentifier", "rules",
      "label", "showHint", "hintValue", "placeholder",
      "instance"
    ],
    data() {
      return {
        attr_copy: ""
      }
    },
    components: {
      cpuRenderInputData
    },
    mounted: function() {

      let formIdentifier = Object.assign({}, this.formIdentifier, {formId: this.attr.formId});

      moduleUtils.resolveModuleDescription(formIdentifier).then(response => {

        let fields = response.fieldDesc.fields;

        this.attr_copy = Object.assign({}, this.attr);
        this.attr_copy.uri = moduleUtils.resolveFormUri(formIdentifier) + "/autocomplete";

        if (this.attr_copy.uriFilterList) {

          let uriFilterList = this.attr_copy.uriFilterList.slice();
          this.attr_copy.uriFilterList = []

          uriFilterList.map(it => {
            let field = utils.findField(it, fields);
            this.attr_copy.uriFilterList.push(field.columnName);
          });
        }

        if (this.attr_copy.columnsToShow) {

          let columnsToShow = this.attr_copy.columnsToShow.slice();
          this.attr_copy.columnsToShow = {};

          columnsToShow.map(it => {
            let field = utils.findField(it, fields);
            this.attr_copy.columnsToShow[field.columnName] = field.labelPt;
          });
        }

        if (this.attr_copy.type == 'association' && this.attr_copy.columnValue) {
          let field = utils.findField(this.attr_copy.columnValue, fields);
          this.attr_copy.columnValue = field.columnName;
        }

        if (this.attr_copy.columnLabel) {
          let field = utils.findField(this.attr_copy.columnLabel, fields);
          this.attr_copy.columnLabel = field.columnName;
        }
      });
    },
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          this.$emit('input', newValue);
        }
      }
    }
  }
</script>
<style scopde>
  input {
    background-color: white !important;
  }
</style>
<template>
  <cpuRenderInputData
    v-if="attr_copy != ''"
    :attr="attr_copy"
    :fieldValue="fieldValue"
    v-model="updateFieldValue"
    :rules="rules"
    :showHint="showHint"
    :label="label"
    :hintValue="hintValue"
    :placeholder="placeholder"
    :instance="instance"
    :formIdentifier="formIdentifier"
  />
</template>
