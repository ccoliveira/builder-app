<script>
  import {mapActions, mapGetters} from 'vuex';

  import SelectContract from 'src/app/commons/components/SelectContract.vue';
  import SpanFormType from './SpanFormType';

  export default{
    components: {
      SelectContract,
      SpanFormType
    },
    data(){
      return{
        payload: {},
        collapseActiveName: 'filter',
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
            value: 'FREE',
            label: 'Free'
          },
          {
            value: 'REPORT',
            label: 'Report'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'retrieveState',
        'list',
        'pagination',
        'showBottomPagination'
      ])
    },
    methods: {
      ...mapActions([
        'doSearch',
        'setPage',
        'setItemsPerPage'
      ]),
      goToCreate: function () {
          this.$router.push('/form/create');
      },
      goToShow: function (form) {
          this.$router.push('/form/show/' + form.id);
      },
      goToEdit: function (form) {
          this.$router.push('/form/edit/' + form.id);
      },
      _doSearch: function (clickFromButton) {
        if (clickFromButton) {
          this.payload.clickFromButton = true;
        }
        this.payload.submitted = true;
        this.doSearch(this.payload);
      },

      // TODO - migrar esses três métodos para dentro da paginação
      _setItemsPerPage: function (val) {
        this.payload.filter.itemsPerPage = val;
        this.setItemsPerPage(this.payload)
      },
      _setPage: function (val) {
        this.payload.filter.currentPage = val;
        this.setPage(this.payload);
      }
    },
    created () {
      this.payload = this.retrieveState("form");
      if (this.payload.submitted) {
        this._doSearch();
      }
    }
  }
</script>

<template>
  <div>
    <el-collapse v-model="collapseActiveName">
      <el-collapse-item :title="$t('filters')" name="filter">
        <div>
          <el-form>
            <el-row :gutter="10">
              <el-col :md="6">
                <el-form-item :label="$t('name')">
                  <el-input :placeholder="$t('name')" v-model="payload.filter.name" id="name"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('contract')">
                  <SelectContract
                    id="contractId"
                    v-model="payload.filter.contractId" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('tableName')">
                  <el-input :placeholder="$t('tableName')" v-model="payload.filter.tableName" id="tableName"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('type')">
                  <el-select
                    id="formType"
                    :placeholder="$t('select')"
                    clearable
                    v-model="payload.filter.formType"
                    filterable >
                    <el-option
                      v-for="item in formTypeList"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()" />

        </div>
      </el-collapse-item>
    </el-collapse>

    <br />

    <modulePanel v-show="payload.submitted">
      <div slot="body">

        <el-col :md="24" :xs="24">
          <Pagination :pagination="pagination(payload)" @change-page="_setPage"
                      @change-items-per-page="_setItemsPerPage"/>
        </el-col>

        <div class="hidden-xs">
          <el-table
            id="resultTable"
            :data="list(payload)"
          >

            <el-table-column
              width="100"
              inline-template>

              <div>
                <el-button
                  id="show"
                  size="mini"
                  icon="el-icon-document"
                  type="primary"
                  @click.prevent="goToShow(row)">
                </el-button>

                <el-button
                  id="edit"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click.prevent="goToEdit(row)">
                </el-button>
              </div>

            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('name')">
              <div>{{row.name}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('contract')">
              <div>{{row.contract.label}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('tableName')">
              <div>{{row.tableName}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('type')">
              <div><SpanFormType :value="row.formType" id="formType" /></div>
            </el-table-column>

          </el-table>
        </div>

        <el-row :gutter="10" class="margin-top-15" v-show="showBottomPagination(payload)">
          <el-col :md="24" :xs="24">
            <Pagination :pagination="pagination(payload)" @change-page="_setPage"
                        @change-items-per-page="_setItemsPerPage"/>
          </el-col>
        </el-row>
      </div>
    </modulePanel>
  </div>
</template>
