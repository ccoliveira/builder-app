<script>
  import {mapActions, mapGetters} from 'vuex';

  import FormClone from './FormClone';
  import FormInterceptor from './FormInterceptor';
  import SpanTypeInterceptor from './SpanTypeInterceptor';
  import SpanTrueOrFalse from 'src/components/utils/SpanTrueOrFalse';
  import SpanFormType from './SpanFormType';

  import apiService from 'src/services/ApiService';

  export default{
    name: 'FormShow',
    components: {
      FormClone,
      FormInterceptor,
      SpanTypeInterceptor,
      SpanTrueOrFalse,
      SpanFormType
    },
    data() {
      return {
        instance: {
          id: '',

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
          businessRulesPreFilter: {},
          businessRulesReport: {},

          businessRulesBeforeCrudViewCreate: { id: '' },
          businessRulesBeforeCrudViewShow: { id: '' },
          businessRulesBeforeCrudViewEdit: { id: '' },
          businessRulesBeforeCrudViewList: { id: '' },
          businessRulesBeforeOtherView: { id: '' }
        },
        tabActiveName: 'details',
        tabActiveNameCustom: 'template',
        formInterceptorsList: [],
        dialogCloneVisible: false,
        dialogFormInterceptorVisible: false,
        dialogFormInterceptorInstance: {}
      }
    },
    mounted () {
      this.fetch({
        context: this,
        uri: '/form/' + this.$route.params.id
      }).then(response => {
        this.instance.id = response.data.id;

        this.instance.name = response.data.name;
        this.instance.tableName = response.data.tableName;
        this.instance.resourceList = response.data.resourceList;
        this.instance.resourceShow = response.data.resourceShow;
        this.instance.resourceForm = response.data.resourceForm;
        this.instance.createTable = response.data.createTable;

        this.instance.labelPt = response.data.labelPt;
        this.instance.labelEs = response.data.labelEs;
        this.instance.labelEn = response.data.labelEn;

        this.instance.parentForm = response.data.parentForm;
        this.instance.parentFormSeq = response.data.parentFormSeq;
        this.instance.contract = response.data.contract;

        this.instance.formType= response.data.formType;
        this.instance.filterInList = response.data.filterInList;
        this.instance.showView = response.data.showView;

        this.instance.createView = response.data.createView;
        this.instance.editView = response.data.editView;
        this.instance.deleteButton = response.data.deleteButton;

        this.instance.exportData = response.data.exportData;
        this.instance.availableInWeb = response.data.availableInWeb;
        this.instance.availableInMobile = response.data.availableInMobile;
        this.instance.customTemplate = response.data.customTemplate;

        this.instance.reportTemplate = response.data.reportTemplate;
        this.instance.businessRulesPreFilter = response.data.businessRulesPreFilter;
        this.instance.businessRulesReport = response.data.businessRulesReport;

        this.instance.businessRulesBeforeCrudViewCreate = response.data.businessRulesBeforeCrudViewCreate;
        this.instance.businessRulesBeforeCrudViewShow = response.data.businessRulesBeforeCrudViewShow;
        this.instance.businessRulesBeforeCrudViewEdit = response.data.businessRulesBeforeCrudViewEdit;
        this.instance.businessRulesBeforeCrudViewList = response.data.businessRulesBeforeCrudViewList;
        this.instance.businessRulesBeforeOtherView = response.data.businessRulesBeforeOtherView;
      });
    },
    computed: {
      ...mapGetters([
        'apiUrl'
      ])
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/form/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/form');
      },
      formBuilder: function() {
        this.$router.push('/formBuilder/' + this.instance.id);
      },
      filterDesign: function() {
        this.$router.push('/filterDesign/' + this.instance.id);
      },
      editScript: function() {
        alert('oi');
      },
      tabHandleClick(tab, event) {
        if (tab.name == 'interceptors') {

          this.loadFormInterceptor();
        }
      },
      loadFormInterceptor: function () {
        apiService.search({
          uri: '/formInterceptor',
          filter: {
            'form.id': this.$route.params.id
          }
        }).then(response => {
          this.formInterceptorsList = response.data;
        });
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/form/" + this.instance.id,
          successRouterPush: '/form'
        });
      },
      clone: function() {
        this.dialogCloneVisible = true;
      },
      addFormInterceptor: function() {
        this.dialogFormInterceptorVisible = true;
      },
      editFormInterceptor: function(formInterceptor) {
        this.dialogFormInterceptorInstance = formInterceptor;
        this.dialogFormInterceptorVisible = true;
      },
      removeFormInterceptor: function(id) {
        this.delete({
          context: this,
          uri: "/formInterceptor/" + id
        }).then(() => {
          this.loadFormInterceptor();
        });
      },
      initEditor:function (editor) {
        require('brace/mode/html');
        require('brace/mode/groovy');
        require('brace/mode/javascript');
        require('brace/mode/less');
        require('brace/theme/chrome');
      },
      showCrudOptions: function () {
        return this.instance.formType == 'CRUD'
      },
      showCustomOptions: function () {
        return this.instance.formType == 'CUSTOM'
      },
      showReportOptions: function () {
        return this.instance.formType == 'REPORT'
      },
      returnHintButton: function(buttontype) {
        return this.$t(buttontype);
      }
    }
  }
