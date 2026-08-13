<script>
export default{
  props: ["fieldData"],
  computed: {
    _disableField: {
      get: function() {
        return this.fieldData.disableField;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, disableField: newValue });
      }
    }
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('disableField')">
      <el-switch v-model="_disableField" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
