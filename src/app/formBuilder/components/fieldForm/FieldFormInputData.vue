<script>
  import {mapActions} from 'vuex';
  import SelectForm from 'src/app/commons/components/SelectForm';
  import vue2AceEditor from 'vue2-ace-editor';

  export default{
    props: ["fieldData", "rules", "contractId", "fieldsToRemove"],
    components: {
      SelectForm,
      vue2AceEditor
    },
    data () {
      return {
        formSelected: {
          fieldDesc: {
            fields: ''
          }
        },
        listComponents: [],
        disableSelects: true,
        removeFields: {
          'columnValue': false
        }
      }
    },
    beforeMount () {
      _.assign(this.removeFields, this.fieldsToRemove);
    },
    methods: {
      ...mapActions([
        'fetch',
        'showLoader',
        'hideLoader'
      ]),
      formObjectValue: function (val) {

        this.fieldData.columnValue = "";

        this.fieldData.columnLabel = "";
        this.fieldData.columnsToShow = [];
        this.fieldData.uriFilterList = [];

        this.fieldData.columnLabelEs = "";
        this.fieldData.columnsToShowEs = [];
        this.fieldData.uriFilterListEs = [];

        this.fieldData.columnLabelEn = "";
        this.fieldData.columnsToShowEn = [];
        this.fieldData.uriFilterListEn = [];

        this.formSelected = val;

        if (val && this.fieldData.type == 'composition') {
          this.fieldData.columnName = val.tableName + "_id";
          this.fieldData.columnValue = "id";
        }
      }
    },
    watch: {
      "fieldData.formId": function (newValue) {
        if (newValue === '' || newValue === null) {
          this.disableSelects = true;
        } else {
          this.disableSelects = false;
        }
      },
      "formSelected.fieldDesc.fields": function (newValue) {
        this.listComponents = [];

        _.differenceBy(
          newValue,
          [{'type': 'header'},{'type': 'boolean'}],
          'type'
        ).map(it => {
          this.listComponents.push({
            id: it.id,
            label: it.name
          });
        });
      }
    },
    mounted() {

      console.log('oi');

      this.fetch({
        context: this,
        uri: '/form/' + this.fieldData.formId
      }).then(response => {
        this.disableSelects = false;
        this.formSelected = response.data;
      });
    },
    created() {

      this.rules.formId = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
      this.rules.columnLabel = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
      if (!this.removeFields.columnValue){
        this.rules.columnValue = [
          { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
        ]
      };
      this.rules.columnsToShow = [
        { type: 'array', required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
      this.rules.uriFilterList = [
        { type: 'array', required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];

      this.rules.columnLabelEs = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (!value && (this.fieldData.columnsToShowEs.length > 0 || this.fieldData.uriFilterListEs.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];
      this.rules.columnsToShowEs = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (value.length == 0 && (this.fieldData.columnLabelEs || this.fieldData.uriFilterListEs.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];
      this.rules.uriFilterListEs = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (value.length == 0 && (this.fieldData.columnLabelEs || this.fieldData.columnsToShowEs.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];

      this.rules.columnLabelEn = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (!value && (this.fieldData.columnsToShowEn.length > 0 || this.fieldData.uriFilterListEn.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];
      this.rules.columnsToShowEn = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (value.length == 0 && (this.fieldData.columnLabelEn || this.fieldData.uriFilterListEn.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];
      this.rules.uriFilterListEn = [{
        validator: (rules, value, callback) => {
          if (this.fieldData) {
            if (value.length == 0 && (this.fieldData.columnLabelEn || this.fieldData.columnsToShowEn.length > 0)) {
              callback(new Error(this.$t('pleaseFillInAllTheFieldLanguage')));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }];

    }
  }
</script>
<template>
  <div>
    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('form')" prop="formId">
          <SelectForm
            v-model="fieldData.formId"
            :contractId="contractId"
            @objectValue="formObjectValue"
          />
        </el-form-item>
      </div>
      <div class="col-xs-4" v-if="!removeFields.columnValue" >
        <el-form-item :label="$t('value')" prop="columnValue">
          <el-select v-model="fieldData.columnValue"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')"

          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelPt')" prop="columnLabel">
          <el-select v-model="fieldData.columnLabel"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')"

          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumns')" prop="columnsToShow">
          <el-select v-model="fieldData.columnsToShow"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFields')" prop="uriFilterList">
          <el-select v-model="fieldData.uriFilterList"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelEs')" prop="columnLabelEs">
          <el-select v-model="fieldData.columnLabelEs"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumnsEs')" prop="columnsToShowEs">
          <el-select v-model="fieldData.columnsToShowEs"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFieldsEs')" prop="uriFilterListEs">
          <el-select v-model="fieldData.uriFilterListEs"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelEn')" prop="columnLabelEn">
          <el-select v-model="fieldData.columnLabelEn"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumnsEn')" prop="columnsToShowEn">
          <el-select v-model="fieldData.columnsToShowEn"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFieldsEn')" prop="uriFilterListEn">
          <el-select v-model="fieldData.uriFilterListEn"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')"
          >
            <el-option v-for="item in listComponents"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

  </div>
</template>