</script>

<template>
  <el-tabs type="border-card" @tab-click="tabHandleClick" v-model="tabActiveName" id="tabs">
    <el-tab-pane :label="$t('details')" name="details" id="details">

      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('type') }}</label>
            <p>
              <SpanFormType :value="instance.formType" id="formType" />
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('contract') }}</label>
            <p id="contract">
              {{instance.contract.label}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('formParent') }}</label>
            <p id="parentForm">
              {{instance.parentForm.label}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('name') }}</label>
            <p id="name">
              {{instance.name}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('availableOnWeb') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.availableInWeb" id="availableWeb" />
            </p>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <label>{{ $t('availableOnMobile') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.availableInMobile" id="availableMobile" />
            </p>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <label>{{ $t('formParentseq') }}</label>
            <p id="parentFormSeq">
              {{instance.parentFormSeq}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('labelInPortuguese') }}</label>
            <p id="labelPt">
              {{instance.labelPt}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('labelInSpanish') }}</label>
            <p id="labelEs">
              {{instance.labelEs}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('labelInEnglish') }}</label>
            <p id="labelEn">
              {{instance.labelEn}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="!showCrudOptions() && !showCustomOptions()">
        <el-col :span="8">
          <div>
            <label>{{ $t('beforeOtherView') }}</label>
            <p>
              {{instance.businessRulesBeforeOtherView.label}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">
        <el-col :span="24">
          <h4>{{ $t('crudOption') }}</h4>
          <hr />
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">

        <el-col :span="8">
          <div>
            <label>{{ $t('tableName') }}</label>
            <p id="tableName">
              {{instance.tableName}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('createTable') }}</label>
            <p id="createTable">
              <SpanTrueOrFalse :value="instance.createTable" />
            </p>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">

        <el-col :span="8">
          <div>
            <label>{{ $t('resourceList') }}</label>
            <p id="resourceList">
              {{instance.resourceList}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('resourceShow') }}</label>
            <p id="resourceShow">
              {{instance.resourceShow}}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('resourceForm') }}</label>
            <p id="resourceForm">
              {{instance.resourceForm}}
            </p>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">
        <el-col :span="8">
          <div>
            <label>{{ $t('showSearchFilter') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.filterInList" id="filterInList" />
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('showLinkToDetailsOnSearchResult') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.showView" id="showView" />
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('allowExportSearchResult') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.exportData" id="exportData" />
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">
        <el-col :span="8">
          <div>
            <label>{{ $t('allowCreateRegister') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.createView" id="createView" />
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('allowUpdateRegister') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.editView" id="editView" />
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <label>{{ $t('allowDeleteRegister') }}</label>
            <p>
              <SpanTrueOrFalse :value="instance.deleteButton" id="deleteButton" />
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">
        <el-col :span="8">
          <div>
            <label>{{ $t('preFilter') }}</label>
            <p>
              {{instance.businessRulesPreFilter.label}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('beforeCrudViewCreate') }}</label>
            <p>
              {{instance.businessRulesBeforeCrudViewCreate.label}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('beforeCrudViewShow') }}</label>
            <p>
              {{instance.businessRulesBeforeCrudViewShow.label}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCrudOptions()">
        <el-col :span="8">
          <div>
            <label>{{ $t('beforeCrudViewEdit') }}</label>
            <p>
              {{instance.businessRulesBeforeCrudViewEdit.label}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('beforeCrudViewList') }}</label>
            <p>
              {{instance.businessRulesBeforeCrudViewList.label}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showCustomOptions()">
        <el-col :span="24">
          <h4>{{ $t('customOption') }}</h4>
          <hr />
        </el-col>
      </el-row>

      <el-tabs v-model="tabActiveNameCustom" id="tabs" v-if="showCustomOptions()">
        <el-tab-pane :label="'Template'" name="template" id="template">
          <pre>{{instance.customTemplate.template}}</pre>
        </el-tab-pane>

        <el-tab-pane :label="'Script'" name="script" id="script">
          <pre>{{instance.customTemplate.script}}</pre>
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
          <div>
            <label>{{ $t('businessRules') }}</label>
            <p>
              {{instance.businessRulesReport.label}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-if="showReportOptions()">
        <el-col :span="24">
          <div>
            <label>{{$t('reportTemplate')}}</label>
            <pre>{{instance.reportTemplate}}</pre>
          </div>
        </el-col>
      </el-row>

      <hr />

      <el-col :span="24">
        <el-button-group>
          <el-button type="primary" size="small" @click.prevent="formBuilder()" id="buttonFormBuilder" v-if="instance.formType !== 'CUSTOM'">
            <i class="glyphicon glyphicon-wrench" aria-hidden="true" />
            {{ $t('formBuilder') }}
          </el-button>
          <el-button type="primary" size="small" @click.prevent="filterDesign()" id="buttonFilterDesigner" v-if="instance.formType == 'CRUD'">
            <i class="glyphicon glyphicon-wrench" aria-hidden="true" />
            {{ $t('filterDesign') }}
          </el-button>
          <el-button type="success" size="small" @click.prevent="clone()" id="buttonClone">
            <i class="glyphicon glyphicon-duplicate" aria-hidden="true" />
            {{ $t('clone') }}
          </el-button>
        </el-button-group>

        <FooterShow
          :showEdit="true"
          :showDelete="true"
          @delete="_delete()"
          class="pull-right"
          @edit="goToEdit()"
          @back-to-search="goToBack()" />

        <FormClone v-model="dialogCloneVisible" :formSource="instance" id="formCloneModal"/>
      </el-col>
    </el-tab-pane>

    <el-tab-pane :label="$t('interceptor')" name="interceptors" id="interceptors" v-if="instance.formType == 'CRUD'">

      <el-row>
        <el-col :span="24">

          <el-table
            id="resultTable"
            :data="formInterceptorsList" >

            <el-table-column width="100">
              <template slot-scope="scope">
                <div>
                  <el-button
                    id="edit"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    :title="$t('showEditIcon')"
                    @click.prevent="editFormInterceptor(scope.row)">
                  </el-button>

                  <el-button type="danger"
                             size="mini"
                             icon="el-icon-delete"
                             id="delete"
                             :title="$t('showDelIcon')"
                             @click.prevent="removeFormInterceptor(scope.row.id)">
                  </el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column :label="$t('name')">
              <template slot-scope="scope">
                <div>{{scope.row.name}}</div>
              </template>
            </el-table-column>

            <el-table-column :label="$t('type')">
              <template slot-scope="scope">
                <div>
                  <SpanTypeInterceptor :value="scope.row.type" />
                </div>
              </template>
            </el-table-column>

            <el-table-column :label="$t('businessRules')">
              <template slot-scope="scope">
                <div>{{ scope.row.businessRule ? scope.row.businessRule.label : '' }}</div>
              </template>
            </el-table-column>

            <el-table-column :label="$t('active')">
              <template slot-scope="scope">
                <div>
                  <SpanTrueOrFalse :value="scope.row.active" />
                </div>
              </template>
            </el-table-column>

          </el-table>

        </el-col>
      </el-row>

      <br>

      <el-row>
        <el-col :span="24">
          <el-button size="small" type="primary" @click.prevent="addFormInterceptor()" id="buttonNew">
            <i class="glyphicon glyphicon-plus" aria-hidden="true"/>
            {{ $t('new') }}
          </el-button>
        </el-col>
      </el-row>

      <FormInterceptor v-model="dialogFormInterceptorVisible"
                       :formSource="instance"
                       :formInterceptor="dialogFormInterceptorInstance"
                       @reload-form-interceptor="loadFormInterceptor()"/>

    </el-tab-pane>
  </el-tabs>
</template>
