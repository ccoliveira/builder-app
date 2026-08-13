<script>

import cpuRender from 'src/components/utils/cpu/cpuRender.vue';
import FieldForm from './fieldForm/FieldForm.vue';

export default {
  name: 'DialogEditComponentData',
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    },
    viewSource: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      rules: {}
    }
  },
  components: {
    FieldForm, cpuRender
  },
  methods: {
    save: function() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          this.$emit('save-component', this.dialogData.data);
          this.closeDialog();
        } else {
          console.log('error submit!!');
        }
      });
    },
    closeDialog: function() {
      this.$emit('close-dialog');
    },
    dialogTitle: function() {
      return this.$t('editComponent') + ' - ' + this.$t(this.dialogData.data.type);
    }
  }
}

</script>

<template>
  <el-dialog
    :title="dialogTitle()"
    :visible.sync="dialogData.visible"
    size="large"
  >
    <el-form
      ref="dialogForm"
      label-position="top"
      :rules="rules"
      :model="dialogData.data"
    >
      <div class="row">
        <div class="col-xs-8 border-right">
          <FieldForm
            :type="dialogData.data.type"
            :field-data="dialogData.data"
            :view-source="viewSource"
            :form="form"
            :rules="rules"
          />
        </div>
        <div class="col-xs-4">
          <h4>{{ $t('preview') }}</h4>
          <cpuRender
            :type="dialogData.data.type"
            :attr="dialogData.data"
          />
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button-group>
        <el-button @click="closeDialog">{{ $t('close') }}</el-button>
        <el-button type="primary" @click="save">{{ $t('save') }}</el-button>
      </el-button-group>
    </template>
  </el-dialog>
</template>
