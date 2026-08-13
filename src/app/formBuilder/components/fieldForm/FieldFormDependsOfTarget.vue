<script>
export default{
  props: ["fieldData", "rules"],
  data() {
    return{
    }
  },
  computed: {
    _dependsOfTarget: {
      get: function() {
        return this.fieldData.dependsOfTarget;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, dependsOfTarget: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('dependsOfTarget')" prop="dependsOf">
      <el-input v-model="_dependsOfTarget" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
