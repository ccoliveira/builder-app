<script>

import FieldFormName from './FieldFormName'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormHint from './FieldFormHint'
import FieldFormLabel from './FieldFormLabel'
import SelectForm from 'src/app/commons/components/SelectForm.vue';

import utils from '../../FormBuilderUtils';

export default{
  props: ["fieldData", "rules", "contractId"],
  components: {
    FieldFormName,
    FieldFormColumnName,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormHint,
    FieldFormLabel,
    SelectForm
  },
  computed: {
    actionIsValidToSubmit: function () {

      let hasBusinessRulesOrForm = false;

      if (this.actionObject.type === 'ACTION' && this.actionObject.businessRule.id) {
        hasBusinessRulesOrForm = true;
      } else if (this.actionObject.type === 'REPORT' && this.actionObject.form.id) {
        hasBusinessRulesOrForm = true;
      } else if (this.actionObject.type === 'LINK' && this.actionObject.form.id) {
        hasBusinessRulesOrForm = true;
      }

      return this.actionObject.name &&
        this.actionObject.icon &&
        this.actionObject.type &&
        this.actionObject.backgroundColor &&
        hasBusinessRulesOrForm &&
        this.actionObject.hintPt;
    },
    headerIsValidToSubmit: function () {
      return this.headerObject.value &&
        this.headerObject.labelPt;
    },
    typeList: function () {
      let options = [
        {
          value: '',
          label: ''
        },
        {
          value: 'ACTION',
          label: this.$t('action')
        },
        {
          value: 'REPORT',
          label: this.$t('report')
        },
        {
          value: 'LINK',
          label: this.$t('link')
        }
      ];

      return options;
    },
    _multipleSelect: {
      get: function() {
        return this.fieldData.multipleSelect;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, multipleSelect: newValue });
      }
    }
  },
  data () {
    return {
      headerObject: {
        id: '',
        value: '',
        labelPt: '',
        visibleToPt: true,
        labelEn: '',
        visibleToEs: true,
        labelEs: '',
        visibleToEn: true
      },
      actionObject: {
        id: '',
        name: '',
        businessRule: {
          id: ''
        },
        form: {
          id: ''
        },
        icon: '',
        hintPt: '',
        hintEs: '',
        hintEn: '',
        backgroundColor: '',
        type: ''
      }
    }
  },
  methods: {
    saveHeader: function () {

      Promise.resolve().then(() => {
        if (this.headerObject.id) {
          Promise.resolve().then(() => {
            let headers = JSON.parse(JSON.stringify(this.fieldData.headers));
            let item = _.find(headers, { 'id': this.headerObject.id });
            let position = headers.indexOf(item);
            headers[position] = this.headerObject;
            this.$emit('update:fieldData', { ...this.fieldData, headers: headers });
          });
        } else {
          let obj = {};
          Promise.resolve().then(() => {
            this.headerObject.id = utils.generateId();
            obj = this.headerObject;
          }).then(() => {
            let headers = JSON.parse(JSON.stringify(this.fieldData.headers));
            headers.push(obj);
            this.$emit('update:fieldData', { ...this.fieldData, headers: headers });
          });
        }
      }).then(() => {
        this.cleanHeader();
      });
    },
    saveAction: function () {

      Promise.resolve().then(() => {
        if (this.actionObject.id) {
          Promise.resolve().then(() => {
            let actions = JSON.parse(JSON.stringify(this.fieldData.actions));
            let item = _.find(actions, { 'id': this.actionObject.id });
            let position = actions.indexOf(item);
            actions[position] = this.actionObject;
            this.$emit('update:fieldData', { ...this.fieldData, actions: actions });
          });
        } else {
          let obj = {};
          Promise.resolve().then(() => {
            this.actionObject.id = utils.generateId();
            obj = this.actionObject;
          }).then(() => {
            let actions = JSON.parse(JSON.stringify(this.fieldData.actions));
            actions.push(obj);
            this.$emit('update:fieldData', { ...this.fieldData, actions: actions });
          });
        }
      }).then(() => {
        this.cleanAction();
      });
    },
    editHeader: function (item) {
      this.cleanHeader();
      Object.assign(this.headerObject, item);
    },
    removeHeader: function (item) {
      this.$confirm('Deseja realmente remover o cabeçalho da tabela?', this.$t('warning'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'error'
      }).then(() => {
        let headers = JSON.parse(JSON.stringify(this.fieldData.headers));
        let itemFound = headers.indexOf(item);
        headers.splice(itemFound, 1);
        this.$emit('update:fieldData', { ...this.fieldData, headers: headers });
      });
    },
    editAction: function (item) {
      Object.assign(this.actionObject, item);
    },
    removeAction: function (item) {
      this.$confirm('Deseja realmente remover a ação?', this.$t('warning'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'error'
      }).then(() => {
        let actions = JSON.parse(JSON.stringify(this.fieldData.actions));
        let itemFound = actions.indexOf(item);
        actions.splice(itemFound, 1);
        this.$emit('update:fieldData', { ...this.fieldData, actions: actions });
      });
    },
    cleanHeader: function() {
      this.headerObject = {
        id: '',
        value: '',
        labelPt: '',
        visibleToPt: true,
        labelEn: '',
        visibleToEn: true,
        labelEs: '',
        visibleToEs: true
      };
    },
    cleanAction: function() {
      this.actionObject = {
        id: '',
        name: '',
        businessRule: {
          id: ''
        },
        form: {
          id: ''
        },
        icon: '',
        hintPt: '',
        hintEs: '',
        hintEn: '',
        backgroundColor: '',
        type: ''
      };
    },
    formatBoolean: function(booleanValue) {

      if (booleanValue != undefined) {
        return booleanValue;
      }

      return true;
    }
  }
}
</script>

