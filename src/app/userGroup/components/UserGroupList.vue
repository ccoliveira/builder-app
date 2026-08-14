<script>
  import {mapActions, mapGetters} from 'vuex';
  import FooterSearch from 'src/components/utils/footerCrud/FooterSearch';
  import Pagination from 'src/components/utils/Pagination';

  export default {
    components: {
      FooterSearch,
      Pagination
    },
    data() {
      return {
        payload: {
          filter: {}
        },
        collapseActiveName: 'filter'
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
        this.$router.push('/userGroups/create');
      },
      goToShow: function (instance) {
        this.$router.push('/userGroups/show/' + instance.id);
      },
      goToEdit: function (instance) {
        this.$router.push('/userGroups/edit/' + instance.id);
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
      },
    },
    created () {

      this.payload = this.retrieveState("userGroup");
      if (this.payload.submitted) {
        this._doSearch();
      }
    }
  }

</script>

<template>
  <div>
    <el-collapse class="margin-bottom-15px" v-model="collapseActiveName">
      <el-collapse-item :title="$t('filters')" name="filter">
        <div>
          <form>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label>{{$t("name")}}</label>
                  <input class="form-control" :placeholder="$t('name')" v-model="payload.filter.name" id="name"/>
                </div>
              </div>
            </div>
          </form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()"/>
        </div>
      </el-collapse-item>
    </el-collapse>

    <modulePanel v-show="payload.submitted">
      <div slot="body">

        <el-row :gutter="10" class="margin-bottom-15">
          <el-col :md="24" :xs="24">
            <Pagination :pagination="pagination(payload)" @change-page="_setPage"
                        @change-items-per-page="_setItemsPerPage"/>
          </el-col>
        </el-row>

        <div class="hidden-xs">
          <el-table
            stripe
            :data="list(payload)"
            id="resultList"
          >

            <el-table-column width="100">
              <template scope="scope">
                <el-button
                  :id="'show_' + scope.row.id"
                  type="primary"
                  size="mini"
                  :title="returnHintButton('showShowIcon')"
                  @click.prevent="goToShow(scope.row)"
                >
                  <i class="glyphicon glyphicon-file" />
                </el-button>

                <el-button
                  :id="'edit_' + scope.id"
                  type="primary"
                  size="mini"
                  :title="returnHintButton('showEditIcon')"
                  @click.prevent="goToEdit(scope.row)"
                >
                  <i class="glyphicon glyphicon-edit" />
                </el-button>
              </template>
            </el-table-column>

            <el-table-column prop="name" :label="$t('name')" />

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

<style scoped>
  .margin-bottom-15px {
    margin-bottom: 15px;
  }
  .form-control:focus {
    border-color: #e82682 !important;
  }
  @media(max-width: 992px) {
  .big-table th {
    display: none;
  }
  .big-table td {
    display: inline-flex;
    border: 0px solid #000!important;
  }
  .big-table tr {
    display: block;
    margin-bottom: 20px;
    padding-bottom: 20px;
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
