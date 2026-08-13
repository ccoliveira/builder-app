<script>
  import ModuleTemplate from 'src/components/root/main/ModuleTemplate.vue';
  import {mapActions, mapGetters} from 'vuex';
  import FormDesignDebug from './FormDesignDebug.vue';
  import formBuilderUtils from '../FormBuilderUtils';
  import BuilderRows from './BuilderRows.vue';
  import ShowRows from './ShowRows.vue';
  import FilterComponents from './FilterComponents.vue';

  import cpuRenderTable from 'src/components/utils/cpu/cpuRenderTable.vue';
  import ResultTable from './ResultTable.vue';
  import TableActions from './TableActions.vue';

  export default {
    name: 'filterDesign',
    data() {
      return {
        instance: {},
        fieldDesc: {
          filter: {
            resultDesign: [],
            resultActions: []
          }
        },
        filterComponents: [
          'filterText',
          'filterNumeric',
          'composition',
          'association',
          'filterDate',
          'filterBoolean'
        ],
        debug: false
      }
    },
    components: {
      FormDesignDebug,
      ModuleTemplate,
      BuilderRows,
      ShowRows,
      FilterComponents,
      //cpuRenderTable,
      ResultTable,
      TableActions
    },
    mounted () {

      this.showLoader();

      this.fetch({
        context: this,
        uri: '/form/' + this.$route.params.id
      }).then(response => {
        this.hideLoader();
        this.instance = response.data;
      }).then(() => {
        this.fieldDesc = formBuilderUtils.generateDefaultFieldDesc(this.instance.fieldDesc);
      }).then(() => {
        if(this.instance.fieldDesc && this.instance.fieldDesc.filter && !this.instance.fieldDesc.filter.resultActions){
          this.instance.fieldDesc.filter.resultActions = [];
        }
      });
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader',
        'fetch'
      ]),
      _save: function() {
        this.showLoader();
        formBuilderUtils.saveFieldDesc({
          id: this.instance.id,
          fieldDesc: this.fieldDesc
        }).then(response => {

            this.hideLoader();

            this.$notify({
              title: this.$t('success'),
              message: this.$t('formUpdatedSuccessfully'),
              type: 'success'
            });

          },
          response => {
            this.hideLoader();
            this.errors = response;
          });
      },
      backToForm: function() {
        this.$router.push('/form/show/' + this.instance.id);
      },
      resolveTitle: function() {
        return this.instance.name;
      }
    },
    computed: {
      title: function() {
        return this.instance.name + " - Filter Design";
      },
      filter: function() {
        if (this.fieldDesc.filter) {
          return this.fieldDesc.filter;
        }
        return {};
      },
      filterDesign: function() {
        return this.filter.filterDesign ? this.filter.filterDesign : {};
      },
      returnContractId: function() {
        if (this.instance.contract) {
          return this.instance.contract.id;
        }
        return '';
      }
    }
  }

</script>

<template>

  <module-template fluid="true" title="Filter Design">

    <modulePanel>
        <div class="row height100" slot="header">
          <div class="col-xs-6">
            <h3>{{resolveTitle()}}</h3>
          </div>
          <div class="col-xs-6">
            <div class="pull-right">
                <el-button-group>
                  <el-button type="primary" @click="_save" size="small">
                    <i class="glyphicon glyphicon-ok" />
                    {{ $t('save') }}
                  </el-button>
                  <el-button @click="debug = !debug" size="small" style="display: none">
                    <i class="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                    {{ $t('toggleDebug') }}
                  </el-button>
                  <el-button @click="backToForm" size="small">
                    <i class="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                    {{ $t('backToForm') }}
                  </el-button>

                </el-button-group>
            </div>
          </div>
        </div>

      <div slot="body">
        <div class="row">
          <div class="col-xs-2" id="menuLocation">

            <el-collapse id="menuContainer">
              <el-collapse-item :title="$t('lines')" name="1">
                <BuilderRows :rows="filterDesign.rows" />
              </el-collapse-item>

              <el-collapse-item :title="$t('compBasic')" name="2">

                <FilterComponents v-model="filterComponents" />

              </el-collapse-item>

            </el-collapse>

          </div>
          <div class="col-xs-10" id="grid-work">

            <div class="row">
              <div class="col-xs-12">
                <h4>{{ $t('formFilters') }}</h4>
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <ShowRows
                  v-model="filterDesign"
                  viewSource="filterDesign"
                  :form="instance"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12">
                <h4>{{ $t('resultOfForm') }}</h4>
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <ResultTable :fieldDesc="fieldDesc"/>
                <!--<cpuRenderTable :attr="table" />-->
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12">
                <h4>{{ $t('resultActions') }}</h4>
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <TableActions :fieldDesc="fieldDesc" :contractId="returnContractId"/>
              </div>
            </div>
          </div>
        </div>

        <FormDesignDebug :debug="debug" :fieldDesc="fieldDesc" />

      </div>

    </modulePanel>
  </module-template>
</template>

<style scoped>
.fixar-menu-no-topo {
    position: fixed;
    width: 14%;
    top: 0px;
}
</style>

