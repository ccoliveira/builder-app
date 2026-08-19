<script>
export default{
  props: ["fieldData", "rules", "required"],
  data(){
    return{
      localRules: {}
    }
  },
  computed: {
    _columnName: {
      get: function() {
        return this.fieldData.columnName;
      },
      set: function(newValue) {
        this.$set(this.fieldData, 'columnName', newValue);
      }
    }
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    if (this.required === undefined || this.required) {
      this.localRules.columnName = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ]
    }
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('columnName')" prop="columnName">
      <el-input v-model="_columnName" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
