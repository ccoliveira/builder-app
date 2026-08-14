<script>
import {mapActions, mapGetters} from 'vuex';

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
    goToCreate: function () {
      this.$router.push('/business-line/create');
    },
    goToShow: function (instance) {
      this.$router.push('/business-line/show/' + instance.id);
    },
    goToEdit: function (instance) {
      this.$router.push('/business-line/edit/' + instance.id);
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
    this.payload = this.retrieveState("businessLine");
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
              <el-col :md="12">
                <el-form-item :label="$t('code')">
                  <el-input
                    id="code"
                    v-model="payload.filter.code"
                    :placeholder="$t('code')"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('name')">
                  <el-input
                    id="name"
                    v-model="payload.filter.name"
                    :placeholder="$t('name')"
                  />
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
                    <span>{{ $t('code') }}</span>
                  </th>
                  <th>
                    <span>{{ $t('name') }}</span>
                  </th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="fieldsDataRow in list(payload)"
                  :key="fieldsDataRow.id"
                >
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

                  <td :data-th="$t('code')">
                    <span>{{ fieldsDataRow.code }}</span>
                  </td>
                  <td :data-th="$t('name')">
                    <span>{{ fieldsDataRow.name }}</span>
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
