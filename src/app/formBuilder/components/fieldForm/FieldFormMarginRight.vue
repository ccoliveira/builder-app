<script>
  export default{
    props: ["fieldData"],
  }
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('marginRight')">
      <el-slider v-model="fieldData.marginRight"></el-slider>
    </el-form-item>
  </div>
</template>
