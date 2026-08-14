<script>
import ResultTableDialogForm from './ResultTableDialogForm'
import SpanTrueOrFalse from 'src/components/utils/SpanTrueOrFalse';

import utils from '../FormBuilderUtils'

export default {
  name: "ResultTable",
  props: ["fieldDesc"],
  data() {
    return {
      showDialog: false,
      field: {},
      resultTable: []
    }
  },
  methods: {
    edit: function (item) {
      this.field = item;
      this.showDialog = true;
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
    ResultTableDialogForm,
    SpanTrueOrFalse
  },
  computed: {
    _resultDesign: function() {
      let ret = [];

      _.orderBy(
        this.fieldDesc.filter.resultDesign,
        ['position'],
        ['asc']
      ).map(it => {
        it.visibleToPt = it.visibleToPt != null ? it.visibleToPt : true;
        it.visibleToEs = it.visibleToEs != null ? it.visibleToEs : true;
        it.visibleToEn = it.visibleToEn != null ? it.visibleToEn : true;
        ret.push(it);
      });

      return ret;
    }
  }
}
</script>

<template>
  <div>
    <el-row>
      <el-table :data="_resultDesign">

        <el-table-column
          inline-template
          :label="$t('field')">
          <div>{{getField(row.id).name}}</div>
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('position')">
          <div>{{row.position}}</div>
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('visibleToPt')">
          <SpanTrueOrFalse :value="row.visibleToPt" />
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('visibleToEs')">
          <SpanTrueOrFalse :value="row.visibleToEs" />
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('visibleToEn')">
          <SpanTrueOrFalse :value="row.visibleToEn" />
        </el-table-column>

        <el-table-column
          width="100"
          inline-template>

          <div>
            <!--<el-button
              id="edit"
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click.prevent="edit(row)"
            >
            </el-button>-->

            <el-button
              type="danger"
              size="mini"
              icon="delete"
              @click.prevent="remove(row)">
            </el-button>
          </div>

        </el-table-column>

      </el-table>

    </el-row>

    <br>

    <el-row>
      <el-button size="small" icon="plus" @click.prevent="dialogShow()" type="primary">
        {{ $t('add') }}
      </el-button>
    </el-row>

    <ResultTableDialogForm
      v-model="showDialog"
      :field="field"
      :fieldDesc="fieldDesc" />
  </div>
</template>
