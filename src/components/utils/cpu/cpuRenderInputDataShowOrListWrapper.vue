<script>
  import apiService from 'src/services/ApiService';
  import moduleUtils from 'src/app/module/ModuleUtils';
  import repositoryService from 'src/services/RepositoryService';
  import appConfig from 'src/services/AppConfigService';
  import formBuilderUtils from 'src/app/module/FormBuilderUtils.js';

  export default{
    props: [
      "attr", "fieldValue", "formIdentifier", "label", "moduleType"
    ],
    data: function() {
      return {
        localObject: {},
        localField: {},
        url: ''
      }
    },
    watch: {
      fieldValue: function(val) {
        if (val) {
          this.getValue();
        }
      }
    },
    mounted: function() {
      if (this.fieldValue) {
        this.getValue();
      }
    },
    methods: {
      getValue: function(){
        // TODO MOVER PARA UM UTILS, ESTA SENDO UTILIZADO NO iCPU-RENDER-INPUT-DATA E INPUT-DATA-SHOW-OR-LIST
        let formIdentifier = Object.assign({}, this.formIdentifier, {formId: this.attr.formId});

        moduleUtils.resolveModuleDescription(formIdentifier).then(response => {

          this.url = moduleUtils.resolveFormUri(formIdentifier) + "/autocompleteLoad";
          this.localField = formBuilderUtils.findField(this.attr.columnLabel, response.fieldDesc.fields);

        }).then(() => {

          let data = {}
          data._ = {}
          data._.field = this.attr.columnValue;
          data._.fieldValue = this.fieldValue;
          data._.formId = this.attr.formId;

          return apiService.post({
            uri: this.url,
            data: data,
            excludeApi: true
          }).then(response => {
            if(response !== undefined) {
              this.localObject = response.body.instance;
            }
          });
        });
      }
    }
  }
</script>

<template>
  <div>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <span>
          {{localObject[localField.columnName]}}
        </span>
      </p>
    </div>
    <span v-if="moduleType === 'list'">
      {{localObject[localField.columnName]}}
    </span>
  </div>
</template>
