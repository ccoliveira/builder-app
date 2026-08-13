<script>
  import {mapActions} from 'vuex';

  import SelectForm from 'src/app/commons/components/SelectForm.vue';
  import SelectContract from 'src/app/commons/components/SelectContract.vue';

  import vue2AceEditor from 'vue2-ace-editor';

  export default {
    components: {
      SelectForm,
      SelectContract,
      vue2AceEditor
    },
    data() {
      return {
        payload: {
          instance: {
            id: null,

            name: '',
            tableName: '',
            resourceList: '',
            resourceShow: '',
            resourceForm: '',
            createTable: true,

            labelPt: '',
            labelEs: '',
            labelEn: '',

            contract: { id: null },
            parentForm: { id: null },
            parentFormSeq: 0,

            // listView: true,
            formType: '',
            filterInList: true,
            showView: true,

            createView: true,
            editView: true,
            deleteButton: true,

            exportData: false,
            availableInWeb: true,
            availableInMobile: false,

            customTemplate: {
              template: '',
              script: ''
            },
            reportTemplate: '',
            businessRulesPreFilter: { id: '' },
            businessRulesReport: { id: '' },

            businessRulesBeforeCrudViewCreate: { id: '' },
            businessRulesBeforeCrudViewShow: { id: '' },
            businessRulesBeforeCrudViewEdit: { id: '' },
            businessRulesBeforeCrudViewList: { id: '' },
            businessRulesBeforeOtherView: { id: '' },

          },
          uri: '/form',
          showRouter: '/form/show',
          context: this,
          errors: []
        },
        formTypeList: [
          {
            value: '',
            label: ''
          },
          {
            value: 'CRUD',
            label: 'Crud'
          },
          {
            value: 'CUSTOM',
            label: 'Custom'
          },
          {
            value: 'DASHBOARD',
            label: 'Dashboard'
          },
          {
            value: 'REPORT',
            label: 'Report'
          },
          {
            value: 'FREE',
            label: 'Free'
          }
        ],
        loadComp: '',
        tabActiveName: 'template'
      }
    },
    watch: {
      "payload.instance.formType": function(newValue) {
        if (!(newValue === 'CRUD')) {
          this.payload.instance.tableName = '';
          this.payload.instance.resourceList = '';
          this.payload.instance.resourceShow = '';
          this.payload.instance.resourceForm = '';
          this.payload.instance.createView = false;
          this.payload.instance.createTable = false;
          this.payload.instance.filterInList = false;
          this.payload.instance.showView = false;
          this.payload.instance.editView = false;
          this.payload.instance.deleteButton = false;
          this.payload.instance.exportData = false;
        }
      },
      "payload.instance.contract.id": function(newValue) {
        if (!newValue) {
          this.payload.instance.parentForm.id = null;
        }
      }
    },
    computed: {
      isValidToSubmit: function () {

        return this.payload.instance.contract.id &&
          this.payload.instance.name &&
          this.payload.instance.labelPt &&
          this.payload.instance.formType
      },
      template: {
        get: function() {
          if (this.payload.instance.customTemplate.template) {
            return this.payload.instance.customTemplate.template;
          }
          return "";
        },
        set: function(newValue) {
          this.payload.instance.customTemplate.template = newValue;
        }
      },
      script: {
        get: function() {
          if (this.payload.instance.customTemplate.script) {
            return this.payload.instance.customTemplate.script;
          }
          return "";
        },
        set: function(newValue) {
          this.payload.instance.customTemplate.script = newValue;
        }
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
            context: this,
            uri: '/form/' + this.$route.params.id
          }).then(response => {
            this.payload.instance.id = response.data.id;

            this.payload.instance.name = response.data.name;
            this.payload.instance.tableName = response.data.tableName;
            this.payload.instance.resourceList = response.data.resourceList;
            this.payload.instance.resourceShow = response.data.resourceShow;
            this.payload.instance.resourceForm = response.data.resourceForm;
            this.payload.instance.createTable = response.data.createTable;

            this.payload.instance.labelPt = response.data.labelPt;
            this.payload.instance.labelEs = response.data.labelEs;
            this.payload.instance.labelEn = response.data.labelEn;

            this.payload.instance.parentForm.id = response.data.parentForm.id;
            this.payload.instance.parentFormSeq = response.data.parentFormSeq;
            this.payload.instance.contract = response.data.contract;

            // this.payload.instance.listView = response.data.listView;
            this.payload.instance.formType= response.data.formType;
            this.payload.instance.filterInList = response.data.filterInList;
            this.payload.instance.showView = response.data.showView;

            this.payload.instance.createView = response.data.createView;
            this.payload.instance.editView = response.data.editView;
            this.payload.instance.deleteButton = response.data.deleteButton;

            this.payload.instance.exportData = response.data.exportData;
            this.payload.instance.availableInWeb = response.data.availableInWeb;
            this.payload.instance.availableInMobile = response.data.availableInMobile;
            this.payload.instance.customTemplate = response.data.customTemplate;
            this.payload.instance.reportTemplate = response.data.reportTemplate ? response.data.reportTemplate : '';

            if (response.data.businessRulesPreFilter !== '') {
              this.payload.instance.businessRulesPreFilter = response.data.businessRulesPreFilter;
            } else {
              this.payload.instance.businessRulesPreFilter = { id: '' }
            }

            if (response.data.businessRulesReport !== '') {
              this.payload.instance.businessRulesReport = response.data.businessRulesReport;
            } else {
              this.payload.instance.businessRulesReport = { id: '' }
            }

            if (response.data.businessRulesBeforeCrudViewCreate !== '') {
              this.payload.instance.businessRulesBeforeCrudViewCreate = response.data.businessRulesBeforeCrudViewCreate;
            } else {
              this.payload.instance.businessRulesBeforeCrudViewCreate = { id: '' }
            }

            if (response.data.businessRulesBeforeCrudViewShow !== '') {
              this.payload.instance.businessRulesBeforeCrudViewShow = response.data.businessRulesBeforeCrudViewShow;
            } else {
              this.payload.instance.businessRulesBeforeCrudViewShow = { id: '' }
            }

            if (response.data.businessRulesBeforeCrudViewEdit !== '') {
              this.payload.instance.businessRulesBeforeCrudViewEdit = response.data.businessRulesBeforeCrudViewEdit;
            } else {
              this.payload.instance.businessRulesBeforeCrudViewEdit = { id: '' }
            }

            if (response.data.businessRulesBeforeCrudViewList !== '') {
              this.payload.instance.businessRulesBeforeCrudViewList = response.data.businessRulesBeforeCrudViewList;
            } else {
              this.payload.instance.businessRulesBeforeCrudViewList = { id: '' }
            }

            if (response.data.businessRulesBeforeOtherView !== '') {
              this.payload.instance.businessRulesBeforeOtherView = response.data.businessRulesBeforeOtherView;
            } else {
              this.payload.instance.businessRulesBeforeOtherView = { id: '' }
            }
          });
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'save',
        'showLoader',
        'hideLoader'
      ]),
      backToSearch: function () {
        this.$router.push('/form');
      },
      backToShow: function () {
        this.$router.push('/form/show/' + this.$route.params.id);
      },
      initEditor:function (editor) {
        require('brace/mode/html');
        require('brace/mode/groovy');
        require('brace/mode/javascript');
        require('brace/mode/less');
        require('brace/theme/chrome');
        require('brace/mode/xml');
      },
      showCrudOptions: function () {
        return this.payload.instance.formType === 'CRUD'
      },
      showCustomOptions: function () {
        return this.payload.instance.formType === 'CUSTOM'
      },
      showReportOptions: function () {
        return this.payload.instance.formType === 'REPORT'
      },
      _save: function () {
        // TODO - quando o save dá erro, não consegue recuperar o valor do JSON pois o mesmo é uma String
        Promise.resolve().then(() => {
          this.payload.instance.customTemplate = JSON.stringify(this.payload.instance.customTemplate);
        }).then(() => {
          this.save(this.payload);
        });
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

      <el-form label-position="top">

        <el-row :gutter="10">

          <el-col :span="8">

            <el-form-item :label="$t('type')">
              <el-select
                :disabled="payload.instance.id != null"
                id="formType"
                :placeholder="$t('select')"
                :class="{ 'has-error' : payload.errors.formType }"
                clearable
                v-model="payload.instance.formType"
                filterable >
                <el-option  v-for="item in formTypeList"  :key="item.value"  :label="item.label"  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('contract')">
              <SelectContract
                id="contractId"
                v-model="payload.instance.contract.id" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('formParent')">
              <SelectForm
                id="parentFormId"
                v-model="payload.instance.parentForm.id"
                :disabled="!payload.instance.contract.id"
                formType="CRUD"
                :contractId="payload.instance.contract.id"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10">

          <el-col :span="12">
            <el-form-item :label="$t('name')">
              <el-input
                id="name"
                v-model="payload.instance.name"
                :class="{ 'has-error' : payload.name }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item :label="$t('formParentseq')">
              <el-input-number
                id="parentFormSeq"
                v-model="payload.instance.parentFormSeq"
                :class="{ 'has-error' : payload.parentFormSeq }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item :label="$t('availableOnWeb')">
              <el-switch
                id="availableWeb"
                v-model="payload.instance.availableInWeb"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('availableOnMobile')">
              <el-switch
                id="availableMobile"
                v-model="payload.instance.availableInMobile"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10">

          <el-col :span="8">
            <el-form-item :label="$t('labelInPortuguese')">
              <el-input
                id="labelPt"
                v-model="payload.instance.labelPt"
                :class="{ 'has-error' : payload.labelPt }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInSpanish')">
              <el-input
                id="labelEs"
                v-model="payload.instance.labelEs"
                :class="{ 'has-error' : payload.labelEs }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInEnglish')">
              <el-input
                id="labelEn"
                v-model="payload.instance.labelEn"
                :class="{ 'has-error' : payload.labelEn }"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10" v-if="!showCrudOptions() && !showCustomOptions() && payload.instance.formType">
          <el-col :span="8">
            <el-form-item :label="$t('beforeOtherView')">
              <aio-select
                id="businessRulesBeforeOtherView"
                v-model="payload.instance.businessRulesBeforeOtherView.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">
          <el-col :span="24">
            <h4>{{ $t('crudOption') }}</h4>
            <hr />
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">

          <el-col :span="16">
            <el-form-item :label="$t('tableName')">
              <el-input
                id="tableName"
                v-model="payload.instance.tableName"
                :class="{ 'has-error' : payload.tableName }"
                :disabled="!(payload.instance.formType == 'CRUD')"
              />
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item :label="$t('createTable')">
              <el-switch
                id="createTable"
                v-model="payload.instance.createTable"
                :disabled="!(payload.instance.formType === 'CRUD')"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">

          <el-col :span="8">
            <el-form-item :label="$t('resourceList')">
              <el-input
                id="resourceList"
                v-model="payload.instance.resourceList"
                :class="{ 'has-error' : payload.resourceList }"
                :disabled="!(payload.instance.formType == 'CRUD')"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('resourceShow')">
              <el-input
                id="resourceShow"
                v-model="payload.instance.resourceShow"
                :class="{ 'has-error' : payload.resourceShow }"
                :disabled="!(payload.instance.formType == 'CRUD')"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('resourceForm')">
              <el-input
                id="resourceForm"
                v-model="payload.instance.resourceForm"
                :class="{ 'has-error' : payload.resourceForm }"
                :disabled="!(payload.instance.formType == 'CRUD')"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">

          <el-col :span="8">
            <el-form-item :label="$t('showSearchFilter')">
              <el-switch
                id="filterList"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.filterInList"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('showLinkToDetailsOnSearchResult')">
              <el-switch
                id="showView"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.showView"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('allowExportSearchResult')">
              <el-switch
                id="exportData"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.exportData"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">
          <el-col :span="8">
            <el-form-item :label="$t('allowCreateRegister')">
              <el-switch
                id="createview"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.createView"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('allowUpdateRegister')">
              <el-switch
                id="editView"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.editView"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('allowDeleteRegister')">
              <el-switch
                id="deleteButton"
                :disabled="!(payload.instance.formType == 'CRUD')"
                v-model="payload.instance.deleteButton"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">
          <el-col :span="8">
            <el-form-item :label="$t('preFilter')">
              <aio-select
                id="businessRulePreFilter"
                v-model="payload.instance.businessRulesPreFilter.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('beforeCrudViewCreate')">
              <aio-select
                id="businessRulesBeforeCrudViewCreate"
                v-model="payload.instance.businessRulesBeforeCrudViewCreate.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('beforeCrudViewShow')">
              <aio-select
                id="businessRulesBeforeCrudViewShow"
                v-model="payload.instance.businessRulesBeforeCrudViewShow.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCrudOptions()">
          <el-col :span="8">
            <el-form-item :label="$t('beforeCrudViewEdit')">
              <aio-select
                id="businessRulesBeforeCrudViewEdit"
                v-model="payload.instance.businessRulesBeforeCrudViewEdit.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('beforeCrudViewList')">
              <aio-select
                id="businessRulesBeforeCrudViewList"
                v-model="payload.instance.businessRulesBeforeCrudViewList.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showCustomOptions()">
          <el-col :span="24">
            <h4>{{ $t('customOption') }}</h4>
            <hr />
          </el-col>
        </el-row>

        <el-tabs v-model="tabActiveName" id="tabs" v-if="showCustomOptions()">
          <el-tab-pane :label="$t('template')" name="template" id="template">

            <el-row :gutter="10">
              <el-col :md="24" :xs="24">
                <el-form-item :label="$t('template')">
                  <vue2-ace-editor
                    id="template"
                    v-model="template"
                    lang="groovy"
                    height="800"
                    width="100%"
                    @init="initEditor"
                    theme="chrome">
                  </vue2-ace-editor>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane :label="$t('script')" name="script" id="script">

            <el-row :gutter="10">
              <el-col :md="24" :xs="24">
                <el-form-item :label="$t('script')">
                  <vue2-ace-editor
                    id="script"
                    v-model="script"
                    lang="groovy"
                    height="800"
                    width="100%"
                    @init="initEditor"
                    theme="chrome">
                  </vue2-ace-editor>
                </el-form-item>
              </el-col>

            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-row :gutter="10" v-if="showReportOptions()">
          <el-col :span="24">
            <h4>{{ $t('reportOption') }}</h4>
            <hr />
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showReportOptions()">
          <el-col :span="8">
            <el-form-item :label="$t('businessRules')">
              <aio-select
                id="businessRulesReport"
                v-model="payload.instance.businessRulesReport.id"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" v-if="showReportOptions()">
          <el-col :md="24" :xs="24">
            <el-form-item :label="$t('reportTemplate')">
              <vue2-ace-editor
                id="reportTemplate"
                v-model="payload.instance.reportTemplate"
                lang="xml"
                height="800"
                width="100%"
                @init="initEditor"
                theme="chrome">
              </vue2-ace-editor>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

    </div>

    <template #footer>
      <el-row :gutter="10">
        <el-col :span="24">
          <FooterCreateEdit
            :sendEnabled="isValidToSubmit"
            :detailsShow="!!payload.instance.id"
          @do-send="_save()"
          @back-to-search="backToSearch()"
          @back-to-show="backToShow()"/>
      </el-col>
    </el-row>
    </template>

  </modulePanel>
</template>
