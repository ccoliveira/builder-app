<script>
  export default{
    props: ["fieldData"],
  }
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('marginBottom')">
      <el-slider v-model="fieldData.marginBottom"></el-slider>
    </el-form-item>
  </div>
</template>
