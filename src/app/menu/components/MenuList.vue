<script>
  import {mapActions, mapGetters} from 'vuex';

  import SpanNoLinkOrForm from './SpanNoLinkOrForm';
  import SelectContract from 'src/app/commons/components/SelectContract.vue';
  import SelectForm from 'src/app/commons/components/SelectForm.vue';
  import apiService from 'src/services/ApiService';

  export default {
    data() {
      return {
        payload: {},
        collapseActiveName: 'filter',
        typeList: [
          {
            value: '',
            label: ''
          },
          {
            value: 'NO_LINK',
            label: this.$t('noLink')
          },
          {
            value: 'FORM',
            label: this.$t('formulary')
          }
        ],
        parentMenuList: []
      }
    },
    components: {
      SpanNoLinkOrForm,
      SelectContract,
      SelectForm
    },
    computed: {
      ...mapGetters([
        'retrieveState',
        'list',
        'pagination',
        'showBottomPagination'
      ]),
      filterParentMenu: function () {
        let f = {};

        f.type = "NO_LINK";

        if(this.payload.filter.contractId) {
          f.contractId = this.payload.filter.contractId;
        }

        return f;
      }
    },
    watch: {
      "payload.filter.contractId": function(newValue, oldValue) {

        this.loadParentMenu();
      }
    },
    methods: {
      ...mapActions([
        'doSearch',
        'setPage',
        'setItemsPerPage'
      ]),
      goToCreate: function () {
        this.$router.push('/menu/create');
      },
      goToShow: function (instance) {
        this.$router.push('/menu/show/' + instance.id);
      },
      goToEdit: function (instance) {
        this.$router.push('/menu/edit/' + instance.id);
      },
      returnHintButton: function(buttontype) {
        return this.$t(buttontype);
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
      loadParentMenu: function() {
        let listFull = [];
        if (!this.disabled || this.disabled == null) {
          apiService.search({
            uri: "/menu",
            filter: this.filterParentMenu
          }).then((response) => {
            listFull = response.data;
            this.parentMenuList = [
              {
                id: 'NO_PARENT',
                label: this.$t('noParent')
              }
            ];
            listFull.map(it => {
              this.parentMenuList.push({
                id: it.id,
                label: it.nameExtended
              });
            });
            this.parentMenuList = _.sortBy(this.parentMenuList, 'label');
            if(!_.find(this.parentMenuList, { id: this._value })) {
              this._value = '';
            }
          });
        }
      }
    },
    created () {
      this.payload = this.retrieveState("menu");
      if (this.payload.submitted) {
        this._doSearch();
      }
      this.loadParentMenu();
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
              <el-col :md="8">
                <el-form-item :label="$t('name')">
                  <el-input :placeholder="$t('name')" v-model="payload.filter.name" id="name"/>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('contract')">
                  <SelectContract
                    id="contractId"
                    v-model="payload.filter.contractId"/>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('parentMenu')">

                  <el-select v-model="payload.filter.parentId"
                             filterable
                             clearable
                             :placeholder="$t('select')">
                    <el-option v-for="item in parentMenuList"
                               :key="item.id"
                               :label="item.label"
                               :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('form')">
                  <SelectForm
                    id="formId"
                    v-model="payload.filter.formId"
                    :contractId="payload.filter.contractId"/>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('menuType')">
                  <el-select
                    id="menuType"
                    :placeholder="$t('select')"
                    clearable
                    v-model="payload.filter.type"
                    filterable>
                    <el-option
                      v-for="item in typeList"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()"/>

        </div>
      </el-collapse-item>
    </el-collapse>

    <br/>

    <div class="panel" v-show="payload.submitted">
      <div class="panel-body">

        <div class="row margin-bottom-15">
          <div class="col-md-12">
            <Pagination
              :pagination="pagination(payload)"
              @change-page="_setPage"
              @change-items-per-page="_setItemsPerPage" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped big-table">

                <thead>
                <tr>
                  <th>{{$t('actions')}}</th>
                  <th>
                    <span>{{$t('contract')}}</span>
                  </th>
                  <th>
                    <span>{{$t('parentMenu')}}</span>
                  </th>
                  <th>
                    <span>{{$t('name')}}</span>
                  </th>
                  <th>
                    <span>{{$t('menuType')}}</span>
                  </th>
                  <th>
                    <span>{{$t('position')}}</span>
                  </th>
                </tr>
                </thead>

                <tbody>

                <tr v-for="fieldsDataRow in list(payload)">

                  <td class="buttonIcon">
                    <el-button
                      :id="'show_' + fieldsDataRow.id"
                      type="primary"
                      size="mini"
                      :title="returnHintButton('showShowIcon')"
                      @click.prevent="goToShow(fieldsDataRow)">
                      <i class="glyphicon glyphicon-file"></i>
                    </el-button>

                    <el-button
                      :id="'edit_' + fieldsDataRow.id"
                      type="primary"
                      size="mini"
                      :title="returnHintButton('showEditIcon')"
                      @click.prevent="goToEdit(fieldsDataRow)">
                      <i class="glyphicon glyphicon-edit"></i>
                    </el-button>

                  <td :data-th="$t('contract')">
                    <span>{{fieldsDataRow.contract.label}}</span>
                  </td>
                  <td :data-th="$t('parentMenu')">
                    <span>{{fieldsDataRow.parent ? fieldsDataRow.parent.label : ''}}</span>
                  </td>
                  <td :data-th="$t('name')">
                    <span>{{fieldsDataRow.name}}</span>
                  </td>
                  <td :data-th="$t('menuType')">
                    <span><SpanNoLinkOrForm :value="fieldsDataRow.type"/></span>
                  </td>
                  <td :data-th="$t('position')">
                    <span>{{fieldsDataRow.position}}</span>
                  </td>
                </tr>
                </tbody>

              </table>
            </div>
          </div>
        </div>

        <div class="row margin-bottom-15" v-show="showBottomPagination(payload)">
          <div class="col-md-12">
            <Pagination
              :pagination="pagination(payload)"
              @change-page="_setPage"
              @change-items-per-page="_setItemsPerPage" />
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
    border: 0px solid #000!important;
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
  .big-table td.action-buttons {
    display: inline;
  }
}

</style>
