<script>
export default{
  props: ["fieldData", "rules"],
  data(){
    return{
    }
  },
  created () {
    // eslint-disable-next-line vue/no-mutating-props -- rules object is intentionally filled in by this component
    this.rules.name = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
  }
}
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('name')" prop="name">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-input v-model="fieldData.name" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
