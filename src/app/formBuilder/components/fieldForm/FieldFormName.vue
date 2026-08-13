<script>
  export default{
  props: ["fieldData", "rules"],
    data(){
      return{
      }
    },
    created () {
      this.rules.name = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
    }
  }
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('name')" prop="name">
      <el-input v-model="fieldData.name" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
