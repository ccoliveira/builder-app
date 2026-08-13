<script>
  import apiService from 'src/services/ApiService';
  import util from './cpuUtils';
  import moduleUtils from 'src/app/module/ModuleUtils';

  export default{
    props: [
      "attr", "value", "rules", "label",
      "showHint", "hintValue", "placeholder", "instance",
      "formIdentifier"],
    data(){
      return {
        showModal: false,
        gridData: [],
        localValue: '',
        filter: '',
        uriFilter: {
          itemsPerPage: 8,
          currentPage: 1
        },
        localObject: {}
      }
    },
    watch: {
      filter (val) {
        this.load();
      },
      showModal (val) {
        if (val) {
          this.filter = '';
        }
      },
      value (val) {
        if(val) {
          // TODO MOVER PARA UM UTILS, ESTA SENDO UTILIZADO NO iCPU-RENDER-INPUT-DATA E INPUT-DATA-SHOW-OR-LIST
          let formIdentifier = Object.assign({}, this.formIdentifier, {formId: this.attr.formId});

          moduleUtils.resolveModuleDescription(formIdentifier).then(response => {

            this.url = moduleUtils.resolveFormUri(formIdentifier) + "/autocompleteLoad";

          }).then(() => {

            let data = {}
            data._ = {}
            data._.fieldName = this.attr.columnValue;
            data._.fieldValue = this.value;
            data._.formId = this.attr.formId;

            return apiService.post({
              uri: this.url,
              data: data,
              excludeApi: true
            }).then(response => {
              if(response !== undefined) {
                this.localObject = response.body.instance;
              }
            }).then(() => {
              this.localValue = this.localObject[this.attr.columnLabel];
            });
          });
        }
      }
    },
    methods: {
      clearField: function () {
        this.updateFieldValue = '';
        this.localValue = '';
      },
      selectRow: function (row) {
        this.updateFieldValue = row[this.attr.columnValue];
        this.localValue = row[this.attr.columnLabel];
        this.showModal = false;
      },
      load: function() {

        let data = this._uriFilterList;
        data._ = {
          formId: this.formIdentifier.formId,
          fieldId: this.attr.id
        };

        if (this.instance && this.attr &&
          this.attr.dependsOfSource && this.attr.dependsOfTarget &&
          this.instance[this.attr.dependsOfSource]) {

          data._.dependsOfTarget = this.attr.dependsOfTarget;
          data._.dependsOfQuery = this.instance[this.attr.dependsOfSource];
        }

        return apiService.post({
          uri: this.attr.uri,
          data: data,
          excludeApi: true
        }).then(response => {
          this.gridData = response.data;
        });
      }
    },
    computed: {
      getTitle: function () {
        return this.attr.labelPt;
      },
      updateFieldValue: {
        get: function() {
          return this.value;
        },
        set: function(newValue) {
          if (this.attr.type == 'composition') {
            this.$emit('input', parseInt(newValue));
          } else {
            this.$emit('input', newValue);
          }
        }
      },
      _uriFilterList: function () {
        let newObj = Object.assign({}, this.uriFilter);

        if (this.attr && this.attr.uriFilterList) {
          this.attr.uriFilterList.map(item => {
            newObj[item] = this.filter;
          });
        }

        return newObj;
      },
      _columnsToShow: function() {
        let list = [];
        _.forOwn(this.attr.columnsToShow, function(value, key) {
          list.push({
            label: value,
            value: key
          })
        })
        return list
      }
    },
    mounted() {
    },
    created() {
      util.resolveRules(this.attr, this.rules);
    }
  }
</script>
<template>
  <div>
    <el-popover
      ref="popover"
      v-show="showHint"
      placement="top-start"
      width="200"
      trigger="hover"
      :content="hintValue">
    </el-popover>

    <el-form-item label="temp" :prop="attr.columnName">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-input :placeholder="placeholder" v-model="localValue" disabled>
        <el-button slot="prepend" icon="search" @click="showModal = true"></el-button>
        <el-button slot="append" @click.prevent="clearField()" icon="delete"></el-button>
      </el-input>

    </el-form-item>

    <el-dialog :title="getTitle" :visible.sync="showModal">
      <el-input v-model="filter"/>
      <br>
      <br>
      <el-table :data="gridData">

        <el-table-column
          v-for="item in _columnsToShow"
          :label="item.label"
          inline-template>
          <div>{{row[item.value]}}</div>
        </el-table-column>

        <el-table-column
          inline-template>
          <el-button
            size="mini"
            type="primary"
            @click.prevent="selectRow(row)">
            Selecione
          </el-button>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>
