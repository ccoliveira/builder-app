<script>
  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    }
  }
</script>

<template>
  <div class="col-xs-12">
    <el-form-item :label="$t('preFilter')">
      <el-input
        type="textarea"
        :rows="3"
        v-model="fieldData.preFilter">
      </el-input>
    </el-form-item>
  </div>
</template>
