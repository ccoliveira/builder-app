<script>
export default{
  props: ["fieldData", "rules"],
  data() {
    return{
    }
  },
  computed: {
    _dependsOfSource: {
      get: function() {
        return this.fieldData.dependsOfSource;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, dependsOfSource: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('dependsOfSource')" prop="dependsOf">
      <el-input v-model="_dependsOfSource" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
