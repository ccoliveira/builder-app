<script>
  export default{
    props: ["fieldData"],
  }
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('marginLeft')">
      <el-slider v-model="fieldData.marginLeft"></el-slider>
    </el-form-item>
  </div>
</template>
