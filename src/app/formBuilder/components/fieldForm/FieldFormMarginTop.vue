<script>
  export default{
    props: ["fieldData"],
  }
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('marginTop')">
      <el-slider v-model="fieldData.marginTop"></el-slider>
    </el-form-item>
  </div>
</template>
