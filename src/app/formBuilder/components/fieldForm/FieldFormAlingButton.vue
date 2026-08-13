<script>
export default{
  props: ["fieldData"],
  data(){
    return{
    }
  },
  computed: {
    _alingButton: {
      get: function() {
        return this.fieldData.alingButton;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, alingButton: newValue });
      }
    }
  },
  components:{
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('alingButton')">
      <el-switch v-model="_alingButton" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
<style>
</style>
