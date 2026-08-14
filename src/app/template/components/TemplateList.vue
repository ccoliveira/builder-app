<script>

  import {mapActions, mapGetters} from 'vuex';
  import modules from 'src/mainVuex';

  export default {
    data() {
      return {
        payload: {},
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
      goToCreate: function() {
        this.$router.push('/template/create');
      },
      goToShow: function (instance) {
        this.$router.push('/template/show/' + instance.id);
      },
      goToEdit: function (instance) {
        this.$router.push('/template/edit/' + instance.id);
      },
      _doSearch: function (clickFromButton) {
        if (clickFromButton) {
          this.payload.clickFromButton = true;
        }
        this.payload.submitted = true;
        this.doSearch(this.payload);
      },

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
      this.payload = this.retrieveState("template");
      if (this.payload.submitted) {
        this._doSearch();
      }
    }
  }
</script>
<template>
  <div>
    <el-collapse v-model="collapseActiveName">
      <el-collapse-item :title="$t('filters')" name="filter" id="filter">
        <div>
          <el-form>
            <el-row :gutter="10">
              <el-col :md="12">
                <el-form-item :label="$t('code')">
                  <el-input :placeholder="$t('code')" v-model="payload.filter.code" id="code" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('name')">
                  <el-input :placeholder="$t('name')" v-model="payload.filter.name"  id="name"/>
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

            <el-table-column
              width="100"
              inline-template>

              <div>
                <el-button
                  size="mini"
                  icon="el-icon-document"
                  type="primary"
                  @click.prevent="goToShow(row)"
                  id="show">
                </el-button>

                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click.prevent="goToEdit(row)"
                  id="edit">
                </el-button>
              </div>

            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('code')">
              <div>{{row.code}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('name')">
              <div>{{row.name}}</div>
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
