<script>
export default{
  props: ["fieldData"],
  data(){
    return{
    }
  },
  computed: {
    _hideOnFilter: {
      get: function() {
        return this.fieldData.hideOnFilter;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, hideOnFilter: newValue });
      }
    }
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('hideOnFilter')">
      <el-switch v-model="_hideOnFilter" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