<template>
  <div>

    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">

        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />

          <div class="col-xs-4">
            <el-form-item :label="$t('enableMultipleSelect')">
              <el-switch v-model="_multipleSelect" :on-text="$t('yes')" :off-text="$t('no')" />
            </el-form-item>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('headerObject')">

        <FieldFormLabel :fieldData="headerObject"/>

        <div class="row">
          <div class="col-xs-4">
            <el-form-item :label="$t('visibleToPt')" prop="visibleToPt">
              <el-switch v-model="headerObject.visibleToPt" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
            </el-form-item>
          </div>
          <div class="col-xs-4">
            <el-form-item :label="$t('visibleToEs')" prop="visibleToEs">
              <el-switch v-model="headerObject.visibleToEs" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
            </el-form-item>
          </div>
          <div class="col-xs-4">
            <el-form-item :label="$t('visibleToEn')" prop="visibleToEn">
              <el-switch v-model="headerObject.visibleToEn" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-4">
            <el-form-item
              :label="$t('value')">
              <el-input
                id="value"
                v-model="headerObject.value"
              />
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <el-button size="small" @click.prevent="saveHeader()" type="primary" :disabled="!headerIsValidToSubmit">
              {{ $t('save') }}
            </el-button>
            <el-button size="small" @click.prevent="cleanHeader()" >
              {{ $t('clean') }}
            </el-button>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-xs-12">
            <el-table :data="fieldData.headers">

              <el-table-column
                inline-template
                :label="$t('value')">
                <div>{{row.value}}</div>
              </el-table-column>

              <el-table-column
                inline-template
                :label="$t('labelPt')">
                <div>{{row.labelPt}}</div>
              </el-table-column>

              <el-table-column
                inline-template
                :label="$t('labelEs')">
                <div>{{row.labelEs}}</div>
              </el-table-column>

              <el-table-column
                inline-template
                :label="$t('labelEn')">
                <div>{{row.labelEn}}</div>
              </el-table-column>

              <el-table-column
                width="100"
                inline-template>

                <div>
                  <el-button
                    type="edit"
                    size="mini"
                    icon="el-icon-edit"
                    @click.prevent="editHeader(row)">
                  </el-button>

                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.prevent="removeHeader(row)">
                  </el-button>
                </div>

              </el-table-column>

            </el-table>
          </div>
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('actionOption')">

        <div class="row">
          <div class="col-xs-4">
            <el-form-item
              :label="$t('name')">
              <el-input
                id="value"
                v-model="actionObject.name"
              />
            </el-form-item>
          </div>


          <div class="col-xs-4">
            <el-form-item :label="$t('type')">
              <el-select v-model="actionObject.type" clearable :placeholder="$t('select')">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-xs-4">
            <el-form-item :label="$t('businessRules')"
                          v-if="actionObject.type === 'ACTION'">
              <aio-select
                id="businessRuleId"
                v-model="actionObject.businessRule.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }" />
            </el-form-item>

            <el-form-item :label="$t('form')"
                          v-if="actionObject.type === 'REPORT'">
              <SelectForm
                id="formId"
                v-model="actionObject.form.id"
                :contractId="contractId"
                formType="REPORT"
              />
            </el-form-item>

            <el-form-item :label="$t('form')"
                          v-if="actionObject.type === 'LINK'">
              <SelectForm
                id="formId"
                v-model="actionObject.form.id"
                :contractId="contractId"
              />
            </el-form-item>
          </div>
        </div>

        <FieldFormHint :fieldData="actionObject"/>

        <div class="row">
          <div class="col-xs-4">
            <el-form-item :label="$t('icon')">
              <el-input
                v-model="actionObject.icon"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="col-xs-4">
            <el-form-item :label="$t('color')">
              <el-color-picker v-model="actionObject.backgroundColor"></el-color-picker>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <el-button size="small" @click.prevent="saveAction()" type="primary" :disabled="!actionIsValidToSubmit">
              {{ $t('save') }}
            </el-button>
            <el-button size="small" @click.prevent="cleanAction()">
              {{ $t('clean') }}
            </el-button>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-xs-12">
            <el-table :data="fieldData.actions">

              <el-table-column
                inline-template
                :label="$t('name')">
                <div>{{row.name}}</div>
              </el-table-column>

              <el-table-column
                inline-template
                :label="$t('hintPt')">
                <div>{{row.hintPt}}</div>
              </el-table-column>

              <el-table-column
                width="100"
                inline-template>

                <div>
                  <el-button
                    type="edit"
                    size="mini"
                    icon="el-icon-edit"
                    @click.prevent="editAction(row)">
                  </el-button>

                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.prevent="removeAction(row)">
                  </el-button>
                </div>

              </el-table-column>

            </el-table>
          </div>
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
