<script>
import {mapActions} from 'vuex';
import SelectForm from 'src/app/commons/components/SelectForm';

export default{
  props: ["fieldData", "rules", "contractId", "fieldsToRemove"],
  components: {
    SelectForm
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

      // eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component
      this.fieldData.columnValue = "";

      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnLabel = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnsToShow = [];
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.uriFilterList = [];

      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnLabelEs = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnsToShowEs = [];
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.uriFilterListEs = [];

      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnLabelEn = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.columnsToShowEn = [];
      // eslint-disable-next-line vue/no-mutating-props
      this.fieldData.uriFilterListEn = [];

      this.formSelected = val;

      if (val && this.fieldData.type == 'composition') {
        // eslint-disable-next-line vue/no-mutating-props
        this.fieldData.columnName = val.tableName + "_id";
        // eslint-disable-next-line vue/no-mutating-props
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

    // eslint-disable-next-line vue/no-mutating-props -- rules object is intentionally filled in by this component
    this.rules.formId = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
    // eslint-disable-next-line vue/no-mutating-props
    this.rules.columnLabel = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
    if (!this.removeFields.columnValue){
      // eslint-disable-next-line vue/no-mutating-props
      this.rules.columnValue = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ]
    };
    // eslint-disable-next-line vue/no-mutating-props
    this.rules.columnsToShow = [
      { type: 'array', required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
    // eslint-disable-next-line vue/no-mutating-props
    this.rules.uriFilterList = [
      { type: 'array', required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];

    // eslint-disable-next-line vue/no-mutating-props
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
    // eslint-disable-next-line vue/no-mutating-props
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
    // eslint-disable-next-line vue/no-mutating-props
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

    // eslint-disable-next-line vue/no-mutating-props
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
    // eslint-disable-next-line vue/no-mutating-props
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
    // eslint-disable-next-line vue/no-mutating-props
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
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <SelectForm v-model="fieldData.formId" :contractId="contractId" @objectValue="formObjectValue"/>
        </el-form-item>
      </div>
      <div class="col-xs-4" v-if="!removeFields.columnValue" >
        <el-form-item :label="$t('value')" prop="columnValue">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnValue"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelPt')" prop="columnLabel">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnLabel"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')"

          >
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumns')" prop="columnsToShow">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnsToShow"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFields')" prop="uriFilterList">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.uriFilterList"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelEs')" prop="columnLabelEs">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnLabelEs"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumnsEs')" prop="columnsToShowEs">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnsToShowEs"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFieldsEs')" prop="uriFilterListEs">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.uriFilterListEs"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('formLabelEn')" prop="columnLabelEn">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnLabelEn"
                     clearable
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('displayColumnsEn')" prop="columnsToShowEn">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.columnsToShowEn"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('filterFieldsEn')" prop="uriFilterListEn">
          <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
          <el-select v-model="fieldData.uriFilterListEn"
                     multiple
                     :disabled="disableSelects"
                     :placeholder="$t('select')">
            <el-option v-for="item in listComponents"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>

  </div>
</template>
