<script>
import {mapActions, mapGetters} from 'vuex';
import SpanEmailStatus from './SpanEmailStatus';

  export default{
    data(){
      return{
        collapseActiveName: 'filter',
        payload: {},
        emailStatus: [
          {
            value: '',
            label: ''
          },
          {
            value: 'TO_SEND',
            label: this.$t('tosend')
          },
          {
            value: 'SENT',
            label: this.$t('sent')
          },
          {
            value: 'ERROR',
            label: this.$t('error')
          }
        ]
      }
    },
    components:{
      SpanEmailStatus
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
          this.$router.push('/email/create');
      },
      goToShow: function (email) {
          this.$router.push('/email/show/' + email.id);
      },
      goToEdit: function (email) {
          this.$router.push('/email/edit/' + email.id);
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
    },
    created () {
      this.payload = this.retrieveState("email");
      if (this.payload.submitted) {
        this._doSearch();
      }
    }
}

</script>
<template>
  <div>
    <el-collapse class="margin-bottom-15" v-model="collapseActiveName">
      <el-collapse-item :title="$t('filters')" name="filter">
        <div>
          <el-form>
            <el-row :gutter="10">
              <el-col :md="12">
                <el-form-item :label="$t('from')">
                  <el-input :placeholder="$t('from')" v-model="payload.filter.from" id="from"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('to')">
                  <el-input :placeholder="$t('to')" v-model="payload.filter.to" id="to"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :label="$t('subject')">
                  <el-input :placeholder="$t('subject')" v-model="payload.filter.subject" id="subject"/>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('status')">
                  <el-select
                    id="status"
                    :placeholder="$t('select')"
                    v-model="payload.filter.status">
                    <el-option
                      v-for="(item, idx) in emailStatus"
                      :key="item.value || idx"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('createdDate')">
                  <el-date-picker :placeholder="$t('createdDate')"
                                  v-model="payload.filter.createdDate"
                                  id="createdDate"/>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

          <el-row :gutter="10">
            <el-col :md="12">

              <el-button size="small" type="primary" @click.prevent="_doSearch(true)" id="buttonSearch">
                <i class="glyphicon glyphicon-search" aria-hidden="true"/>
                {{$t("search")}}
              </el-button>

            </el-col>
          </el-row>

        </div>
      </el-collapse-item>
    </el-collapse>

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
              width="50"
              inline-template>

              <div>
                <el-button
                  id="show"
                  size="mini"
                  icon="el-icon-document"
                  type="primary"
                  @click.prevent="goToShow(row)">
                </el-button>
              </div>

            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('from')">
              <div>{{row.from}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('to')">
              <div>{{row.to}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('subject')">
              <div>{{row.subject}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('status')">
                <div>
                  <SpanEmailStatus :value="row.status" id="status"/>
                </div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('createdDate')">
              <div>{{row.createdDate}}</div>
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
<style>
</style>
