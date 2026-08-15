<script>
import TableActionsDialogForm from './TableActionsDialogForm'

import utils from '../FormBuilderUtils'

export default {
  name: "ResultTable",
  props: ["fieldDesc", "contractId"],
  data() {
    return {
      showDialog: false,
      field: {},
      resultTable: []
    }
  },
  methods: {
    edit: function (item) {
      Promise.resolve().then(() => {
        this.field = {};
      }).then(() => {
        this.field = item;
        this.showDialog = true;
      });
    },
    remove: function (item) {

      this.$confirm(this.$t('confirmRemoveTheComponent'), this.$t('warning'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'error'
      }).then(() => {
        this.$emit('remove-item', item);
      });
    },
    dialogShow: function () {
      this.showDialog = true;
    },
    getField: function(id) {
      return utils.findField(id, this.fieldDesc.fields);
    }
  },
  components: {
    TableActionsDialogForm
  }
}
</script>

<template>
  <div>

    <el-row>

      <el-table :data="this.fieldDesc.filter.resultActions">

        <el-table-column
          inline-template
          :label="$t('name')">
          <div>{{row.name}}</div>
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('hintPt')">
          <div>{{row.hintPt}}</div>
        </el-table-column>

        <el-table-column
          width="100"
          inline-template>

          <div>
            <el-button
              type="edit"
              size="mini"
              icon="el-icon-edit"
              @click.prevent="edit(row)">
            </el-button>

            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click.prevent="remove(row)">
            </el-button>
          </div>

        </el-table-column>

      </el-table>

    </el-row>

    <br>

    <el-row>
      <el-button size="small" icon="el-icon-plus" @click.prevent="dialogShow()" type="primary">
        {{ $t('add') }}
      </el-button>
    </el-row>

    <TableActionsDialogForm
      v-model="showDialog"
      :contractId="contractId"
      :field="field"
      :fieldDesc="fieldDesc" />
  </div>
</template>
