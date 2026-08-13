<script>

export default {
  name: 'DialogEditColsSize',
  props: {
    dialogEditRowData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closeDialog: function() {
      this.$emit('close-dialog');
    }
  }
}

</script>

<template>
  <el-dialog
    :title="$t('editColumns')"
    :visible.sync="dialogEditRowData.visible"
    size="small"
  >
    <el-form label-position="top">
      <el-row :gutter="20">
        <el-col
          v-for="(col, index) in dialogEditRowData.cols"
          :key="index"
          :span="24 / dialogEditRowData.cols.length"
        >
          <el-form-item :label="$t('column') + ' ' + (index + 1)">
            <el-input-number v-model="col.width" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">{{ $t('close') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
