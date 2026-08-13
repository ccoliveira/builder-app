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
    },
    returnHintButton: function(buttontype) {
      return this.$t(buttontype);
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
      <el-collapse-item
        :title="$t('filters')"
        name="filter"
      >
        <div>
          <el-form>
            <el-row :gutter="10">
              <el-col :md="6">
                <el-form-item :label="$t('name')">
                  <el-input
                    id="name"
                    v-model="payload.filter.name"
                    :placeholder="$t('name')"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('contract')">
                  <SelectContract
                    id="contractId"
                    v-model="payload.filter.contractId"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('tableName')">
                  <el-input
                    id="tableName"
                    v-model="payload.filter.tableName"
                    :placeholder="$t('tableName')"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('type')">
                  <el-select
                    id="formType"
                    v-model="payload.filter.formType"
                    :placeholder="$t('select')"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in formTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()"
          />

        </div>
      </el-collapse-item>
    </el-collapse>

    <br>

    <div
      v-show="payload.submitted"
      class="panel"
    >
      <div class="panel-body">

        <div class="row margin-bottom-15">
          <div class="col-md-12">
            <Pagination
              :pagination="pagination(payload)"
              @change-page="_setPage"
              @change-items-per-page="_setItemsPerPage"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped big-table">
                <thead>
                <tr>
                  <th>{{ $t('actions') }}</th>
                  <th>
                    <span>{{ $t('name') }}</span>
                  </th>
                  <th>
                    <span>{{ $t('contract') }}</span>
                  </th>
                  <th>
                    <span>{{ $t('tableName') }}</span>
                  </th>
                  <th>
                    <span>{{ $t('type') }}</span>
                  </th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="fieldsDataRow in list(payload)" :key="fieldsDataRow.id">
                  <td class="buttonIcon">
                    <el-button
                      :id="'show_' + fieldsDataRow.id"
                      type="primary"
                      size="mini"
                      :title="returnHintButton('showShowIcon')"
                      @click.prevent="goToShow(fieldsDataRow)"
                    >
                      <i class="glyphicon glyphicon-file" />
                    </el-button>

                    <el-button
                      :id="'edit_' + fieldsDataRow.id"
                      type="primary"
                      size="mini"
                      :title="returnHintButton('showEditIcon')"
                      @click.prevent="goToEdit(fieldsDataRow)"
                    >
                      <i class="glyphicon glyphicon-edit" />
                    </el-button>
                  </td>
                  <td :data-th="$t('name')">
                    <span>{{ fieldsDataRow.name }}</span>
                  </td>
                  <td :data-th="$t('contract')">
                    <span>{{ fieldsDataRow.contract.label }}</span>
                  </td>
                  <td :data-th="$t('tableName')">
                    <span>{{ fieldsDataRow.tableName }}</span>
                  </td>
                  <td :data-th="$t('type')">
                      <span><SpanFormType
                        id="formType"
                        :value="fieldsDataRow.formType"
                      /></span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          v-show="showBottomPagination(payload)"
          class="row margin-bottom-15"
        >
          <div class="col-md-12">
            <Pagination
              :pagination="pagination(payload)"
              @change-page="_setPage"
              @change-items-per-page="_setItemsPerPage"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@media(max-width: 992px) {
  .big-table th {
    display: none;
  }
  .big-table td {
    display: grid;
    border: 0 solid #000 !important;
  }
  .big-table tr {
    display: block;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  .big-table td.buttonIcon{
    display: block;
  }
  .big-table td.buttonIcon:before {
    content: attr(data-th) "";
    width: 0.0em;
    display: inline-block;
  }
  .big-table td:before {
    content: attr(data-th) ": ";
    font-weight: bold;
    width: 10.5em;
    display: inline-block;
  }
  .big-table td div {
    display: inline-block;
  }
}

</style>
