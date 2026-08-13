<script>

  import {mapActions, mapGetters} from 'vuex';
  import modules from 'src/mainVuex';
  import SelectContract from 'src/app/commons/components/SelectContract.vue';
  import scheduledTaskUtils from '../ScheduledTaskUtils.js';
  import FormatDate from 'components/utils/FormatDate.vue';

  export default {
    components: {
      SelectContract,
      FormatDate
    },
    data() {
      return {
        payload: {},
        collapseActiveName: 'filter',
        statusList: [
          {
            id: 'ENABLED',
            label: this.$t('ENABLED')
          },
          {
            id: 'DISABLED',
            label: this.$t('DISABLED')
          }
        ],
        nextFireTime: {
          showModal: false,
          items: []
        }
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
        'setItemsPerPage',
        'showLoader',
        'hideLoader'
      ]),
      goToCreate: function() {
        this.$router.push('/scheduledTask/create');
      },
      goToShow: function (instance) {
        this.$router.push('/scheduledTask/show/' + instance.id);
      },
      goToEdit: function (instance) {
        this.$router.push('/scheduledTask/edit/' + instance.id);
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
      },
      translate: function(key) {
        if (key) {
          return this.$t(key);
        }
      },
      _nextFireTime: function() {

        this.nextFireTime.showModal = true;
        this.showLoader();
        this.nextFireTime.items = [];

        scheduledTaskUtils.nextFireTime()
          .then((response) => {
            this.hideLoader();
            this.nextFireTime.items = response.data;
          });
      }
    },
    created () {
      this.payload = this.retrieveState("scheduledTask");
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

              <el-col :md="6">
                <el-form-item :label="$t('name')">
                  <el-input :placeholder="$t('name')" v-model="payload.filter.name" id="name" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('status')">
                  <el-select
                    id="status"
                    clearable
                    :placeholder="$t('select')"
                    v-model="payload.filter.status"
                    filterable>
                    <el-option
                      v-for="item in statusList"
                      :value="item.id"
                      :label="item.label"
                    />
                  </el-select>
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
                <el-form-item :label="$t('businessRules')">
                  <aio-select
                    id="businessRule"
                    v-model="payload.filter.businessRulesId"
                    uri="/businessRule"
                    :uriFilter="typeFilter"
                    :formatLabel="(it) => { return it.code }" />
                </el-form-item>
              </el-col>

            </el-row>

          </el-form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()"
          >
            <div slot="action" class="pull-right">
              <el-button size="small" type="primary" @click.prevent="_nextFireTime()" id="buttonNextFireTime">
                <i class="glyphicon glyphicon-calendar" aria-hidden="true"/>
                {{ $t("nextFireTime") }}
              </el-button>

              <el-dialog
                :title="$t('nextFireTime')"
                :visible.sync="nextFireTime.showModal"
                size="large"
              >
                <el-table
                  stripe
                  :data="nextFireTime.items"
                >
                  <el-table-column
                    inline-template
                    :label="$t('name')">
                    <div>{{row.name}}</div>
                  </el-table-column>

                  <el-table-column
                    inline-template
                    :label="$t('businessRules')">
                    <div>{{row.businessRules.label}}</div>
                  </el-table-column>

                  <el-table-column
                    inline-template
                    :label="$t('nextExecution')">
                    <div><FormatDate :date="row.nextFireTime" format="DD/MM/YYYY HH:mm"/></div>
                  </el-table-column><Q><WQ></WQ></Q>

                </el-table>
              </el-dialog>

            </div>
          </FooterSearch>

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
                  icon="document"
                  type="primary"
                  @click.prevent="goToShow(row)"
                  id="show">
                </el-button>

                <el-button
                  type="primary"
                  size="mini"
                  icon="edit"
                  @click.prevent="goToEdit(row)"
                  id="edit">
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
              :label="$t('status')">
              <div>{{ translate(row.status) }}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('contract')">
              <div>{{row.contract.label}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('businessRules')">
              <div>{{row.businessRules.label}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('cronExpression')">
              <div>{{row.cronExpression}}</div>
            </el-table-column>

            <el-table-column
              inline-template
              :label="$t('historyLimit')">
              <div>{{row.historyLimit}}</div>
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
