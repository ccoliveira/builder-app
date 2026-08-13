<script>
export default{
  props: ["fieldData"],
  data(){
    return{
    }
  },
  computed: {
    _hideOnPrint: {
      get: function() {
        return this.fieldData.hideOnPrint;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, hideOnPrint: newValue });
      }
    }
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('hideOnPrint')">
      <el-switch v-model="_hideOnPrint" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
