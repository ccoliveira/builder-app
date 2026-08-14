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
              <span>{{ $t('type') }}</span>
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
            <td :data-th="$t('type')">
              <span><SpanServerOrClient :value="fieldsDataRow.type" /></span>
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
